// Este es nuestro almacenamiento, donde se utiliza un arreglo
let tareas = [];

// Mostramos las diferentes opciones
function mostrarMenu(){
    return parseInt(prompt(`
        "Opciones disponibles"
        1. Agregar tarea.
        2. Ver todas las tareas.
        3. Marcar tareas completadas.
        4. Salir
        `));
}

// Agregar tarea
function agregarTarea(){
    let nombre = prompt("Ingresa el nombre de la tarea");
    if(nombre){
        let tarea = {
            nombre: nombre,
            completada: false
        };
        tareas.push(tarea);
        alert("Tarea agregada con éxito");
    }else{
        alert("El nombre de la tarea no puede estar vacío");
    }
}

// Ver tareas
function verTarea(){
    if(tareas.length == 0){
        alert("No hay tareas en la lista");
    }else{
        let mensaje = "Lista de tareas: \n";
        tareas.forEach((tarea, index)=>{
            
        });
    }
}

// Funcion principal
function iniciarPrograma(){
    let continuar = true;
    while(continuar){
        let opcion = mostrarMenu();
        switch(opcion){
            case 1:
                agregarTarea();
                break;
            case 2:
                verTarea();
                break;
            case 3:
                marcarTarea();
                break;
            case 4:
                alert("Saliendo del programa...");
                continuar = false;
                break;
            default:
                alert("Opción no valida");
                break;

        }
    }
    alert("Programa finalizado");

}

iniciarPrograma();