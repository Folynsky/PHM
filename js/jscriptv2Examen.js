$(document).ready(function () {
    cargarRefacciones();
    cargarCategorias();

    $('#abrir-agregar').click(function () {
        $('#form-title').text('Agregar Refacción');
        $('#refaccion-form')[0].reset();
        $('#refaccion-id').val('');
        $.mobile.changePage('#formulario');
    });

    $('#cancelar').click(function () {
        $.mobile.changePage('#home');
    });

    $('#refaccion-form').submit(function (event) {
        event.preventDefault();

        const id = $('#refaccion-id').val();
        const refaccion = {
            nombre: $('#nombre').val(),
            categoria_id: $('#categoria').val(),
            precio: $('#precio').val(),
            stock: $('#stock').val(),
            disponible: $('#disponible').is(':checked')
        };

        if (id) {
            $.ajax({
                url: `https://refacciones-6p2k.onrender.com/refacciones/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(refaccion),
                success: function () {
                    alert("Refacción actualizada correctamente.");
                    cargarRefacciones();
                    $.mobile.changePage('#home');
                },
                error: function (err) {
                    console.error("Error al actualizar la refacción.", err);
                },
            });
        } else {
            $.ajax({
                url: "https://refacciones-6p2k.onrender.com/refacciones",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(refaccion),
                success: function () {
                    alert("Refacción agregada correctamente.");
                    cargarRefacciones();
                    $.mobile.changePage('#home');
                },
                error: function (err) {
                    console.error("Error al agregar la refacción.", err);
                },
            });
        }
    });
});

function cargarRefacciones() {
    $.ajax({
        url: "https://refacciones-6p2k.onrender.com/refacciones",
        method: "GET",
        success: function (data) {
            const tbody = $("#refacciones-tbody");
            tbody.empty();

            $.ajax({
                url: "https://refacciones-6p2k.onrender.com/categorias",
                method: "GET",
                success: function (categorias) {
                    const categoriasMap = {};
                    categorias.forEach(categoria => {
                        categoriasMap[categoria.id] = categoria.nombre;
                    });

                    data.forEach((refaccion) => {
                        tbody.append(`
                            <tr>
                                <td>${refaccion.nombre}</td>
                                <td>${categoriasMap[refaccion.categoria_id] || 'Desconocida'}</td>
                                <td>${refaccion.precio}</td>
                                <td>${refaccion.stock}</td>
                                <td>${refaccion.stock > 0 ? 'Disponible' : 'Agotado'}</td>
                                <td>${refaccion.stock >= 5 ? 'Sin alertas' : 'Stock bajo'}</td>


                                <td>
                                    <button onclick="abrirVentanaEditar('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria_id}', '${refaccion.precio}', '${refaccion.stock}', '${refaccion.disponible}')">
                                        Editar
                                    </button>
                                    <button onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</button>
                                </td>
                            </tr>
                        `);
                    });
                },
                error: function () {
                    console.error("Error al obtener las categorías.");
                },
            });
        },
        error: function () {
            console.error("Error al cargar las refacciones.");
        },
    });
}

function cargarCategorias() {
    $.ajax({
        url: "https://refacciones-6p2k.onrender.com/categorias",
        method: "GET",
        success: function (categorias) {
            const categoriaSelect = $("#categoria");
            categoriaSelect.empty();
            categoriaSelect.append('<option value="">Selecciona una categoría</option>');
            categorias.forEach(categoria => {
                categoriaSelect.append(`<option value="${categoria.id}">${categoria.nombre}</option>`);
            });
        },
        error: function () {
            console.error("Error al cargar las categorías.");
        },
    });
}

function abrirVentanaEditar(id, nombre, categoria_id, precio, stock, disponible) {
    $('#form-title').text('Editar Refacción');
    $('#refaccion-id').val(id);
    $('#nombre').val(nombre);
    $('#categoria').val(categoria_id);
    $('#precio').val(precio);
    $('#stock').val(stock);
    $('#disponible').prop('checked', disponible === 'true');
    $.mobile.changePage('#formulario');
}

function eliminarRefaccion(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta refacción?")) {
        $.ajax({
            url: `https://refacciones-6p2k.onrender.com/refacciones/${id}`,
            method: "DELETE",
            success: function () {
                alert("Refacción eliminada correctamente.");
                cargarRefacciones();
            },
            error: function () {
                console.error("Error al eliminar la refacción.");
            },
        });
    }
}
