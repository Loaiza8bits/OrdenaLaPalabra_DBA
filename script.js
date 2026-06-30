
const banco=[
{palabra:"CONCENTRACION",categoria:"Atención",def:"Capacidad de sostener la atención en una tarea específica."},
{palabra:"ENFOQUE",categoria:"Atención",def:"Orientación de la atención hacia información relevante."},
{palabra:"VIGILANCIA",categoria:"Atención",def:"Capacidad de mantener atención durante períodos prolongados."},
{palabra:"OBSERVACION",categoria:"Atención",def:"Obtención de información mediante atención a los detalles."},
{palabra:"SELECTIVIDAD",categoria:"Atención",def:"Proceso de priorizar información importante."},
{palabra:"DISTRACCION",categoria:"Atención",def:"Desviación involuntaria de la atención."},

{palabra:"RETENCION",categoria:"Memoria",def:"Capacidad de mantener información almacenada."},
{palabra:"RECUERDO",categoria:"Memoria",def:"Acceso a información previamente aprendida."},
{palabra:"EVOCACION",categoria:"Memoria",def:"Recuperación consciente de información almacenada."},
{palabra:"REPASO",categoria:"Memoria",def:"Estrategia para fortalecer conocimientos."},
{palabra:"ALMACENAMIENTO",categoria:"Memoria",def:"Proceso de conservar información."},
{palabra:"RECUPERACION",categoria:"Memoria",def:"Obtención de información almacenada."},

{palabra:"VISION",categoria:"Percepción",def:"Procesamiento de información visual."},
{palabra:"ESCUCHA",categoria:"Percepción",def:"Procesamiento de información auditiva."},
{palabra:"INTERPRETACION",categoria:"Percepción",def:"Asignación de significado a estímulos."},
{palabra:"ESTIMULO",categoria:"Percepción",def:"Elemento que provoca una respuesta sensorial."},
{palabra:"SENSACION",categoria:"Percepción",def:"Experiencia producida por los sentidos."},
{palabra:"RECONOCIMIENTO",categoria:"Percepción",def:"Identificación de patrones o estímulos."},

{palabra:"INTERES",categoria:"Motivación",def:"Disposición favorable hacia una actividad."},
{palabra:"ESFUERZO",categoria:"Motivación",def:"Energía aplicada para alcanzar una meta."},
{palabra:"PERSISTENCIA",categoria:"Motivación",def:"Continuar a pesar de dificultades."},
{palabra:"OBJETIVO",categoria:"Motivación",def:"Meta que orienta la conducta."},
{palabra:"INCENTIVO",categoria:"Motivación",def:"Factor que impulsa una acción."},
{palabra:"LOGRO",categoria:"Motivación",def:"Resultado alcanzado tras un esfuerzo."},

{palabra:"ANALISIS",categoria:"Cognición",def:"Examen detallado para comprender mejor."},
{palabra:"REFLEXION",categoria:"Cognición",def:"Consideración cuidadosa de información."},
{palabra:"RAZONAMIENTO",categoria:"Cognición",def:"Proceso para obtener conclusiones."},
{palabra:"DEDUCCION",categoria:"Cognición",def:"Inferencia lógica a partir de premisas."},
{palabra:"COMPRENSION",categoria:"Cognición",def:"Entendimiento de información."},
{palabra:"ABSTRACCION",categoria:"Cognición",def:"Identificación de características esenciales."},

{palabra:"COMPETENCIA",categoria:"Aprendizaje",def:"Capacidad de aplicar conocimientos."},
{palabra:"HABILIDAD",categoria:"Aprendizaje",def:"Capacidad desarrollada mediante práctica."},
{palabra:"EXPERIENCIA",categoria:"Aprendizaje",def:"Conocimiento obtenido por vivencias."},
{palabra:"ESTRATEGIA",categoria:"Aprendizaje",def:"Plan para alcanzar objetivos."},
{palabra:"CONOCIMIENTO",categoria:"Aprendizaje",def:"Información adquirida mediante aprendizaje."},
{palabra:"PRACTICA",categoria:"Aprendizaje",def:"Repetición para mejorar desempeño."},

{palabra:"PLANIFICACION",categoria:"Metacognición",def:"Organización previa de acciones."},
{palabra:"MONITOREO",categoria:"Metacognición",def:"Seguimiento del propio aprendizaje."},
{palabra:"EVALUACION",categoria:"Metacognición",def:"Valoración de resultados y procesos."},
{palabra:"AUTOCONTROL",categoria:"Metacognición",def:"Regulación del comportamiento."},
{palabra:"AUTORREGULACION",categoria:"Metacognición",def:"Gestión consciente del aprendizaje."},
{palabra:"SUPERVISION",categoria:"Metacognición",def:"Revisión continua de acciones."}
];

let dificultad, lista=[], actual, indice=0, puntos=0;

function mostrarInstrucciones(){
pantallaInicio.classList.add("hidden");
pantallaInstrucciones.classList.remove("hidden");
}
function mostrarDificultades(){
pantallaInstrucciones.classList.add("hidden");
pantallaDificultad.classList.remove("hidden");
}

function iniciarJuego(dif){
dificultad=dif;
pantallaDificultad.classList.add("hidden");
pantallaJuego.classList.remove("hidden");
lista=[...banco].sort(()=>Math.random()-0.5).slice(0,10);
indice=0;puntos=0;
siguiente();
}

function scramble(word){
let letras, iguales;
do{
letras=word.split("");
for(let i=letras.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[letras[i],letras[j]]=[letras[j],letras[i]];
}
iguales=0;
for(let i=0;i<word.length;i++){if(letras[i]===word[i]) iguales++;}
}while(iguales>2);
return letras.join(" ");
}

function siguiente(){
if(indice>=10){finalizar();return;}
actual=lista[indice];
contador.textContent=`Concepto ${indice+1} de 10`;
categoria.textContent=`Categoría: ${actual.categoria}`;

if(dificultad==="facil"){
definicion.textContent=actual.def;
primeraLetra.textContent="Empieza por: "+actual.palabra[0];
}else if(dificultad==="medio"){
definicion.textContent=actual.def;
primeraLetra.textContent="";
}else{
definicion.textContent="";
primeraLetra.textContent="";
}

palabra.textContent=scramble(actual.palabra);
respuesta.value="";
retro.innerHTML="";
barra.style.width=((indice/10)*100)+"%";
}

function verificar(){
let r=respuesta.value.trim().toUpperCase();
if(r===actual.palabra){
puntos++;
retro.innerHTML="✅ Correcto<br>"+actual.def;
}else{
retro.innerHTML="❌ Correcta: "+actual.palabra+"<br>"+actual.def;
}
puntaje.textContent=puntos;
setTimeout(()=>{indice++;siguiente();},1800);
}

function finalizar(){
pantallaJuego.classList.add("hidden");
pantallaFinal.classList.remove("hidden");
resultado.textContent=`Aciertos: ${puntos} de 10`;
if(puntos<=3) mensajeFinal.textContent="Sigue practicando los conceptos DBA.";
else if(puntos<=7) mensajeFinal.textContent="Buen trabajo. Reconoces varios conceptos DBA.";
else mensajeFinal.textContent="Excelente desempeño. Demuestras un buen dominio de los conceptos DBA.";
}
