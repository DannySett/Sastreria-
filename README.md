# Sastrería Elegance
### Sistema web de gestión administrativa para una sastrería

## 1. Descripción del proyecto

Sastrería Elegance es una aplicación web orientada a facilitar la gestión administrativa de una sastrería mediante la centralización de diferentes actividades relacionadas con clientes, medidas, facturación, servicios e inventario.

El proyecto busca ofrecer una herramienta digital que permita organizar la información del negocio, simplificar las tareas administrativas y mejorar el seguimiento de sus operaciones.

La aplicación se desarrolla como parte de un proyecto académico de Ingeniería de Sistemas.

## 2. Objetivo general

Desarrollar una aplicación web para apoyar la gestión administrativa de una sastrería, integrando módulos que permitan organizar la información de clientes, servicios, facturación e inventario mediante una interfaz intuitiva y de fácil utilización.

## 3. Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| HTML5 | Estructura de la aplicación web. |
| CSS3 | Diseño y presentación de interfaces. |
| JavaScript | Lógica e interactividad de los módulos. |
| Tailwind CSS | Apoyo en la construcción de estilos. |
| Font Awesome | Iconografía de la aplicación. |
| Google Fonts | Tipografías utilizadas en la interfaz. |
| GitHub | Control de versiones y almacenamiento del código fuente. |
| GitHub Pages | Publicación de la aplicación web. |
| Supabase | Plataforma seleccionada para una futura integración de base de datos y autenticación. |

**Nota:** Supabase se encuentra contemplado en la arquitectura del proyecto, pero su conexión funcional todavía está pendiente.

## 4. Estructura del proyecto

La organización principal del repositorio es la siguiente:

```text
Sastreria-/
│
├── css/
│   └── styles.css
│
├── js/
│   └── Archivos JavaScript
│
├── supabase/
│   └── Archivos de configuración
│
├── index.html
│
└── README.md
```

## 5. Módulos de la aplicación

La aplicación contempla los siguientes módulos administrativos:

- **Panel principal:** presenta una vista general de la información del negocio.
- **Clientes y medidas:** permite gestionar información relacionada con los clientes y sus medidas.
- **Facturación:** contempla operaciones de creación, consulta y edición de facturas.
- **Servicios:** permite organizar los servicios ofrecidos por la sastrería.
- **Inventario:** contempla la administración de los recursos y materiales del negocio.
- **Reportes financieros:** presenta información relacionada con el seguimiento financiero.
- **Configuración:** reúne opciones de administración del sistema.

Los formularios y módulos cuentan con lógica de interacción desarrollada en JavaScript. Su funcionamiento individual debe verificarse mediante las pruebas correspondientes.

## 6. Requisitos para la ejecución

Para ejecutar el proyecto se requiere:

- Un navegador web actualizado.
- Conexión a Internet para cargar los recursos externos utilizados por la interfaz.
- Visual Studio Code u otro editor de código, si se desea modificar el proyecto.
- Git, opcionalmente, para clonar el repositorio.

## 7. Instalación y ejecución local

Para obtener una copia del proyecto se deben seguir los siguientes pasos:

**Paso 1. Clonar el repositorio**

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/DannySett/Sastreria-.git
```

**Paso 2. Ingresar a la carpeta**

```bash
cd Sastreria-
```

**Paso 3. Abrir el proyecto**

Abrir la carpeta del proyecto en Visual Studio Code.

**Paso 4. Ejecutar la aplicación**

Utilizar una extensión como Live Server para ejecutar el archivo `index.html` desde un servidor local.

También es posible abrir el archivo HTML directamente en un navegador, aunque se recomienda utilizar un servidor local para evitar posibles restricciones de ejecución.

## 8. Despliegue de la aplicación

El proyecto se encuentra publicado mediante GitHub Pages, lo que permite acceder a la interfaz web desde un navegador sin necesidad de instalar la aplicación.

**Repositorio:**

https://github.com/DannySett/Sastreria-

**Aplicación publicada:**

https://dannysett.github.io/Sastreria-/

## 9. Estado actual del desarrollo

La aplicación cuenta con una interfaz web publicada, diferentes módulos administrativos y formularios que ejecutan acciones mediante JavaScript.

Actualmente, el proyecto presenta el siguiente estado:

- La interfaz administrativa se encuentra implementada.
- Los formularios cuentan con lógica de interacción.
- Se dispone de archivos de configuración relacionados con Supabase.
- La integración funcional con Supabase está pendiente.
- La persistencia centralizada de la información no ha sido verificada.
- La pantalla de inicio de sesión está implementada visualmente, pero todavía no realiza una autenticación efectiva.
- El acceso no está restringido mediante una validación funcional de credenciales.
- El sistema contempla inicialmente el rol de administrador, pero el control de permisos todavía requiere implementación.

## 10. Equipo de desarrollo

El proyecto es desarrollado por dos estudiantes del programa de Ingeniería de Sistemas:

- **Danny Jimena Triana:** desarrollo e integración técnica, con énfasis en Backend, gestión de bases de datos y conexión de servicios.
- **Alejandro Hurtado Vargas:** desarrollo de interfaces, estructura visual y experiencia de usuario.

Ambos integrantes participan en la planificación, revisión y seguimiento de las actividades del proyecto.

## 11. Mejoras futuras

Como parte de la continuidad del proyecto se contemplan las siguientes mejoras:

- Integración funcional con Supabase.
- Implementación de autenticación de usuarios.
- Desarrollo de un sistema de permisos y diferenciación de roles.
- Persistencia centralizada de clientes, servicios y facturas.
- Fortalecimiento de los mecanismos de seguridad.
- Ejecución de pruebas funcionales, de integración y usabilidad.
- Optimización de los módulos administrativos.

## 12. Licencia y uso académico

Este proyecto se desarrolla con fines académicos como parte de las actividades del programa de Ingeniería de Sistemas.
