var users = [
    ["qwt", "123456"],
    ["why", "654321"]
];
users.push(["www", "123456"]);
/*登录*/
function process() {
    var un = Login.account.value;
    var pwd = Login.password.value;
    if (un === "") {
        alert("用户名不能为空!");
        document.Login.account.focus();
        return;
    } else if (pwd === "") {
        alert("密码不能为空!");
        document.Login.password.focus();
        return;
    }
    for (i = 0; i < users.length; i++) {
        if (users[i][0] == un) break;
    }
    if (i < users.length) {
        if (users[i][1] == pwd) {
            alert("登录成功");
            location.href = "person.html";
        } else {
            alert("密码错误!");
            document.Login.password.focus();
        }
    } else {
        alert("用户名错误！");
        document.Login.account.focus();
    }
}

/*轮播图*/
window.onload = function() {
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var timer;

    function animate(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        if (newLeft > -900) {
            list.style.left = -4500 + 'px';
        }
        if (newLeft < -4500) {
            list.style.left = -900 + 'px';
        }
    }

    function buttonsShow() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == "on") {
                buttons[i].className = "";
            }
        }
        buttons[index - 1].className = "on";
    }

    prev.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = 5
        }
        buttonsShow();
        animate(900);
    };

    next.onclick = function() {
        index += 1;
        if (index > 5) {
            index = 1
        }
        animate(-900);
        buttonsShow();
    };

    function play() {
        timer = setInterval(function() {
            next.onclick();
        }, 2000)
    }

    function stop() {
        clearInterval(timer);
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    play();

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if (this.className == "on") {
                return;
            }
            var clickIndex = parseInt(this.getAttribute('index'));
            var offset = 900 * (clickIndex - index);
            animate(-offset);
            index = clickIndex;
            buttonsShow();
        }
    }
}