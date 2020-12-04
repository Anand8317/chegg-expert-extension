var countdown = new Audio(chrome.runtime.getURL("countdown.mp3"));

// var fontScript = document.createElement("script");
// fontScript.src = "https://kit.fontawesome.com/6c05aa3d79.js";
// fontScript.crossOrigin = "anonymous";
// document.getElementsByTagName("head")[0].appendChild(fontScript);

// Add styling sheet for extension-box
var css = document.createElement("style");
css.type = 'text/css';
const style = " #ext-exit-btn:hover, #ext-skip-btn:hover{\
                    background: #E71C23;\
                    color: white;\
                }\
                #ext-answer-btn:hover, #ext-submit-btn:hover{\
                    background: #019031;\
                    color: white;\
                }\
                .ext-btn{\
                    margin: 10px 0;\
                    padding: 0 20px;\
                    border-radius: 5px;\
                    outline: none;\
                }\
                .lock-overlay{\
                    display: none;\
                    width: 100%;\
                    height: 100%;\
                    background: red;\
                    color: white;\
                }\
            ";
css.appendChild(document.createTextNode(style));
document.getElementsByTagName("head")[0].appendChild(css);

// Add extension box at top of the page
var node = document.createElement("div");
node.setAttribute("id", "extension-box");
node.setAttribute("style", "display: flex; background: black; position: fixed; top: 0vh; height: 60px; width: 100vw; z-index: 10000; flex-wrap: wrap; justify-content: space-around;");
node.innerHTML = "  <button id = \"ext-exit-btn\" class = \"ext-btn\">EXIT</button>\
                    <button id = \"ext-skip-btn\" class = \"ext-btn\">SKIP TO NEXT QUESTION</button>\
                    <button id = \"ext-answer-btn\" class = \"ext-btn\">ANSWER</button>\
                    <button id = \"ext-submit-btn\" class = \"ext-btn\" style = \"display: none\">SUBMIT ANSWER</button>\
                ";
document.getElementsByTagName("body")[0].appendChild(node);

// Get time left and log
var id = setInterval(function(){
    var data = JSON.parse(window.localStorage.jStorage);
    if(data.minutes == 0 && (data.seconds == "10" || data.seconds == "11")){
        countdown.play();
    }
}, 1000);

if(JSON.parse(window.localStorage.jStorage).questionSkipSource == "a"){
    console.log("Answer button clicked");
    clearInterval(id);
    document.getElementById('ext-answer-btn').setAttribute('disabled', true);
    document.getElementById('ext-answer-btn').style.display = "none";
    document.getElementById('ext-submit-btn').style.display = "block";
}

// Button click events
document.getElementById('ext-exit-btn').addEventListener('click', function (){
    document.getElementById('skipQuestion-Leave').click();
});

document.getElementById('ext-skip-btn').addEventListener('click', function (){
    document.getElementById('skipQuestion').click();
    document.getElementById('noSubKnowledge').click();
    document.getElementsByClassName('btn-primary')[0].click();
});

document.getElementById('ext-answer-btn').addEventListener('click', function (){
    document.getElementById('ques-ans-btn').click();
    document.getElementsByClassName('lock-overlay')[0].style.display = "block";
});

document.getElementById('ext-submit-btn').addEventListener('click', () => {
    document.getElementById('submit-ans-btn').click();
    document.querySelectorAll(".primary.btn-lg.btn-primary")[1].click();
});

document.getElementById('ques-ans-btn').addEventListener('click', function (){
    console.log("Answer button clicked");
    clearInterval(id);
    document.getElementById('ext-answer-btn').setAttribute('disabled', true);
    document.getElementById('ext-answer-btn').style.display = "none";
    document.getElementById('ext-submit-btn').style.display = "block";
    document.getElementById("extension-box").style.background = "black";
});

document.getElementById('ext-skip-btn').focus();