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

    function getContent(page,callback){
        url = host + content + page  + '.html';
        sendRequest(url,function(result){
             document.getElementById("content").innerHTML= result;
             if(typeof callback === 'function')
                callback();
        });
    }

    function loadPage(){
        //get page name according to anchor link 
        page = window.location.hash.substr(2);
        switch (page) {
            case "":
                page = "home";
                getContent(page);
                break;  
            case "cv":
                getContent(page, function () {
                    var birthday=new Date("1988-09-30".replace(/-/g, "\/")); 
                    var d=new Date(); 
                    var age = d.getFullYear()-birthday.getFullYear()-((d.getMonth()<birthday.getMonth()|| d.getMonth()==birthday.getMonth() && d.getDate()<birthday.getDate())?1:0);
                    document.getElementById('age').innerHTML =  age;
                    });
                break;
            case "about":
                getContent(page);
                break;
            case "contact":
                getContent(page);
                break;
            default:
                getContent("error");
                break;
        }
    }
    
    //load page if everything is OK
    if(getHttpRequest() !== null && "onhashchange" in window ){
        window.onhashchange=loadPage;
        loadPage();
    }else{
        getContent("update");
    }
    

})();
