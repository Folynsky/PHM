// Función para cargar las refacciones de la tabla
function cargarRefacciones() {
    axios.get('http://localhost:3001/refacciones')
        .then(response => {
            const data = response.data;
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
        })
        .catch(error => {
            console.error('Error al cargar las refacciones:', error);
        });
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

    axios.put(`http://localhost:3001/refacciones/${id}`, refaccionActualizada)
        .then(() => {
            alert('Refacción actualizada correctamente.');
            cargarRefacciones();
            document.getElementById('edit-modal').style.display = 'none';
        })
        .catch(error => {
            console.error('Error al actualizar la refacción:', error);
        });
});

// Función para eliminar una refacción
function eliminarRefaccion(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta refacción?')) {
        axios.delete(`http://localhost:3001/refacciones/${id}`)
            .then(() => {
                alert('Refacción eliminada correctamente.');
                cargarRefacciones();
            })
            .catch(error => {
                console.error('Error al eliminar la refacción:', error);
            });
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

    axios.post('http://localhost:3001/refacciones', nuevaRefaccion)
        .then(() => {
            alert('Refacción agregada correctamente.');
            document.getElementById('refaccion-form').reset();
            cargarRefacciones();
        })
        .catch(error => {
            console.error('Error al agregar la refacción:', error);
        });
});

// Cargar las refacciones al cargar la página
cargarRefacciones();
