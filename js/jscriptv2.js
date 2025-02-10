$(document).ready(function () {
    cargarRefacciones();

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
            categoria: $('#categoria').val(),
            precio: $('#precio').val(),
        };

        if (id) {
            // Si hay un ID, actualizar refacción
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
            // Si no hay ID, agregar nueva refacción
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

            data.forEach((refaccion) => {
                tbody.append(`
                    <tr>
                        <td>${refaccion.nombre}</td>
                        <td>${refaccion.categoria}</td>
                        <td>${refaccion.precio}</td>
                        <td>
                            <button onclick="abrirVentanaEditar('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">
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

function abrirVentanaEditar(id, nombre, categoria, precio) {
    $('#form-title').text('Editar Refacción');
    $('#refaccion-id').val(id);
    $('#nombre').val(nombre);
    $('#categoria').val(categoria);
    $('#precio').val(precio);
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

$(document).ready(function () {
    verificarSesion();

    // Manejo del formulario de login
    $('#login-form').submit(function (event) {
        event.preventDefault();

        const usuario = $('#username').val();
        const password = $('#password').val();

        // Simulación de credenciales (puedes cambiar esto a una API real)
        if (usuario === "admin" && password === "1234") {
            localStorage.setItem("usuario", usuario); // Guardar sesión
            $.mobile.changePage('#home'); // Redirigir a la pantalla principal
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });

    // Cerrar sesión
    $('#logout').click(function () {
        localStorage.removeItem("usuario"); // Eliminar sesión
        $.mobile.changePage('#login'); // Redirigir a login
    });

    // Función para verificar si el usuario está autenticado
    function verificarSesion() {
        if (!localStorage.getItem("usuario")) {
            $.mobile.changePage('#login'); // Redirigir al login si no hay sesión
        }
    }

});

