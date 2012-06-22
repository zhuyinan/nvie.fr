//Self-invoking function
(function(){
    var content = document.getElementById('content');
    var host = "http://" + (window.location.host)+ "/";
    var content = "content/";
    var lang ="";
    
    //AJAX
    //Create xhr object
    function getHttpRequest(){
        //Mozilla.Safari
        if (window.XMLHttpRequest){
            return new XMLHttpRequest() ;
        }
        //IE
        else if (window.ActiveXObject){
            return new ActiveXObject("Microsoft.XMLHTTP") ;
        }
    }

    //GET METHOD
    function sendRequest(url,callback){
        var xhr = getHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    var result = xhr.responseText;
                    callback(result);
                }
            }
        }
        xhr.send(null);
    }

    function getContent(page){
        url = host + content  + 'about.html';
        sendRequest(url,function(html){
             document.getElementById("content").innerHTML= html;
        });
    }

    function loadPage(){
        //get page name according to anchor link 
    }

    window.onhashchange=getContent;
    getContent();


})();
