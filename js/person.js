window.onload = function() {
    var commentList = document.getElementById("commentList");
    var commentSubmit = document.getElementById("commentSubmit");
    var commentInput = document.getElementById("commentInput");
    var comment_delete;
    //delete
    function commentDelete() {
        comment_delete = document.querySelectorAll(".delete");
        for (var i = 0, len = comment_delete.length; i < len; i++) {
            comment_delete[i].onclick = function() {
                var comment = this.parentNode.parentNode;
                comment.remove();
            }
        }
    }
    commentDelete();

    commentSubmit.onclick = function() {
        if (commentInput.value.length == 0) {
            alert("评论内容为空，无法发送");
            return;
        }
        let ctx = commentInput.value;
        let timestamp = getTimestamp();
        commentInput.value = "";
        sendComment(ctx, getTimestamp());
        commentDelete();
    }

    function getTimestamp() {
        let date = new Date();
        let year = fillZero(date.getFullYear(), 4);
        let month = fillZero(date.getMonth() + 1, 2);
        let day = fillZero(date.getUTCDate(), 2);
        let hour = fillZero(date.getHours(), 2);
        let minutes = fillZero(date.getMinutes(), 2);
        let format = `${year}-${month}-${day} ${hour}:${minutes}`;
        return format;
    }

    function fillZero(num, totalLen) {
        let str = num.toString();
        let sum = totalLen - str.length;
        for (let i = 0; i < sum; i++) {
            str = "0" + str;
        }
        return str;
    }

    function sendComment(ctx, timestamp) {
        let template = `
        <div class="col-center-comment4 box">
            <img class="col-center-comment2-avatar" src="../images/t2.png" alt="avatar">
            <div class="col-center-comment2-context">
                <div class="col-center-comment2-name">
                    狗蛋
                    <span class="col-center-comment2-span">${timestamp}</span>
                </div>
                <div class="col-center-comment2-article">
                    <p>${ctx}</p>
                </div>
                <a href="javascript:void(0);" class="delete">删除</a>
            </div>
        </div>
      `
        commentList.insertAdjacentHTML("afterbegin", template);
    }
}