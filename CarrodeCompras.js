//Carrito de compras 
let productos = [];

// Función para mostrar opciones
function mostrarMenu() {
    return parseInt(prompt(`
        "Opciones disponibles"
        1.- Agregar Producto
        2.- Ver todos los productos
        3.- Marcar productos como agregados al carrito
        4.- Salir  
    `));
}

// Función para agregar al carrito
function agregarProducto() {
    let nombre = prompt("Ingresa al carrito lo que vas a comprar");
    if (nombre) {
        let producto = {
            nombre: nombre,
            completada: false
        };
        productos.push(producto);
        alert("Producto agregado con éxito");
    } else {
        alert("El carrito no puede estar vacío");
    }
}

// Función para ver los productos en el carrito
function verProducto() {
    if (productos.length === 0) {
        alert("No hay productos en la lista");
    } else {
        let mensaje = "Lista del carrito: \n";
        productos.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.nombre} - ${producto.completada ? "Agregado" : "Pendiente"}\n`;
        });
        alert(mensaje);
    }
}

// Función para marcar los productos como agregados al carrito
function marcarProductoCompletada() {
    if (productos.length === 0) {
        alert("No hay productos en la lista");
    } else {
        let nombreProducto = parseInt(prompt("Ingresa el número del producto que deseas marcar como agregado"));
        if (nombreProducto > 0 && nombreProducto <= productos.length) {
            productos[nombreProducto - 1].completada = true;
            alert("Producto marcado como agregado");
        } else {
            alert("Producto no válido");
        }
    }
}

// Función principal para manejar el programa
function iniciarPrograma() {
    let continuar = true;
    while (continuar) {
        let opcion = mostrarMenu();
        switch (opcion) {
            case 1:
                agregarProducto();
                break;
            case 2:
                verProducto();
                break;
            case 3:
                marcarProductoCompletada();
                break;
            case 4:
                alert("Saliendo del programa...");
                continuar = false;
                break;
            default:
                alert("Opción no válida. Intenta nuevamente");
        }
    }
    alert("Proceso Terminado");
}

// Iniciar el programa
iniciarPrograma();