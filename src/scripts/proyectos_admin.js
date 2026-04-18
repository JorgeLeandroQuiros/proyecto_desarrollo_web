document.addEventListener('DOMContentLoaded', () => {
    let selectProyecto = document.querySelector('.select-proyecto');
    let filasTabla = document.querySelectorAll('.tabla-eficiencia tbody tr');

    let graficoBarras = document.querySelector('.chart-card:nth-child(1) img');
    let graficoPie = document.querySelector('.chart-card:nth-child(2) img');
    let graficoLineas = document.querySelector('.full-width img');

    let datosProyectos = {
        'GlaxoSmithKline': {
            bar: 'BarChart.png', pie: 'gsk_pie.png', line: 'gsk_line.png',
            horas: '168', eficiencia: '93%', personal: '85%'
        },
        'Smith & Nephew': {
            bar: 'S&N_bar.png', pie: 'S&N_pie.png', line: 'S&N_line.png',
            horas: '71', eficiencia: '100%', personal: '92%'
        },
        'PriceWaterhouseCoopers': {
            bar: 'PWC_bar.png', pie: 'PWC_pie.png', line: 'PWC_line.png',
            horas: '189', eficiencia: '94%', personal: '88%'
        },
        'Berkshire Hathaway': {
            bar: 'BH_bar.png', pie: 'BH_pie.png', line: 'BH_line.png',
            horas: '224', eficiencia: '20%', personal: '75%'
        },
        'Alphabet Inc': {
            bar: 'AInc_bar.png', pie: 'AInc_pie.png', line: 'AInc_line.png',
            horas: '156', eficiencia: '35%', personal: '80%'
        },
        'default': {
            bar: 'BarChart.png', pie: 'PieChart.png', line: 'LineChart.png',
            horas: '879', eficiencia: '93%', personal: '90%'
        }
    };

    selectProyecto.addEventListener('change', (e) => {
        let seleccion = e.target.value.trim();

        filasTabla.forEach(fila => {
            let nombreProyectoFila = fila.querySelector('td:first-child').textContent.trim();

            if (seleccion === 'Todos los proyectos' || nombreProyectoFila === seleccion) {
                fila.classList.remove('hidden');
            } else {
                fila.classList.add('hidden');
            }
        });

        let etiquetaProyecto = document.getElementById('etiqueta-proyecto');
        if (seleccion === 'Todos los proyectos') {
            etiquetaProyecto.textContent = 'Todas los proyectos activos';
        } else {
            etiquetaProyecto.textContent = `En este proyecto`;
        }

        let datos = datosProyectos[seleccion] || datosProyectos['default'];

        graficoBarras.src = `../img/${datos.bar}`;
        graficoPie.src = `../img/${datos.pie}`;
        graficoLineas.src = `../img/${datos.line}`;

        let valorHoras = document.querySelector('.kpi-card:nth-child(1) .kpi-valor');
        let valorEficiencia = document.querySelector('.kpi-card:nth-child(2) .kpi-valor');
        let valorPersonal = document.querySelector('.kpi-card:nth-child(3) .kpi-valor');

        valorHoras.textContent = datos.horas;
        valorEficiencia.textContent = datos.eficiencia;
        valorPersonal.textContent = datos.personal;
    });
});