// ╔══════════════════════════════════════════════════════════════╗
//  funcionalidades.js
//  Contiene las 3 funcionalidades del portal de usuario
//  1. Calendario interactivo con selección de rango
//  2. Agregar filas al reporte diario
//  4. Contador de días restantes en tiempo real
// ╚══════════════════════════════════════════════════════════════╝


// ──────────────────────────────────────────────────────────────
//  VARIABLES COMPARTIDAS entre las 3 funcionalidades
// ──────────────────────────────────────────────────────────────

// Días que el empleado NO puede seleccionar porque son feriados
const feriados = new Set([25, 31]);

// Días que están bloqueados por la empresa (no disponibles)
const bloqueados = new Set([16, 17, 18, 19, 20]);

// Cuántos días de vacaciones ya pidió antes
const diasYaSolicitados = 6;

// Cuántos días tiene disponibles ahora mismo
let diasDisponibles = 9;

// Aquí guardamos el primer día que clickeó el usuario
let inicio = null;

// Aquí guardamos el segundo día que clickeó el usuario
let fin = null;

// Buscar todos los elementos con clase "dia" dentro del calendario
const dias = document.querySelectorAll('.tabla-calendario .dia');

// Buscar el texto de ayuda debajo del calendario
const tooltip = document.getElementById('cal-tooltip');

// Buscar el círculo que muestra días restantes
const circulo = document.getElementById('circulo-dias');

// Buscar el texto "(X días solicitados)"
const textoSol = document.getElementById('texto-solicitados');


// ──────────────────────────────────────────────────────────────
//  FUNCIÓN: contarDiasHabiles
//  Recibe dos números (desde y hasta) y cuenta cuántos días
//  entre ellos NO son feriados ni bloqueados
// ──────────────────────────────────────────────────────────────
function contarDiasHabiles(desde, hasta) {
    let count = 0;
    for (let d = desde; d <= hasta; d++) {
        // Solo sumar si el día no está en la lista de feriados ni bloqueados
        if (!feriados.has(d) && !bloqueados.has(d)) {
            count++;
        }
    }
    return count;
}


// ──────────────────────────────────────────────────────────────
//  FUNCIÓN: pintarRango
//  Recorre todos los días y les pone el color correcto
//  según si están dentro del rango seleccionado o no
// ──────────────────────────────────────────────────────────────
function pintarRango(desdeTemp, hastaTemp) {
    // Si no hay inicio definido todavía, usar los valores guardados
    const desde = desdeTemp ?? (inicio && fin ? Math.min(inicio, fin) : inicio);
    const hasta = hastaTemp ?? (inicio && fin ? Math.max(inicio, fin) : inicio);

    dias.forEach(function (el) {
        const n = parseInt(el.dataset.dia); // Número del día (ej: 5, 12, 25)

        // Quitar todos los colores anteriores
        el.classList.remove('seleccionado', 'inicio-rango', 'fin-rango', 'en-rango');

        // Si no hay inicio, no pintar nada
        if (!desde) return;

        // Día único seleccionado (inicio y fin son el mismo)
        if (n === desde && n === hasta) {
            el.classList.add('seleccionado');
        }
        // Primer día del rango
        else if (n === desde) {
            el.classList.add('inicio-rango');
        }
        // Último día del rango
        else if (n === hasta) {
            el.classList.add('fin-rango');
        }
        // Días del medio del rango
        else if (n > desde && n < hasta) {
            el.classList.add('en-rango');
        }
    });
}


// ──────────────────────────────────────────────────────────────
//  FUNCIÓN: actualizarContador
//  Recibe cuántos días seleccionó el usuario y actualiza
//  el círculo y el texto de días disponibles
// ──────────────────────────────────────────────────────────────
function actualizarContador(diasSeleccionados) {
    const restantes = diasDisponibles - diasSeleccionados;
    const totalSolicitados = diasYaSolicitados + diasSeleccionados;

    // Actualizar el número dentro del círculo
    circulo.textContent = Math.max(restantes, 0);

    // Actualizar el texto de días solicitados
    textoSol.textContent = '(' + totalSolicitados + ' días solicitados)';

    // Animación: el círculo "late" (crece y vuelve a su tamaño)
    circulo.classList.remove('pulse', 'sin-dias');
    void circulo.offsetWidth; // Este truco reinicia la animación CSS
    circulo.classList.add('pulse');
    setTimeout(function () { circulo.classList.remove('pulse'); }, 300);

    // Si no quedan días, ponerlo rojo
    if (restantes <= 0) {
        circulo.classList.add('sin-dias');
    }
}


// ══════════════════════════════════════════════════════════════
//  FUNCIONALIDAD 1: Calendario interactivo
//  El usuario hace clic en dos días para marcar un rango
// ══════════════════════════════════════════════════════════════

dias.forEach(function (el) {

    // ── Evento: cuando el usuario HACE CLIC en un día ──
    el.addEventListener('click', function () {
        const n = parseInt(el.dataset.dia); // Número del día clickeado

        // Si el día está bloqueado, ignorar el clic
        if (bloqueados.has(n)) return;

        // CASO 1: No hay inicio todavía, O ya hay rango completo → reiniciar
        if (!inicio || (inicio && fin)) {
            inicio = n;
            fin = null;
            tooltip.textContent = 'Inicio: ' + n + ' Dic — Ahora selecciona el día final';
            actualizarContador(0); // Resetear contador
        }
        // CASO 2: Ya hay inicio, entonces este clic es el fin del rango
        else {
            fin = n;
            const desde = Math.min(inicio, fin);
            const hasta = Math.max(inicio, fin);
            const habiles = contarDiasHabiles(desde, hasta);

            // Verificar que no se pidan más días de los disponibles
            if (habiles > diasDisponibles) {
                tooltip.textContent = '⚠️ No tienes suficientes días (' + habiles + ' seleccionados, ' + diasDisponibles + ' disponibles)';
                fin = null; // Cancelar la selección del fin
                return;
            }

            tooltip.textContent = '✅ Rango: ' + desde + '–' + hasta + ' Dic · ' + habiles + ' día(s) hábil(es)';
            actualizarContador(habiles); // Actualizar el contador con los días elegidos
        }

        pintarRango(); // Colorear el calendario
    });

    // ── Evento: cuando el cursor PASA POR ENCIMA de un día ──
    // Esto muestra una previsualización del rango antes de confirmar
    el.addEventListener('mouseenter', function () {
        // Solo funciona si ya hay un inicio pero aún no hay fin
        if (!inicio || fin) return;

        const n = parseInt(el.dataset.dia);
        const desde = Math.min(inicio, n);
        const hasta = Math.max(inicio, n);

        // Mostrar cuántos días hábiles habría
        tooltip.textContent = desde + '–' + hasta + ' Dic · ' + contarDiasHabiles(desde, hasta) + ' día(s) hábil(es)';

        // Pintar el rango en tiempo real (previsualización)
        pintarRango(desde, hasta);
    });
});

// Cuando el cursor SALE del calendario → volver a mostrar el estado real
document.getElementById('tabla-calendario').addEventListener('mouseleave', function () {
    if (inicio && !fin) {
        tooltip.textContent = 'Inicio: ' + inicio + ' Dic — Ahora selecciona el día final';
        pintarRango(); // Volver a pintar solo el inicio
    }
});

// Botón "Enviar Solicitud" del calendario
document.getElementById('btn-enviar-vacaciones').addEventListener('click', function () {
    if (!inicio || !fin) {
        alert('Selecciona un rango de fechas primero');
        return;
    }

    const desde = Math.min(inicio, fin);
    const hasta = Math.max(inicio, fin);
    const habiles = contarDiasHabiles(desde, hasta);

    alert('✅ Solicitud enviada: ' + desde + '–' + hasta + ' Dic (' + habiles + ' días hábiles)');

    // Descontar los días usados del total disponible
    diasDisponibles -= habiles;

    // Resetear todo
    inicio = null;
    fin = null;
    tooltip.textContent = 'Selecciona el primer día de tus vacaciones';
    pintarRango();
    actualizarContador(0);
});



const btnAgregar = document.getElementById('btn-agregar-reporte');
const filaAgregar = document.getElementById('fila-agregar');
const tbody = document.getElementById('tbody-reporte');

btnAgregar.addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el enlace navegue a otra página

    // Si el formulario ya está abierto, no abrir otro
    if (document.getElementById('fila-formulario')) return;

    // Crear una nueva fila de tabla vacía
    const filaForm = document.createElement('tr');
    filaForm.id = 'fila-formulario';
    filaForm.className = 'fila-formulario';

    // Rellenar la fila con campos de formulario
    filaForm.innerHTML =
        '<td><input type="text" id="inp-proyecto" placeholder="Proyecto" maxlength="30"></td>' +
        '<td>' +
        '<select id="inp-actividad">' +
        '<option value="">Actividad</option>' +
        '<option value="BA">BA</option>' +
        '<option value="Dev">Dev</option>' +
        '<option value="QA">QA</option>' +
        '<option value="Diseño">Diseño</option>' +
        '<option value="PM">PM</option>' +
        '</select>' +
        '</td>' +
        '<td><input type="number" id="inp-horas" placeholder="Horas" min="1" max="24" style="width:60px"></td>' +
        '<td>' +
        '<button class="btn-guardar" id="btn-guardar-fila">Guardar</button>' +
        '<button class="btn-cancelar" id="btn-cancelar-fila">✕</button>' +
        '</td>';

    // Insertar la fila del formulario ANTES de la fila de "Agregar Reporte"
    tbody.insertBefore(filaForm, filaAgregar);

    // Poner el cursor automáticamente en el campo de Proyecto
    document.getElementById('inp-proyecto').focus();

    // ── Botón GUARDAR ──
    document.getElementById('btn-guardar-fila').addEventListener('click', function () {
        const proyecto = document.getElementById('inp-proyecto').value.trim();
        const actividad = document.getElementById('inp-actividad').value;
        const horas = document.getElementById('inp-horas').value;

        // Validaciones: todos los campos son obligatorios
        if (!proyecto) { alert('El nombre del proyecto es obligatorio'); return; }
        if (!actividad) { alert('Selecciona una actividad'); return; }
        if (!horas || horas < 1) { alert('Ingresa las horas trabajadas'); return; }

        // Crear una fila nueva con los datos ingresados
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML =
            '<td>' + proyecto + '</td>' +
            '<td>' + actividad + '</td>' +
            '<td><span class="hours">' + horas + 'h</span></td>' +
            '<td><span class="status en-proceso">En proceso ⏳</span></td>';

        // Insertar la nueva fila antes del formulario, luego borrar el formulario
        tbody.insertBefore(nuevaFila, filaForm);
        filaForm.remove();
    });

    // ── Botón CANCELAR ──
    document.getElementById('btn-cancelar-fila').addEventListener('click', function () {
        filaForm.remove(); // Simplemente eliminar el formulario
    });

    // ── Atajos de teclado ──
    filaForm.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') document.getElementById('btn-guardar-fila').click();
        if (e.key === 'Escape') filaForm.remove();
    });
});