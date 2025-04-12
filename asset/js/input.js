
function guardarProducto(usuario, prenda) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const fechaHora = new Date().toLocaleString();
    
    productos.push({ usuario, prenda, fechaHora });

    localStorage.setItem('productos', JSON.stringify(productos));
    
}

// Función para manejar el envío del formulario
document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
    const usuario = document.getElementById('usuario').value;
    const prenda = document.getElementById('prenda').value;
    
    guardarProducto(usuario, prenda);

    // Limpiar los campos del formulario después de guardar el producto
    document.getElementById('usuario').value = '';
    document.getElementById('prenda').value = '';

      // Mostrar el overlay de "Subasta Publicada"
      document.getElementById('overlay').style.display = 'block';

      // Ocultar el overlay después de 3 segundos
      setTimeout(function() {
          document.getElementById('overlay').style.display = 'none';
      }, 7000); // 3000ms = 3 segundos

});

// Función para exportar la tabla a Excel
document.getElementById('export-btn').addEventListener('click', function() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Crear la tabla HTML
    const table = document.createElement('table');
    table.classList.add('table');
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Prenda</th>
            <th>Fecha y Hora</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    productos.forEach((producto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${producto.usuario}</td>
            <td>${producto.prenda}</td>
            <td>${producto.fechaHora}</td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // Convertir la tabla a libro Excel y descargar
    const wb = XLSX.utils.table_to_book(table, { sheet: "Productos" });
    XLSX.writeFile(wb, "productos.xlsx");
});

// Función para borrar todos los productos del localStorage con confirmación
document.getElementById('clear-btn').addEventListener('click', function() {
    const confirmation = confirm("¿Estás seguro de que quieres borrar todos los productos?");
    if (confirmation) {
        localStorage.removeItem('productos');
        alert("Todos los productos han sido borrados.");
    }
    window.onload = cargarProductos;
});


// Función para cargar los productos desde localStorage y mostrarlos en la tabla
function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const tablaBody = document.getElementById('product-table-body');
    
    // Limpiar la tabla antes de llenarla con nuevos datos
    tablaBody.innerHTML = '';
    // Ordenar productos por fecha y hora (más recientes primero)
    productos.sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));

    // Invertir el orden para mostrar de más antiguo a más reciente
    productos.reverse();

    productos.forEach((producto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${producto.usuario}</td>
            <td>${producto.prenda}</td>
            <td class="fechahora">${producto.fechaHora}</td>
        `;
        tablaBody.appendChild(fila);

        
    });
}
window.onload = cargarProductos;


  // Obtener el botón por su ID
  document.getElementById('reloadButton').addEventListener('click', function() {
    // Recargar la página cuando se hace clic en el botón
    location.reload();
});


