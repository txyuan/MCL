
function createScript(src,callback){
  let script = document.createElement("script");
  script.src=src;
  if(callback){
    document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
      if (/loaded|complete/.test(script.readyState)) {
        script.onreadystatechange = null
        callback()
      }
     }
  }
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(script);
}

export default createScript;


