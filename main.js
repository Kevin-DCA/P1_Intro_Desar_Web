var div_answers;
var privateEventTimer;
/** 

 * @function checked verify which options are selected and if they agree with the established format 

 */
function checked1(){
    var prueba=JSON.parse(document.getElementById("JSON").value);
    var lista=document.getElementById("contenido").childNodes;
    var cont=0;
    for (let index = 0; index <= lista.length-1; index++) {
        if(lista[index].type=="checkbox"){
           
        if(lista[index].checked==true){
            cont++;
        }}}
        if(prueba.enBlanco&& cont==0){
            alert("su voto fue enviado correctamente");
            send();
        }
        else if(!prueba.enBlanco&& cont==0){
            alert("su seleccion no puede estar vacia");
        }
   else if(prueba.modalidad.modo=="unica"){
     if (cont>1){
            alert("Seleccione unicamente una opcion");
           }
    else{
        alert("su voto fue enviado correctamente");
        send();
    }
        }
    else if(prueba.modalidad.modo=="multiple"){
        if (cont>parseInt(prueba.modalidad.cantidad,10)){
            alert("Seleccione unicamente "+prueba.modalidad.cantidad+" opciones");
           } 
        else if(cont<parseInt(prueba.modalidad.cantidad,10)){
            alert("faltan "+(prueba.modalidad.cantidad-cont)+" opciones en su seleccion")
        }
        else{alert("su voto fue enviado correctamente"); 
        send();}
        }
        cont=0;
        
}
/** 

 * @function send load the selected checkbox options, convert them to Json format and load it into the answer text area

 */
function send(){
    var lista=document.getElementById("contenido").childNodes;
    var respuestas="{\"respuesta\":[";
    var cont=0;
    for (let index = 0; index <= lista.length-1; index++) {
        if(lista[index].type=="checkbox"){
           
        if(lista[index].checked==true){
            if(cont>=1){respuestas=respuestas+","}
            respuestas=respuestas+"\""+lista[index].id+"\"";
            cont++;
        }}}
        
        document.getElementById("resultado").value=respuestas+"]}"
}
/** 

 * @function actualizar_votacion generates the voting survey according to the JSON format introduced

 */
function actualizar_votacion(){
    div_answers= document.getElementById("contenido");
var prueba=JSON.parse(document.getElementById("JSON").value);

div_answers.innerHTML = '';
var desc=document.createElement("H1");


desc.id="descripcion";
desc.innerHTML=prueba.descripcion;
div_answers.appendChild(desc);
div_answers.appendChild(document.createElement("br"));

var lol=0;
var lio;
var loi;

while(prueba.opciones.length>lol){
    lio =document.createElement("input");
   lio.type="checkbox"
   lio.id="checkbox "+lol;
    lio.id=prueba.opciones[lol]; 
    lio.style.height="40px";
    lio.style.width="50px"
    div_answers.appendChild(lio)
    loi=document.createElement("text");
    loi.innerHTML=prueba.opciones[lol];
    loi.id="checkbox_text "+lol;
    div_answers.appendChild(loi);
    div_answers.appendChild(document.createElement("br"));
    div_answers.appendChild(document.createElement("br"));
    if(!prueba.publica){
       ActivePrivateMode();
    }
    else{unactiveprivateMode();}
   
    lol++;
}} 

/** 

 * @function act_opac  

 */

function act_opac() {

    clearTimeout(privateEventTimer);

    privateEventTimer = setTimeout(()=>{

        ResetMode();

    }, 5000);

};



/** 

 * @function ResetMode update the opacity of the options div with the 5 second rule

 */

function ResetMode(){
    div_answers= document.getElementById("contenido");
    div_answers.style.transition = "opacity 1s ease-in-out";

    div_answers.style.opacity = 0.8;

}



/** 

 * @function ActivePrivateMode actives the private mode 

 */

function ActivePrivateMode(){
    div_answers= document.getElementById("contenido");
    //set opacity value 
    div_answers.style.opacity = 0.8;
    //Add the events
    div_answers.addEventListener("mouseup", setCurrentOpacity);
    div_answers.addEventListener("click", updateCurrentOpacity);
    div_answers.addEventListener("touchstart", changeOpacityEvent);
    div_answers.addEventListener("mousedown", changeOpacityEvent);
    div_answers.addEventListener("touchend", setCurrentOpacity);

}


/** 

 * @function setCurrentOpacity Get the opacity detected in mouseup and set this value to the current style of the options

 * @param {any} Listener event

 */

function setCurrentOpacity() {
    div_answers= document.getElementById("contenido");

    var current_opacity = window.getComputedStyle(div_answers, null).getPropertyValue("opacity");

    div_answers.style.opacity = current_opacity;

    act_opac();

}



/** 

 * @function changeOpacityEvent Set a transition to change the opacity until the mouse is up

 */

function changeOpacityEvent() {

    div_answers.style.transition = "opacity 2s ease-in-out";

    div_answers.style.opacity = 0;

}



/** 

 * @function updateCurrentOpacity If mouse clicks over the options, the timeout will be reset

 */

function updateCurrentOpacity(e) {

    act_opac();   

}



/** 

 * @function unactiveprivateMode Removes the events that executes in private mode.

 */

function unactiveprivateMode(){

    div_answers.removeEventListener("mouseup", setCurrentOpacity);

    div_answers.removeEventListener("mousedown", changeOpacityEvent);

    div_answers.removeEventListener("click", updateCurrentOpacity);

    div_answers.removeEventListener("touchend", setCurrentOpacity);

    div_answers.removeEventListener("touchstart", changeOpacityEvent);

}