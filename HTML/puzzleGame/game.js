(() => {
    window.onload = () => {
        var puzzle_rows = [6,8,10,14];
        var random = puzzle_rows[Math.floor(Math.random() * puzzle_rows.length)];
        // fetch('https://www.mikecaines.com/3inarow/sample.json')
        fetch('https://www.mikecaines.com/3inarow/'+random+'x'+random+'a.php')
        .then((response) => {return response.json();})
        .then((json) => {
            puzzle(json);
        });

        const puzzle = (json) => {
            var blue = "rgb(7, 53, 147)"; var grey = "rgb(170, 170, 170)"; 
            var white = "white"; var green = "rgb(177, 252, 164)"; var red = "rgb(255, 0, 0)"
            var currentState = []; var correctState = [];
            var table = document.createElement('table');
            var btn_answer = document.createElement('button'); btn_answer.innerHTML = "answer";
            btn_answer.setAttribute('id',"btn_answer");
            for (var i = 0; i < json.rows.length; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < json.rows.length; j++) {
                    var td = document.createElement('td');
                    td.setAttribute("id",i*json.rows.length+(j+1));
                    currentState.push(json.rows[i][j].currentState);
                    correctState.push(json.rows[i][j].correctState);
                    json.rows[i][j].currentState === 0 ? td.style.backgroundColor = grey : 
                    json.rows[i][j].currentState === 1 ? td.style.backgroundColor = blue : 
                    td.style.backgroundColor = white;
                    json.rows[i][j].canToggle == true ? td.addEventListener("click", MouseClick) : null;
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            var title = document.createElement('h1'); title.innerHTML = "Daily 3-In-A-Row";
            var btn_check = document.createElement('button'); btn_check.innerHTML = "Check";
            var label = document.createElement('label'); label.setAttribute('id',"label")
            var checkBox = document.createElement('input'); checkBox.setAttribute("type", "checkbox");
            var remark = document.createElement('p'); remark.innerText = 
            '*Refresh the page to start the new game \n "x" represnts mistake(s)'
            this.document.getElementById('theGame').appendChild(title);
            this.document.getElementById('theGame').appendChild(table);
            this.document.getElementById('theGame').appendChild(btn_check);
            this.document.getElementById('theGame').appendChild(btn_answer);
            this.document.getElementById('theGame').appendChild(label);
            this.document.getElementById('label').appendChild(checkBox);
            this.document.getElementById('theGame').appendChild(remark)
            checkBox.after(" Show mistakes when checking");
            btn_check.addEventListener("click", Check);
            btn_answer.onclick = () => {   
                for (var index in correctState) {
                    document.getElementById(parseInt(index,10)+1).style.backgroundColor = 
                    correctState[index] === 1 ? blue : green;
                }
            };
            
            function MouseClick() {
                document.getElementById(this.id).innerText = ""
                var Color = document.getElementById(this.id).style.backgroundColor;
                Color === grey ? Color = blue : Color === blue ?
                Color = white : Color === white || Color === red ? Color = grey : null;
                document.getElementById(this.id).style.backgroundColor = Color;
                currentState[this.id-1] = Color ===  grey ? 0 : Color === blue ? 1 : 2;
                JSON.stringify(currentState) === JSON.stringify(correctState) ? finish() : null;
            }
            
            function Check() {
                var check_flag = []; var error = [];
                for (var index in currentState) {
                    currentState[index] === 0 || currentState[index] === correctState[index] ?
                    check_flag.push(true) : (check_flag.push(false),error.push(parseInt(index,10)+1))
                }
                alert(check_flag.indexOf(false) === -1 && JSON.stringify(currentState)===JSON.stringify(correctState) ?
                "You did it!" : check_flag.indexOf(false) >= 0 ? "Something is wrong" : "So far so good!");
                for (var i = 0; i < error.length; i++) {
                    checkBox.checked === true ? document.getElementById(error[i]).innerText = "x" : null;
                }
                
            }

            function finish () {
                var arr = [];
                for (var index = 0; index < correctState.length;) {
                    var msg = correctState.indexOf(2,index+1);
                    index+=1
                    arr.push(msg)
                }
                arr = arr.filter((value, index, self) => self.indexOf(value) === index); 
                arr = arr.filter(x => x > -1);
                for (var i = 0; i < arr.length; i++) {
                    document.getElementById(arr[i]).style.backgroundColor = green
                }
            }

        };
    }
})();

