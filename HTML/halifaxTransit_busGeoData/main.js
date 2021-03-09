(() => {
    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([44.650627, -63.597140], 14);


    let busIcon = L.Icon.extend({
        options: {
            iconSize: [50, 40]
        }
    });

    let bus = new busIcon({iconUrl: 'bus.png'});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let layerGroup = L.layerGroup().addTo(map);

    const toGeojson = (arr) => {
        return arr.map(({vehicle}) => {
            const busObj = 
            { "id" : vehicle.id, 
            "type":"Point",
            "coordinates": [vehicle.position.longitude, vehicle.position.latitude],
            "bearing": vehicle.position.bearing,
            "busnum" : vehicle.trip.routeId
            }
            return busObj; 
        });
    };

    let busGeo = () => {

        fetch('https://hrmbuses.herokuapp.com')
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                let geojsonData = {};
                const busInfo = json.entity.filter(({vehicle})=> parseInt(vehicle.trip.routeId) <= 10);
                geojsonData = toGeojson(busInfo);

                layerGroup.clearLayers();
                
                L.geoJSON(geojsonData, {onEachFeature: function(feature){
                    let lon = feature.coordinates[0];
                    let lat = feature.coordinates[1];
                    
                    L.marker([lat, lon],{icon: bus, rotationAngle: feature.bearing})
                    .bindPopup('Bus '+ feature.busnum).openPopup()
                    .addTo(layerGroup);
                }
                });
            });
            setTimeout(busGeo, 7000);
    };//end busGeo
    busGeo();
})();


