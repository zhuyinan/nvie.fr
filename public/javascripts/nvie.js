//Self-invoking function
(function(){
    var content = document.getElementById('content');
    var host = "http://" + (window.location.host)+ "/";
    var contentUrl = "content/";
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
                    callback(xhr.responseText);
                }
            }
        }
        xhr.send(null);
    }

    function getContent(page,callback){
        url = host + contentUrl + page  + '.html';
        document.title = 'Nvie-' + page.toUpperCase();
        sendRequest(url,function(result){
             content.innerHTML = result;
             if(typeof callback === 'function')
                callback();
        });
    }

    function acitveNav(page){
        var navlist = document.getElementById("nav").children; 
        for(var i=0; i<navlist.length;i++){
            if( navlist[i].childNodes.length > 0 && (navlist[i].firstChild.innerHTML).toLowerCase() ==  page.toLowerCase()){ 
                navlist[i].className = "active";
        }else{
                navlist[i].className = navlist[i].className.replace( /(?:^|\s)active(?!\S)/ , '');
        }
    }
    }

    function loadPage(){
        //get page name according to anchor link 
        page = window.location.hash.substr(2);
        acitveNav(page);
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
            case "success":
                getContent(page);
                break;

            default:
                getContent("404");
                break;
        }
    }
    
    //load page if everything is OK
    if(getHttpRequest() !== null && "onhashchange" in window && window.addEventListener){
        window.onhashchange=loadPage;
        loadPage();
    }else{
        getContent("update");
    }
    
    

})();

//validation for form
function validate_email(field) {
    with (field) {
        apos=value.indexOf("@")
            dotpos=value.lastIndexOf(".")
            if (apos<1||dotpos-apos<2) {
                document.getElementById("email").className = "control-group error";    
                return false}
            else {
                document.getElementById("email").className = document.getElementById("email").className.replace( /(?:^|\s)error(?!\S)/ , ' success');    
                return true
            }
    }
}

function validate_required(field) {
    with (field) {  
        if(value == ""){
            document.getElementById(field.id).className = "control-group error";    
            return false;}
        else{
            document.getElementById(field.id).className = document.getElementById(field.id).className.replace( /(?:^|\s)error(?!\S)/ , ' success');
            return true;
        } 
    }

}

function validate_form(thisform)
{
    with (thisform)
    {
        if (validate_email(email) == false) {email.focus(); return false}
        if (validate_required(title) == false){title.focus(); return false}
        if (validate_required(message) == false){message.focus(); return false}
    }
}
