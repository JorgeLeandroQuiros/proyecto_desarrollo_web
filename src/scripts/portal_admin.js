document.addEventListener("DOMContentLoaded", () => {
    let dias = document.querySelectorAll(".dia");
    let btnBloquear = document.querySelector(".btn-bloquear");
    let btnFeriado = document.querySelector(".btn-feriado");
    let btnHabilitar = document.querySelector(".btn-habilitar");

    dias.forEach(day => {
        day.addEventListener("click", () => {
            day.classList.toggle("seleccionado");
        });
    });

    let actualizarStatus = (claseStatus) => {
        let seleccionados = document.querySelectorAll(".dia.seleccionado");

        if (seleccionados.length === 0) {
            alert("Por favor, seleccione al menos un día");
            return;
        }

        seleccionados.forEach(day => {
            day.classList.remove("bloqueado", "feriado");

            if (claseStatus) {
                day.classList.add(claseStatus);
            }

            day.classList.remove("seleccionado");
        });
    };

    btnBloquear.addEventListener("click", () => actualizarStatus("bloqueado"));
    btnFeriado.addEventListener("click", () => actualizarStatus("feriado"));
    btnHabilitar.addEventListener("click", () => actualizarStatus(null));

let solicitudesVacaciones = [
        { id: 1, nombre: "John Smith", inicioVacaciones: "10-03-2026", finalVacaciones: "17-03-2026", diasDisponibles: 15, diasSolicitados: 5 },
        { id: 2, nombre: "Emily Smith", inicioVacaciones: "05-04-2026", finalVacaciones: "12-04-2026", diasDisponibles: 12, diasSolicitados: 5 },
        { id: 3, nombre: "Katalina Velarde", inicioVacaciones: "14-01-2027", finalVacaciones: "21-01-2027", diasDisponibles: 9, diasSolicitados: 6 },
        { id: 4, nombre: "Shamel Shukoor", inicioVacaciones: "15-06-2026", finalVacaciones: "30-06-2026", diasDisponibles: 20, diasSolicitados: 11 },
        { id: 5, nombre: "Michael Salgado", inicioVacaciones: "20-02-2026", finalVacaciones: "27-02-2026", diasDisponibles: 7, diasSolicitados: 5 },
        { id: 6, nombre: "Andrea Hernández", inicioVacaciones: "01-05-2026", finalVacaciones: "10-05-2026", diasDisponibles: 14, diasSolicitados: 7 },
        { id: 7, nombre: "Mariana Chacón", inicioVacaciones: "15-03-2026", finalVacaciones: "20-03-2026", diasDisponibles: 10, diasSolicitados: 5 },
        { id: 8, nombre: "Sofía Astorga", inicioVacaciones: "10-02-2026", finalVacaciones: "15-02-2026", diasDisponibles: 8, diasSolicitados: 5 },
        { id: 9, nombre: "Adrián Mora", inicioVacaciones: "01-04-2026", finalVacaciones: "08-04-2026", diasDisponibles: 11, diasSolicitados: 6 }
    ];

    let modal = document.querySelector(".modal-overlay");
    let btnCerrar = document.querySelector(".cerrar-pantalla-aprobacion");
    let btnAprobar = document.querySelector(".btn-admin-vacaciones .btn-feriado");
    let btnDenegar = document.querySelector(".btn-admin-vacaciones .btn-bloquear");
    let contenedorAprobadas = document.querySelector(".content > div:nth-child(1) > .carta:last-of-type");
    let linkVerTodas = document.querySelector(".solicitudes-admin")?.parentElement;

    let modalNombre = document.querySelector(".usuario-nombre");
    let modalInicio = document.querySelector(".info-usuario-caja p:nth-of-type(1)");
    let modalFinal = document.querySelector(".info-usuario-caja p:nth-of-type(2)");
    let modalDisponibles = document.querySelector(".info-usuario-caja p:nth-of-type(3)");
    let modalConteo = document.querySelector(".conteo-dias");
    let contenedorCalendario = document.querySelector(".calendario-columna .tabla-calendario");
    let tituloCalendario = document.querySelector(".calendario-columna .mes-calendario span");

    let solicitudActualId = null;

    let actualizarContadorPendientes = () => {
        let listaPendientes = document.querySelector(".cartas-solictudes .carta:nth-child(2)");
        let cantidad = listaPendientes.querySelectorAll(".elemento-carta").length;
        let titulo = document.querySelector(".cartas-solictudes .carta:nth-child(2) h3");
        if (titulo) titulo.textContent = `Solicitudes Pendientes (${cantidad})`;
    };

    let generarCalendarioModal = (fechaInicioStr, fechaFinalStr) => {
        let diasSemana = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        contenedorCalendario.innerHTML = diasSemana.map(d => `<div class="nombre-dia">${d}</div>`).join('');

        let [diaI, mesI, anioI] = fechaInicioStr.split('-').map(Number);
        let [diaF, mesF, anioF] = fechaFinalStr.split('-').map(Number);
        
        let fechaObjeto = new Date(anioI, mesI - 1, 1);
        tituloCalendario.textContent = fechaObjeto.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

        let primerDiaSemana = new Date(anioI, mesI - 1, 1).getDay();
        let ajusteDia = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;
        let ultimoDiaMes = new Date(anioI, mesI, 0).getDate();

        for (let i = 0; i < ajusteDia; i++) {
            let vacio = document.createElement("div");
            vacio.className = "dia";
            contenedorCalendario.appendChild(vacio);
        }

        for (let i = 1; i <= ultimoDiaMes; i++) {
            let diaDiv = document.createElement("div");
            diaDiv.className = "dia";
            diaDiv.textContent = i;
            let fechaActual = new Date(anioI, mesI - 1, i);
            let esFinDeSemana = (fechaActual.getDay() === 0 || fechaActual.getDay() === 6);

            if (i >= diaI && i <= diaF && !esFinDeSemana) {
                diaDiv.classList.add("bloqueado");
            }
            contenedorCalendario.appendChild(diaDiv);
        }
    };

    let abrirModalSolicitud = (e) => {
        e.preventDefault();
        let link = e.currentTarget;
        let idSolicitud = parseInt(link.id.replace("solicitud-", ""));
        let datos = solicitudesVacaciones.find(s => s.id === idSolicitud);

        if (datos) {
            solicitudActualId = idSolicitud;
            modalNombre.textContent = datos.nombre;
            modalInicio.textContent = `Fecha de Inicio: ${datos.inicioVacaciones}`;
            modalFinal.textContent = `Fecha Final: ${datos.finalVacaciones}`;
            modalDisponibles.textContent = `Días disponibles: ${datos.diasDisponibles}`;
            modalConteo.textContent = `${datos.diasSolicitados} días solicitados`;

            generarCalendarioModal(datos.inicioVacaciones, datos.finalVacaciones);
            modal.style.display = "block";
        }
    };

    document.querySelectorAll(".pantalla-solicitud").forEach(link => {
        link.addEventListener("click", abrirModalSolicitud);
    });

    btnAprobar.addEventListener("click", () => {
        if (!solicitudActualId) return;
        let fila = document.getElementById(`fila-solicitud-${solicitudActualId}`);
        
        if (fila) {
            let link = fila.querySelector(".pantalla-solicitud");
            if (link) link.textContent = "Actualizar";

            if (fila.parentElement.closest('.cartas-solictudes')) {
                if (linkVerTodas) {
                    contenedorAprobadas.insertBefore(fila, linkVerTodas);
                } else {
                    contenedorAprobadas.appendChild(fila);
                }
                actualizarContadorPendientes();
            }
        }
        cerrarModal();
    });

    btnDenegar.addEventListener("click", () => {
        if (!solicitudActualId) return;
        let fila = document.getElementById(`fila-solicitud-${solicitudActualId}`);
        if (fila) {
            let eraPendiente = fila.parentElement.closest('.cartas-solictudes');
            fila.remove();
            if (eraPendiente) actualizarContadorPendientes();
        }
        cerrarModal();
    });

    let cerrarModal = () => {
        modal.style.display = "none";
        solicitudActualId = null;
    };

    if (btnCerrar) btnCerrar.addEventListener("click", cerrarModal);
});
