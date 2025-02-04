// Función cargar las refacciones de la tabla
function cargarRefacciones() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3001/refacciones', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const tbody = document.getElementById('refacciones-tbody');
            tbody.innerHTML = '';
            data.forEach(refaccion => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${refaccion.nombre}</td>
                    <td>${refaccion.categoria}</td>
                    <td>${refaccion.precio}</td>
                    <td>
                        <button onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">
                            Editar
                        </button>
                        <button onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Error al cargar las refacciones:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error de red al intentar cargar las refacciones.');
    };

    xhr.send();
}

// Función para mostrar el modal con los datos de una refacción
function mostrarModal(id, nombre, categoria, precio) {
    const modal = document.getElementById('edit-modal');
    document.getElementById('edit-nombre').value = nombre;
    document.getElementById('edit-categoria').value = categoria;
    document.getElementById('edit-precio').value = precio;
    modal.setAttribute('data-id', id);
    modal.style.display = 'block';
}

// Función para cerrar el modal
document.getElementById('close-modal').addEventListener('click', function() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
});

// Función para guardar cambios en una refacción
document.getElementById('edit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('edit-modal').getAttribute('data-id');
    const nombre = document.getElementById('edit-nombre').value;
    const categoria = document.getElementById('edit-categoria').value;
    const precio = document.getElementById('edit-precio').value;

    const refaccionActualizada = {
        nombre,
        categoria,
        precio
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:3001/refacciones/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Refacción actualizada correctamente.');
            cargarRefacciones();
            document.getElementById('edit-modal').style.display = 'none';
        } else {
            console.error('Error al actualizar la refacción:', xhr.statusText);
        }
    };

    xhr.send(JSON.stringify(refaccionActualizada));
});

// Función para eliminar una refacción
function eliminarRefaccion(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta refacción?')) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:3001/refacciones/${id}`, true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                alert('Refacción eliminada correctamente.');
                cargarRefacciones();
            } else {
                console.error('Error al eliminar la refacción:', xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error('Error de red al intentar eliminar la refacción.');
        };

        xhr.send();
    }
}

// Función para agregar una nueva refacción
document.getElementById('refaccion-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    const nuevaRefaccion = {
        nombre,
        categoria,
        precio
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/refacciones', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 201) {
            alert('Refacción agregada correctamente.');
            document.getElementById('refaccion-form').reset();
            cargarRefacciones();
        } else {
            console.error('Error al agregar la refacción:', xhr.statusText);
        }
    };

    xhr.send(JSON.stringify(nuevaRefaccion));
});

// Cargar las refacciones al cargar la página
cargarRefacciones();
