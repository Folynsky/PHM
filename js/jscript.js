$(document).ready(function () {
    cargarRefacciones();

    $("#refaccion-form").on("submit", function (e) {
        e.preventDefault();

        const nuevaRefaccion = {
            nombre: $("#nombre").val(),
            categoria: $("#categoria").val(),
            precio: $("#precio").val(),
        };

        $.ajax({
            url: "http://localhost:3001/refacciones",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(nuevaRefaccion),
            success: function () {
                alert("Refacción agregada correctamente.");
                $("#refaccion-form")[0].reset();
                cargarRefacciones();
            },
            error: function () {
                console.error("Error al agregar la refacción.");
            },
        });
    });

    $("#edit-form").on("submit", function (e) {
        e.preventDefault();

        const id = $("#edit-modal").attr("data-id");
        const refaccionActualizada = {
            nombre: $("#edit-nombre").val(),
            categoria: $("#edit-categoria").val(),
            precio: $("#edit-precio").val(),
        };

        $.ajax({
            url: `http://localhost:3001/refacciones/${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(refaccionActualizada),
            success: function () {
                alert("Refacción actualizada correctamente.");
                cargarRefacciones();
                $("#edit-modal").popup("close");
            },
            error: function (err) {
                console.error("Error al actualizar la refacción.",err);
            },
        });
    });

    $("#close-modal").on("click", function () {
        $("#edit-modal").popup("close");
    });
});

function cargarRefacciones() {
    $.ajax({
        url: "http://localhost:3001/refacciones",
        method: "GET",
        success: function (data) {
            const tbody = $("#refacciones-tbody");
            tbody.empty();

            data.forEach((refaccion) => {
                tbody.append(`
                    <tr>
                        <td>${refaccion.nombre}</td>
                        <td>${refaccion.categoria}</td>
                        <td>${refaccion.precio}</td>
                        <td>
                            <button onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">
                                Editar
                            </button>
                            <button onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function () {
            console.error("Error al cargar las refacciones.");
        },
    });
}

function mostrarModal(id, nombre, categoria, precio) {
    $("#edit-nombre").val(nombre);
    $("#edit-categoria").val(categoria);
    $("#edit-precio").val(precio);
    $("#edit-modal").attr("data-id", id).popup("open");
}

function eliminarRefaccion(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta refacción?")) {
        $.ajax({
            url: `http://localhost:3001/refacciones/${id}`,
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