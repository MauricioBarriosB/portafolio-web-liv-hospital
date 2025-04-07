# Portafolio Web - Liv Hospital / Fecha entrega 07-04-25

URL Github pública acceso distribución React SPA:

https://mauriciobarriosb.github.io/portafolio-web-liv-hospital/dist

URL Github pública acceso archivos fuente Proyecto (Boostrap 4 - TypeScript - React JS - API REST):

https://github.com/MauricioBarriosB/portafolio-web-liv-hospital

## Comunes del Proyecto:

* Desarrollo a medida para Portafolio Web.

## Protección de Rutas y Perfilamiento:

Rutas protejidas de React Router DOM y perfilamiento:

* Nombre de usuario: admin
* Contraseña: adminpass
* Perfil admin tiene acceso a las siguientes páginas: home, pacientes, equipo médico, citas.<br/><br/>
* Nombre de usuario: doctor
* Contraseña: doctorpass
* Perfil doctor tiene acceso a las siguientes páginas: home, pacientes.<br/><br/>
* Nombre de usaurio: guest 
* Contraseña: guestpass
* Perfil guest (invitado) tiene acceso a las siguientes páginas:  home, equipo médico, citas.

## Instalación:

* git clone...
* npm install
* crear archivo .env y variables de entorno (referencia env.example)
* npm run dev
* npm run build