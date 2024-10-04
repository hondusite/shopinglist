const formularioProducto = document.getElementById('formulario-producto');
const nuevoProducto = document.getElementById('nuevo-producto');
const cantidadProducto = document.getElementById('cantidad-producto');
const listaProductos = document.getElementById('lista-productos');

let productos = JSON.parse(localStorage.getItem('productos')) || [];

function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function renderizarProductos() {
    listaProductos.innerHTML = '';
    productos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.className = `producto ${producto.comprado ? 'comprado' : ''}`;
        li.innerHTML = `
            <span class="nombre-producto">${producto.nombre}</span>
            <span class="cantidad-producto">x${producto.cantidad}</span>
            <div class="acciones">
                <button onclick="toggleComprado(${index})" title="${producto.comprado ? 'Desmarcar' : 'Marcar'} como comprado">
                    <i class="fas ${producto.comprado ? 'fa-square' : 'fa-check-square'}"></i>
                </button>
                <button onclick="eliminarProducto(${index})" class="eliminar" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        listaProductos.appendChild(li);
    });
}

function agregarProducto(nombre, cantidad) {
    productos.push({ nombre, cantidad: parseFloat(cantidad), comprado: false });
    guardarProductos();
    renderizarProductos();
}

function toggleComprado(index) {
    productos[index].comprado = !productos[index].comprado;
    guardarProductos();
    renderizarProductos();
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    guardarProductos();
    renderizarProductos();
}

formularioProducto.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = nuevoProducto.value.trim();
    const cantidad = cantidadProducto.value;
    if (nombre && cantidad) {
        agregarProducto(nombre, cantidad);
        nuevoProducto.value = '';
        cantidadProducto.value = '1';
    }
});

// Inicializar la aplicación
renderizarProductos();