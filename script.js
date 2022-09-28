var codeNode = document.querySelector("#code");
var langIdNode = document.getElementById("language");
var opText = document.getElementById("opText");
var compile = document.getElementById("compile");
var image = document.getElementById("image");

// PFB the details of API
// URL : https://codequotient.com/api/executeCode
// Method : POST
// DATA to Send : { "code" : "" , langId : ""}



compile.addEventListener("click",function(){
    var code = codeNode.value;
    var langId = langIdNode.value;
    sender(code,langId);
     opText.innerHTML="Loading..";
     image.setAttribute("src","load-loading.gif");
    
})
function sender(code,langId){
    console.log("req sent");
    var request = new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    request.setRequestHeader("Content-Type","application/json");
    var body = {
        "code":code,
        langId:langId
    }
    request.send(JSON.stringify(body));
    request.addEventListener("load",function(){
        const result = JSON.parse(request.responseText);
        console.log(result);
        console.log(request.responseText);
        console.log(result.codeId);
        if(result.error==="Code is null"){
            opText.innerHTML="Code block is Empty"
        }else{
        receiver(result.codeId);
        }
    })
    
}
function receiver(codeId){
    //  setTimeout(function(){
    //  var request = new XMLHttpRequest();
    //  request.open("GET","https://codequotient.com/api/codeResult/"+codeId);
    //  request.send();
    //     request.addEventListener("load",function(){
    //     const result = JSON.parse(request.responseText);
    //     console.log(result);
    //     const result1 = JSON.parse(result.data);
    //     console.log(result1.output);
    //     console.log(result1["output"]);
    //     opText.innerText = ""+result1.output+result1.errors;
    //  })},2000);

    
    var countId= setInterval(function(){
     var request = new XMLHttpRequest();
     request.open("GET","https://codequotient.com/api/codeResult/"+codeId);
     request.send();
     
        request.addEventListener("load",function(){
        const result = JSON.parse(request.responseText);
        console.log(result);
        const result1 = JSON.parse(result.data);
        if (result1.status!=="Pending"){

        console.log(result1.output);
        console.log(result1["output"]);
        opText.innerText = ""+result1.output+result1.errors;
        clearInterval(countId);
        }
     })},2000);
     

}
