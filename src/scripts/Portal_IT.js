document.addEventListener("DOMContentLoaded", () => {

  
    const tabla = document.getElementById("tablaProyectos");
    const buscador = document.getElementById("buscador");
    const btnCrear = document.querySelector(".btn-primario");

  
    let proyectos = [];

   
    const mostrarMensaje = (mensaje, tipo = "ok") => {
        const div = document.createElement("div");
        div.textContent = mensaje;

        div.style.position = "fixed";
        div.style.bottom = "20px";
        div.style.right = "20px";
        div.style.padding = "10px 15px";
        div.style.borderRadius = "8px";
        div.style.color = "#fff";
        div.style.fontWeight = "600";
        div.style.zIndex = "999";

        div.style.backgroundColor = tipo === "error" ? "#dc2626" : "#16a34a";

        document.body.appendChild(div);

        setTimeout(() => div.remove(), 2500);
    };

    const validarProyecto = (nombre, presupuesto) => {
        if (!nombre || nombre.trim().length < 3) {
            mostrarMensaje("Nombre inválido (mínimo 3 caracteres)", "error");
            return false;
        }

        if (!/^\d+$/.test(presupuesto)) {
            mostrarMensaje("El presupuesto debe ser numérico", "error");
            return false;
        }

        return true;
    };

    const renderProyectos = () => {
        tabla.innerHTML = "";

        proyectos.forEach((proyecto, index) => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td><strong>${proyecto.nombre}</strong></td>
                <td>$${parseInt(proyecto.presupuesto).toLocaleString()}</td>
                <td><span class="insignia-estado ${proyecto.estado}">${proyecto.estado}</span></td>
                <td class="acciones">
                    <button class="btn-icono ver" data-id="${index}"><i class="fas fa-eye"></i></button>
                    <button class="btn-icono editar" data-id="${index}"><i class="fas fa-edit"></i></button>
                    <button class="btn-icono eliminar" data-id="${index}"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;

            tabla.appendChild(fila);
        });

        actualizarEstadisticas();
    };

   
    const crearProyecto = () => {
        const nombre = prompt("Nombre del proyecto:");
        const presupuesto = prompt("Presupuesto:");

        if (!validarProyecto(nombre, presupuesto)) return;

        proyectos.push({
            nombre,
            presupuesto,
            estado: "activo"
        });

        renderProyectos();
        mostrarMensaje("Proyecto creado");
    };

    const eliminarProyecto = (id) => {
        proyectos.splice(id, 1);
        renderProyectos();
        mostrarMensaje("Proyecto eliminado");
    };

    const editarProyecto = (id) => {
        const nuevo = prompt("Nuevo nombre:", proyectos[id].nombre);

        if (!nuevo || nuevo.trim().length < 3) {
            mostrarMensaje("Nombre inválido", "error");
            return;
        }

        proyectos[id].nombre = nuevo;
        renderProyectos();

        mostrarMensaje("Proyecto actualizado");
    };

    const verProyecto = (id) => {
        mostrarMensaje(`Proyecto: ${proyectos[id].nombre}`);
    };

   
    const filtrar = () => {
        const texto = buscador.value.toLowerCase();

        const filas = tabla.querySelectorAll("tr");

        filas.forEach(fila => {
            const nombre = fila.children[0].innerText.toLowerCase();
            fila.style.display = nombre.includes(texto) ? "" : "none";
        });
    };

   
    const actualizarEstadisticas = () => {
        const total = proyectos.length;
        document.querySelector(".valor-estadistica").innerText = total;
    };


    btnCrear.addEventListener("click", (e) => {
        e.preventDefault();
        crearProyecto();
    });

    buscador.addEventListener("input", filtrar);

    tabla.addEventListener("click", (e) => {

        const id = e.target.closest("button")?.dataset.id;
        if (id === undefined) return;

        if (e.target.closest(".eliminar")) eliminarProyecto(id);
        if (e.target.closest(".editar")) editarProyecto(id);
        if (e.target.closest(".ver")) verProyecto(id);

    });

  
    const inicializar = () => {
        proyectos = [
            { nombre: "GlaxoSmithKline", presupuesto: 125000, estado: "activo" },
            { nombre: "G&E", presupuesto: 89500, estado: "activo" },
            { nombre: "CCSS", presupuesto: 215000, estado: "pausado" },
            { nombre: "IKEA", presupuesto: 340000, estado: "activo" },
            { nombre: "Microsoft", presupuesto: 67800, estado: "completado" },
            { nombre: "Crunchyroll", presupuesto: 95000, estado: "activo" }
        ];

        renderProyectos();
    };

    inicializar();

});
