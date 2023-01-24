
const generar = document.querySelector(".generar");
const formulario = document.querySelector(".formulario");
const caja_valores= document.querySelector(".valores");
const restart = document.querySelector(".restart");

const valorN = document.querySelector(".valorN");
const columnaX = document.querySelector(".colX");
const columnaY = document.querySelector(".colY");
const start = document.querySelector(".start");
const arrXtemp = document.getElementsByName("arrXtemp[]");
const arrYtemp = document.getElementsByName("arrYtemp[]");
const valor_ordenada = document.querySelector(".valor_ordenada");
const valor_pendiente = document.querySelector(".valor_pendiente");
const valor_ecuacion = document.querySelector(".valor_ecuacion");
const valor_todos = document.querySelector(".valor_todos");


//Generación de celdas de muestra

let arrGuardarX = [];
let arrGuardarY = [];

const generarColsX = () => {
    for (i = 0; i < valorN.value; i++) {
        let item = document.createElement("input");
        item.setAttribute("type", "number");
        item.setAttribute("name", "arrXtemp[]");
        columnaX.appendChild(item);
    }
}

const generarColsY = () => {
    for (i = 0; i < valorN.value; i++) {
        let item = document.createElement("input");
        item.setAttribute("type", "number");
        item.setAttribute("name", "arrYtemp[]");
        columnaY.appendChild(item);
    }
}

restart.addEventListener("click", ()=> window.location.reload())

generar.addEventListener("click", () => {
    restart.classList.remove("oculto");
    generarColsX();
    generarColsY();
    generar.disabled= "true";
    start.classList.remove("oculto");
})

start.addEventListener("click", () => {
    caja_valores.classList.remove("oculto");
    formulario.classList.add("oculto");
    for (i = 0; i < valorN.value; i++) {
        arrGuardarX.push(arrXtemp[i].value);
        arrGuardarY.push(arrYtemp[i].value);
    }
    operaciones();
})

//----------------------------------------------------------

const operaciones = () => {
    let arrX = arrGuardarX;
    let arrY = arrGuardarY;
    let n = valorN.value;
    
    let arrX1 = arrX.slice(1);
    let arrY1 = arrY.slice(1);

    //generación de operaciones independientes (b0)
    let sigmaY0 = arrY.reduce((acumulador, elemento) => parseInt(acumulador) + parseInt(elemento), 0);
    let sigmaX0 = arrX.reduce((acumulador, elemento) => parseInt(acumulador) + parseInt(elemento), 0);

    let xPow20 = arrX.map(x => Math.pow(x, 2));
    let sigmaXinpow20 = xPow20.reduce((acumulador, elemento) => acumulador + elemento, 0);  //sigma de x al 2

    const multiXY0 = () => {
        let sum = 0;
        for (let i = 0; i < arrX.length; i++) {
            sum += arrX[i] * arrY[i];
        }
        return sum;
    }

    let xSigmaPow20 = Math.pow(sigmaX0, 2); //sigma al 2 de x


    //Operación ordenada del origen (b0)
    let b0numerador = sigmaY0 * sigmaXinpow20 - sigmaX0 * multiXY0();
    let b0denominador = n * sigmaXinpow20 - xSigmaPow20;
    let b0 = b0numerador / b0denominador;


    //generación de operaciones independientes (b0)
    let sigmaY1 = arrY1.reduce((acumulador, elemento) => parseInt(acumulador) + parseInt(elemento), 0);
    let sigmaX1 = arrX1.reduce((acumulador, elemento) => parseInt(acumulador) + parseInt(elemento), 0);

    let xPow21 = arrX1.map(x => Math.pow(x, 2));
    let sigmaXinpow21 = xPow21.reduce((acumulador, elemento) => acumulador + elemento, 0);

    const multiXY1 = () => {
        let sum = 0;
        for (let i = 1; i < arrX.length; i++) {
            sum += arrX[i] * arrY[i];
        }
        return sum;
    }

    let xSigmaPow21 = Math.pow(sigmaX1, 2);

    let b1numerador = n * multiXY1() - sigmaX1 * sigmaY1;
    let b1denominador = n * sigmaXinpow21 - xSigmaPow21;
    let b1 = b1numerador / b1denominador;

    valor_ordenada.textContent = b0;
    valor_pendiente.textContent = b1;
    valor_ecuacion.textContent = `Y = ${b0} + ${b1}X`;

    for (i = 0; i < n; i++) {
        let item = document.createElement("div");
        item.textContent= `Valor de ecuacuón para X${i}: ${b0 + b1*arrX[i]}`;
        valor_todos.appendChild(item);
    }
}

