# Sistema de Gestión Humana - Proyecto Rikimaka

Repositorio del proyecto para el curso de **Diseño y Programación Web** para el Grupo #3.
Este sistema web busca optimizar la administración de proyectos, la gestión de permisos y el reporte de labores diarias para la organización **Rikimaka**.

---

## Equipo de Trabajo

| Rol | Integrante |
| :--- | :--- |
| **Coordinador** | Santiago Abril Madrigal |
| **Diseñador Web** | Jorge Daniel Leandro Quirós |
| **Desarrollador Web** | Geiner Andrey Esquivel Otárola |

---

## Descripción del Proyecto

La organización **Rikimaka** requiere la implementación de un sistema robusto que permita fortalecer la trazabilidad del trabajo y la planificación estratégica del personal. El objetivo principal es centralizar la operación administrativa, permitiendo un control eficiente sobre el tiempo, presupuestos y carga de trabajo institucional.

---

## Problema a Resolver

El sistema se divide en tres perfiles de usuario clave, cada uno con funcionalidades específicas para garantizar el flujo operativo:

### 1. Administrador de Talento Humano
Responsable de la gestión estratégica y la supervisión del capital humano.
* **Gestión de Tiempos:** Definición de días feriados y períodos de vacaciones permitidos.
* **Control de Solicitudes:** Supervisión y aprobación de periodos de descanso de los trabajadores.
* **Inteligencia de Datos:** Generación y visualización de reportes consolidados, incluyendo:
    * **Análisis de Eficiencia:** Total de horas dedicadas por proyecto vs. presupuesto y recursos asignados.
    * **Balance de Carga:** Distribución de la carga de trabajo entre los trabajadores.
    * **Métricas Operativas:** Productividad y utilización de recursos.

### 2. Trabajador / Colaborador
Usuarios encargados de la ejecución y el registro de datos operativos.
* **Autogestión de Permisos:** Solicitud de vacaciones mediante un calendario interactivo que muestra los días feriados.
* **Reporte Diario de Labores:** Registro detallado de actividades diarias especificando:
    * Proyectos en los que colaboró.
    * Actividades específicas y horas dedicadas a cada una.
    * Estado final de cada tarea (Completada, En proceso, etc.).

### 3. Personal de TI
Responsables del mantenimiento técnico y la estructura de datos del sistema.
* **Catálogo de Proyectos:** Creación y mantenimiento de los proyectos de la organización, asociando metadatos como presupuesto y recursos.
* **Gestión de Asignaciones:** Vinculación de trabajadores a los proyectos creados por el departamento de Recursos Humanos.

---

## Alcance del Proyecto

El proyecto consiste en el diseño y desarrollo de la interfaz web del Sistema de Gestión Humana para la organización Rikimaka, enfocándose principalmente en la experiencia visual y la experiencia del usuario. Esto incluye:

* Diseño de la interfaz gráfica (UI) para los tres perfiles: Administrador de Talento Humano, Trabajador y Personal de TI.
* Diseño del calendario interactivo para la solicitud visual de vacaciones.
* Implementación de formularios visuales para registro de labores, creación de proyectos y gestión de solicitudes.

### Alcance del Primer Entregable
* Incluye los wireframes para cada una de las páginas a ser implementadas. Adicionalmente incluye documentación básica sobre el diseño y el plan del flujo de usuario para las páginas. Los documentos a entregar corresponden a:
    * PDFs con el diseño de la página
    * Markdown con la explicación de las páginas y el flujo a seguir.

### Alcance del Segundo Entregable
* Incluye la implementación en HTML y CSS para cada uno de los wireframes propuestos durante el primer entregable. Adicionalmente incluye una página responsive para diferentes dimensiones de pantalla y dispositivos.
---

## Estrategia para los Branches del Repositorio

Para el manejo del repositorio y de los diferentes elementos se seguirá la siguiente estrategia:
* Todo cambio al README.md o sobre la estructura general de los folders se realizará en master.
* Con respecto a los wireframes, se creará un branch por cada funcionalidad (Con sus respectivos wireframes). En total 3 branches:
    * Administrador
    * Usuario
    * IT
* Para la implementación y creación del HTML, CSS y JS, se creará un branch para cada página
    * Excepciones pueden aplicar en casos de templates o para css. Estos cambios pueden suceder en master con el fin de que se puedan utilizar en múltiples branches.

![Logo VoluntWeb](logos/voluntweb.png)  
VoluntWeb 2026 &copy;
