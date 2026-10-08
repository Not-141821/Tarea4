// 1. Base de datos con las rutas exactas de tus imágenes en /images
const productos = [
    { id: 1, nombre: "U.V.S.T.", precio: 45, imagen: "images/uvst.jpeg" },
    { id: 2, nombre: "CALLAITA", precio: 45, imagen: "images/callaita.jpg" },
    { id: 3, nombre: "JBalvin-Boy", precio: 40, imagen: "images/jbalvin.jpeg" },
    { id: 4, nombre: "FERXXO", precio: 45, imagen: "images/feid.jpeg" },
    { id: 5, nombre: "NEMMZZZ", precio: 40, imagen: "images/neemzz.jpg" },
    { id: 6, nombre: "2pac Shakur", precio: 50, imagen: "images/2pac.jpg" },
    { id: 7, nombre: "50-CENT", precio: 50, imagen: "images/50cent.jpg" },
    { id: 8, nombre: "CUCO", precio: 40, imagen: "images/CucoIwbwu.jpeg" },
    { id: 9, nombre: "DATA", precio: 45, imagen: "images/data.jpeg" },
    { id: 10, nombre: "DtMF", precio: 45, imagen: "images/dtmf.jpeg" },
    { id: 11, nombre: "Kanye West- Wonder", precio: 50, imagen: "images/iwonder.jpg" },
    { id: 12, nombre: "KiZZ", precio: 50, imagen: "images/kiss.jpg" },
    { id: 13, nombre: "Mosca TseTse", precio: 40, imagen: "images/lamosca.jpeg" },
    { id: 14, nombre: "MacDeMarco", precio: 45, imagen: "images/macdemarco.jpg" },
    { id: 15, nombre: "No other Hearth", precio: 45, imagen: "images/macdemarco2.jpg" },
    { id: 16, nombre: "MF-DooM", precio: 50, imagen: "images/mfdoom.jpg" },
    { id: 17, nombre: "Rey del Pop", precio: 55, imagen: "images/micheljackson.jpg" },
    { id: 18, nombre: "NirvanA", precio: 50, imagen: "images/nirvana.jpg" },
    { id: 19, nombre: "Biggie-Smalls", precio: 50, imagen: "images/notoriusbig.jpg" },
    { id: 20, nombre: "N-W-A", precio: 50, imagen: "images/nwa.jpg" },
    { id: 21, nombre: "SODA/STEREO", precio: 50, imagen: "images/sodastereo.jpeg" },
    { id: 22, nombre: "CUéNTAMe", precio: 45, imagen: "images/pedrosuarezvertiz.jpeg" },
    { id: 23, nombre: "QUEVEDO", precio: 45, imagen: "images/quevedo.jpeg" },
    { id: 24, nombre: "RomeoSantos", precio: 40, imagen: "images/romeosantos.jpeg" },
    { id: 25, nombre: "Me verás volver", precio: 50, imagen: "images/SodaStereob.jpeg" }
];

// 2. Estado del carrito
let carrito = [];

// 3. Referencias del DOM
const carritoElementos = document.getElementById("carrito-elementos");
const carritoTotal = document.getElementById("carrito-total");
const btnVaciar = document.getElementById("btn-vaciar");

// 4. Agregar cuadro al carrito
function agregarAlCarrito(idProducto) {
    const itemEnCarrito = carrito.find(item => item.id === idProducto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        const productoOriginal = productos.find(p => p.id === idProducto);
        carrito.push({
            ...productoOriginal,
            cantidad: 1
        });
    }
    actualizarInterfazCarrito();
}

// 5. Cambiar cantidad (+1 / -1)
function cambiarCantidad(idProducto, cambio) {
    const producto = carrito.find(item => item.id === idProducto);
    
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(idProducto);
            return;
        }
    }
    actualizarInterfazCarrito();
}

// 6. Eliminar cuadro del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarInterfazCarrito();
}

// 7. Vaciar carrito
btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarInterfazCarrito();
});

// 8. Renderizar el carrito con imagen miniatura
function actualizarInterfazCarrito() {
    carritoElementos.innerHTML = "";

    if (carrito.length === 0) {
        carritoElementos.innerHTML = "<p style='text-align:center; color:#555; font-size:12px; padding:10px 0;'>El carrito está vacío</p>";
        carritoTotal.innerText = "0.00";
        return;
    }

    let cuentaTotal = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        cuentaTotal += subtotal;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-carrito");

        itemDiv.innerHTML = `
            <img class="img-carrito" src="${item.imagen}" alt="${item.nombre}">
            <div class="item-detalles">
                <h4>${item.nombre}</h4>
                <p>S/. ${item.precio.toFixed(2)} c/u</p>
            </div>
            <div class="item-acciones">
                <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">×</button>
            </div>
        `;

        carritoElementos.appendChild(itemDiv);
    });

    carritoTotal.innerText = cuentaTotal.toFixed(2);
}

// Carga inicial
actualizarInterfazCarrito();