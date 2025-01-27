class Refaccion {
  constructor(nombre, categoria, precio) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = parseFloat(precio).toFixed(2);
  }
}

class GestorRefacciones {
  constructor() {
    this.refacciones = [];
  }

  agregarRefaccion(refaccion) {
    this.refacciones.push(refaccion);
    this.mostrarRefacciones();
  }

  eliminarRefaccion(index) {
    this.refacciones.splice(index, 1);
    this.mostrarRefacciones();
  }

  editarRefaccion(index, nuevaRefaccion) {
    this.refacciones[index] = nuevaRefaccion;
    this.mostrarRefacciones();
  }

  limpiarLista() {
    this.refacciones = []; // Vacía la lista interna
    this.mostrarRefacciones(); // Actualiza la vista
  }

  mostrarRefacciones() {
    const tbody = document.querySelector('#refacciones-tbody');
    tbody.innerHTML = '';
    this.refacciones.forEach((refaccion, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${refaccion.nombre}</td>
        <td>${refaccion.categoria}</td>
        <td>${refaccion.precio}</td>
        <td class="actions">
          <button onclick="gestor.eliminarRefaccion(${index})">Eliminar</button>
          <button onclick="mostrarEditarModal(${index})">Editar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
}

// Instancia del gestor
const gestor = new GestorRefacciones();

// Manipular el formulario de agregar
document.getElementById('refaccion-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const categoria = document.getElementById('categoria').value;
  const precio = document.getElementById('precio').value;

  const nuevaRefaccion = new Refaccion(nombre, categoria, precio);
  gestor.agregarRefaccion(nuevaRefaccion);

  this.reset();
});

// Modal de edición
const modal = document.getElementById('edit-modal');
const closeModalButton = document.getElementById('close-modal');
let editIndex = null;

// Abrir modal
function mostrarEditarModal(index) {
  editIndex = index;
  const refaccion = gestor.refacciones[index];

  document.getElementById('edit-nombre').value = refaccion.nombre;
  document.getElementById('edit-categoria').value = refaccion.categoria;
  document.getElementById('edit-precio').value = refaccion.precio;

  const modal = document.getElementById('edit-modal');
  modal.style.display = 'flex'; // Mostrar el modal
}

// Cerrar modal
document.getElementById('close-modal').addEventListener('click', () => {
  const modal = document.getElementById('edit-modal');
  modal.style.display = 'none'; // Ocultar el modal
});


closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

document.getElementById('edit-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('edit-nombre').value;
  const categoria = document.getElementById('edit-categoria').value;
  const precio = document.getElementById('edit-precio').value;

  const nuevaRefaccion = new Refaccion(nombre, categoria, precio);
  gestor.editarRefaccion(editIndex, nuevaRefaccion);

  modal.style.display = 'none';
});

// Función para limpiar la lista
document.getElementById('reset-btn').addEventListener('click', () => {
  const confirmacion = confirm('¿Estás seguro de que deseas limpiar la lista?');
  if (confirmacion) {
    gestor.limpiarLista();
    alert('La lista ha sido limpiada.');
  }
});
