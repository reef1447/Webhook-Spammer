(function() {
    'use strict';
    var h = $("<div>").appendTo($("body").css({
        "text-align": "center"
    }));
    $("<div>",{text:"最終更新：2020/08/02 1:31"}).appendTo(h);
    $("<h1>",{text:"DiscordのWebhookテスト"}).appendTo(h);
    var input_webhook = addInput("Webhook URL","https://discordapp.com/api/webhooks/000000000000000000/aaaaaaaaaaaaaaaaaaaaaaaaa");
    var input_username = addInput("名前");
    var input_avatar = addInput("アバター画像","https://github.com/qiita.png");
    var input_text = addTextarea("発言内容");
    h.append("<br>");
    var input_tts = addBtnToggle("tts(読み上げ)");
    h.append("<br>");
    addBtn("発言",function(){
        var data = {
            "username": input_username.val(),
            "avatar_url": input_avatar.val(),
            content: input_text.val(),
            tts: input_tts()
        };
        var xhr = new XMLHttpRequest();
        xhr.open( 'POST', input_webhook.val() );
        xhr.setRequestHeader( "content-type", "application/json" );
        xhr.send(JSON.stringify(data));
    });
    function addTextarea(placeholder){
        function shape(){
            var text = t.val();
            t.height((text.split('\n').length + 2) + "em");
        }
        var t = $("<textarea>", {
            placeholder: placeholder
        }).appendTo(h).keyup(shape).click(shape).css({
            width: "70%",
            height: "3em"
        });
        return t;
    }
    function addInput(title, placeholder){
        return $("<input>",{
            placeholder: placeholder
        }).appendTo($("<div>",{text: title + ':'}).appendTo(h));
    }
    function addBtn(title, func){
        return $("<button>",{text:title}).click(func).appendTo(h);
    }
    function addBtnToggle(title){
        var flag = false;
        var elm = addBtn(title,function(){
            flag = !flag;
            check.prop("checked", flag);
            setColor();
        });
        var check = $("<input>",{type:"checkbox"}).prependTo(elm);
        function setColor(){
            elm.css("background-color", flag ? "orange" : "gray");
        }
        setColor();
        return function(){
            return flag;
        }
    }
})();
