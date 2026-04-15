document.addEventListener("DOMContentLoaded", () => {
    const dias = document.querySelectorAll(".dia");
    const btnBloquear = document.querySelector(".btn-bloquear");
    const btnFeriado = document.querySelector(".btn-feriado");
    const btnHabilitar = document.querySelector(".btn-habilitar");

    dias.forEach(day => {
        day.addEventListener("click", () => {
            day.classList.toggle("seleccionado");
        });
    });

    const actualizarStatus = (claseStatus) => {
        const seleccionados = document.querySelectorAll(".dia.seleccionado");

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

    const modal = document.querySelector(".modal-overlay");
    const btnCerrar = document.querySelector(".cerrar-pantalla-aprobacion");
    const linksRevisar = document.querySelectorAll(".pantalla-solicitud");

    linksRevisar.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            modal.style.display = "block";
            
        });
    });

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
});

