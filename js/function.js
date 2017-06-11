var row = 16, col = 30;
var landmines = [99];
var peek = [-col - 1, -col, -col + 1, -1, +1, col - 1, col, col + 1];
var numsSrc = [8];
var isFlag = false;
var landmineNum = 99;
var time = 0;
function init() {
    var area = document.getElementById("landmineArea");
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var btn = document.createElement("button");
            var img = document.createElement("img");
            var func = 'choose(' + (i * col + j) + ')';
            btn.setAttribute('onclick', func);
            var id = 'btn' + (i * col + j);
            btn.setAttribute('id', id);
            id = 'img' + (i * col + j);
            img.setAttribute('id', id);
            btn.appendChild(img);
            area.appendChild(btn);
        }
        area.appendChild(document.createElement("br"));
    }
    for (var i = 1; i <= 8; i++) {
        numsSrc[i - 1] = "img/" + i + ".jpg";
    }
    createLandmines();
    window.setInterval(countdown, 1000);
}

function createLandmines() {
    var max = col * row - 1;
    for (var i = 0; i < 99; i++) {
        var temp = 0;
        do {
            var isRepeat = false;
            temp = Math.floor(Math.random() * (max + 1));
            if (landmines.indexOf(temp) != -1) isRepeat = true;
        } while (isRepeat);
        landmines[i] = temp;
    }
}

function choose(n) {
    if (isFlag) onFlag(n);
    else {
        if (landmines.indexOf(n) != -1) {
            alert("爆炸啦!");
            for (var i = 0; i < 99; i++) {
                $('#img' + landmines[i]).attr('src', 'img/landmine.jpg');
            }
            for (var i = 0; i < col * row; i++) {
                $('#btn' + i).attr('disabled', 'disabled');
            }
        } else {
            visit(n);
        }
    }
}

function changeMouse() {
    isFlag = !isFlag;
    if (isFlag) {
        document.getElementById("btn1").innerHTML = "換按鍵";
    } else {
        document.getElementById("btn1").innerHTML = "換旗子";
    }


}

function onFlag(n) {
    if ($('#btn' + n).hasClass('clicked')) {
        $('#btn' + n).removeClass('clicked');
        $('#img' + n).attr('src', '');
        $('#landmineNum').text(++landmineNum);
    } else {
        $('#btn' + n).addClass('clicked');
        $('#img' + n).attr('src', 'img/flag.jpg');
        $('#landmineNum').text(--landmineNum);
    }
}

function checkLandmine(nowIndex, peekIndex) {
    if (checkPeek(nowIndex, peekIndex)) return landmines.indexOf(nowIndex + peek[peekIndex]) != -1;
}

function checkPeek(nowIndex, peekIndex) {
    switch (peekIndex) {
        case 0:
            if (nowIndex < col || nowIndex % col == 0) return false;
            break;
        case 1:
            if (nowIndex < col) return false;
            break;
        case 2:
            if (nowIndex < col || nowIndex % col == (col - 1)) return false;
            break;
        case 3:
            if (nowIndex % col == 0) return false;
            break;
        case 4:
            if (nowIndex % col == (col - 1)) return false;
            break;
        case 5:
            if (nowIndex >= (col * (row - 1)) || nowIndex % col == 0) return false;
            break;
        case 6:
            if (nowIndex >= (col * (row - 1))) return false;
            break;
        case 7:
            if (nowIndex >= (col * (row - 1)) || nowIndex % col == (col - 1)) return false;
            break;
    }
    return true;
}

function visit(n) {
    if (n < 0) return;
    $('#btn' + n).addClass('clicked');
    $('#btn' + n).attr('disabled', 'disabled');
    $('#btn' + n).attr('style', 'background:#AAAAAA');
    $('#img' + n).attr('style', 'background:#AAAAAA');
    var num = 0;
    for (var i = 0; i < 8; i++) {
        if (checkLandmine(n, i)) {
            num++;
        }
    }
    if (num > 0) {
        $('#img' + n).attr('src', numsSrc[num - 1]);
    } else {
        for (var i = 0; i < 8; i++) {
            if (checkPeek(n, i)) {
                if (!$('#btn' + (n + peek[i])).hasClass('clicked')) {
                    visit(n + peek[i]);
                }
            }
        }
    }
}

function countdown() {
    $('#time').text(++time);
}