<h1 align="center">FrontSMSA</h1>   

## Descripcion

El proyecto plantea el desarrollo de una solución tecnológica que consolide de manera automatizada la información de la trayectoria académica de los estudiantes que se encuentran en riesgo de deserción. El sistema se fundamentará en dos pilares principales: un histórico académico integral, que almacene de forma detallada las asignaturas vistas y los resultados obtenidos por los estudiantes a lo largo de su trayectoria académica, y un módulo de seguimiento y acompañamiento, que facilite el registro y monitoreo de las estrategias implementadas por los distintos actores involucrados en el proceso de acompañamiento para apoyar a los estudiantes en riesgo de deserción.

## Como puedo desplegar el proyecto en mi equipo?:

1. Clona este repositorio o descarga el código.

2. Abre una terminal en la carpeta raíz del proyecto.

3. Instala las dependencias:

```bash
npm install xlsx
npm install
```

##  Requisitos previos 

Asegúrate de tener instalado en tu PC:

- **Node.js** (versión recomendada LTS): [https://nodejs.org](https://nodejs.org)

Abre tu terminal y ejecuta :

```bash
node -v
npm -v
ng version
```

Si ng version no te da información de Angular CLI, instálala:

```bash
npm install -g @angular/cli
```

Para iniciar el servidor de desarrollo, ejecuta:

```bash
ng serve
```

Una vez el servidor este corriendo ve a tu navegador y ejecuta la url `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques alguno de los archivos fuente.

## Generación de código (Scaffolding)

Angular CLI incluye potentes herramientas para generar código automáticamente. Para generar un nuevo componente, ejecuta:

```bash
ng generate component nombre-del-componente
```

Para ver la lista completa de esquemas disponibles (como components, directives o pipes), ejecuta:

```bash
ng generate --help
```

## Construcción del proyecto

Para compilar el proyecto, ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los archivos generados en la carpeta dist/.
Por defecto, la compilación de producción optimiza la aplicación para mejorar su rendimiento y velocidad.

## Ejecución de pruebas unitarias

Para ejecutar pruebas unitarias con el framework [Karma](https://karma-runner.github.io) , utiliza el siguiente comando:

```bash
ng test
```

## Ejecución de pruebas end-to-end (e2e)

Para realizar pruebas end-to-end, ejecuta:

```bash
ng e2e
```

Angular CLI no incluye un framework para pruebas end-to-end por defecto. Puedes integrar uno que se ajuste a tus necesidades.

## Additional Resources

Este proyecto fue generado gracias a [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.
Para mayor informacion de uso de Angular CLI, incluyendo detallada informacion de comandos visite la pagina [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
