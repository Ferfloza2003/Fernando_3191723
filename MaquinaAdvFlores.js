let numeroMaquina = Math.floor(Math.random()*(10 - 1)+1);
    console.log(numeroMaquina);
 
let numeroUsuario = parseInt ( prompt("Dime un numero del 1 al 10"));

let vidas= 3;
 while (numeroMaquina !== numeroUsuario && vidas > 1){
    vidas --;
    numeroUsuario = parseInt (prompt ("Puedes volver a intentar, aun te quedan: "+vidas));
 }

 if (numeroMaquina === numeroUsuario){
    console.log("Correcto, haz triunfado");
 }else {
    console.log("Fallaste perdedor");
    console.log("El numero correcto era: "+numeroMaquina);

 }
