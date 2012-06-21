//Self-invoking function
(function(){
    //ajax to get content     
    function getHTTPRequest(){ 
         var xhr = false; 
         if (window.XMLHttpRequest) 
            xhr = new XMLHttpRequest(); //IE除外的浏览器, ie sucks
         else if (window.ActiveXObject){ 
                try { 
                        xhr = new ActiveXObject("Msxm12.XMLHTTP");//最新版的ActiveX对象 
                    } catch(e){ 
                            try { 
                                    xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
                                } catch(e) { 
                                    xhr = false; 
                                    } 
                            } 
               } 
    } 


}){};
