# Shopify App Template - Next.js App Router

Este es un template para construir una [aplicación de Shopify](https://shopify.dev/apps/getting-started) utilizando **Next.js** y **TypeScript**. Contiene lo básico para desarrollar una aplicación de Shopify en Next.js utilizando el **App Router** y **componentes de servidor**.

This is a template for building a [Shopify app](https://shopify.dev/apps/getting-started) using **Next.js** and **TypeScript**. It contains the essentials for building a Shopify app on Next.js using the **App Router** and **server components**.

## Features / Características

- **Next.js**: Utiliza el último App Router y componentes de servidor.
- **Prisma**: Para gestionar conexiones a la base de datos y migraciones.
- **Apollo**: Para interactuar con la API GraphQL de Shopify.
- **App Bridge v4**: Para autenticar solicitudes de API en el frontend.
- **Shopify API Library**: Para gestionar OAuth en el backend sin servidor.
- **Polaris React**: Para construir experiencias de alta calidad y consistentes para los comerciantes de Shopify.
- **Tailwind CSS**: Para estilos y diseño rápidos y flexibles.
- **Docker**: Para configurar la base de datos PostgreSQL para desarrollo local.
- **GraphQL Codegen**: Para generar tipos para consultas y mutaciones GraphQL.

## Installing the Template / Instalación del Template

Este template puede ser instalado usando tu gestor de paquetes preferido:

This template can be installed using your preferred package manager:

### Using pnpm (Recommended) / Usando pnpm (Recomendado):

pnpx @shopify/create-app@latest --template https://github.com/aarodevbyboteromedia/shopify-next-vercel-template.git

### Using yarn / Usando yarn:

yarn create @shopify/app --template https://github.com/aarodevbyboteromedia/shopify-next-vercel-template.git

### Using npx / Usando npx:

npx @shopify/create-app@latest --template https://github.com/aarodevbyboteromedia/shopify-next-vercel-template.git

Esto clonará el template e instalará las dependencias necesarias.

This will clone the template and install the required dependencies.

## Next.js and Shopify Embedded Apps / Next.js y Aplicaciones Integradas de Shopify

El objetivo de este template es proporcionar una manera rápida y fácil de iniciar una Aplicación Integrada de Shopify que utiliza la plataforma App Router de Next.js. Parte de la información siguiente era previamente necesaria para el router pages, por lo que estoy trabajando en migrar algo del código legado.

The goal of this template is to provide a quick and easy way to spin up a Shopify Embedded App that uses the Next.js App Router platform. Some of the following information was previously necessary for the pages router, so I am working on migrating some of the legacy code.

### Providers / Proveedores

En layout.tsx configuramos algunos proveedores que son necesarios para que la aplicación funcione.

In layout.tsx we set up some providers that are necessary for the app to run.

- **ApolloProvider**: (Opcional) Configura el contexto de Apollo para ejecutar consultas y mutaciones GraphQL. Esto se maneja a través de la ruta /api/graphql de Next.js y es gestionado por la librería Shopify API.

- **SessionProvider**: (Opcional) Asegura que el usuario siempre tenga una sesión activa y que la aplicación esté instalada correctamente. Básicamente redirige al usuario para autenticar cuando es necesario.

## OAuth

### Token Exchange / Intercambio de Token

La plantilla de la aplicación usa intercambio de tokens por defecto. El usuario obtiene el ID Token desde la carga inicial de la página y lo envía al servidor donde se almacena. Esto ocurre usando una acción del servidor.

The app template uses token exchange by default. The user gets the ID Token from the initial page load and sends it to the server where it is stored. This happens using a server action.

Además, todas las acciones del servidor deben enviar el token de sesión junto con ellas, para que el servidor pueda verificar e intercambiar el token si es necesario.

Also, all server actions should have the session token sent along with them, so the server can verify and exchange the token if needed.

### OAuth (Método antiguo - Por Deprecar)

OAuth se maneja usando las rutas /api/auth y /api/auth/callback. La aplicación está configurada para usar tokens tanto en línea como fuera de línea, por defecto.

OAuth is handled using the /api/auth and /api/auth/callback routes. The app is set up to use both online and offline tokens by default.

> Nota: Para usar la ruta /api/graphql directamente, necesitas usar tokens en línea.

## Environment Variables / Variables de Entorno

Hay varias variables de entorno que necesitas configurar para que la aplicación funcione. Crea un archivo llamado .env en el directorio raíz (o en la raíz de tu aplicación Next.js) y añade las siguientes líneas:

There are a couple of environment variables you need to set up in order for the app to run. Create a file called .env in the root directory (or the root of your Next.js app) and add the following lines:

DATABASE_URL= # Cadena de conexión a la base de datos - para conectar con Prisma
POSTGRES_PASSWORD= # Contraseña opcional de la base de datos - al ejecutar la base de datos PostgreSQL localmente a través de Docker

Las dos primeras variables son pobladas automáticamente por la Shopify CLI.

The first two variables are automatically populated by the Shopify CLI.

> **Importante**: Recuerda cambiar la información en shopify.app.toml y asegurar que el archivo .env esté correctamente configurado.

## Todo

- ✅ Guardado de sesión usando MongoDB
- ✅ Flujo de OAuth para tokens en línea y fuera de línea
- ✅ Llamada a GraphQL usando Apollo
- ✅ Nueva configuración del router para Next.js y App Bridge
- ✅ Webhook de AppUninstalled - Limpieza y eliminación de sesiones
- ✅ Sesiones de base de datos gestionadas a través de Prisma
- ✅ Eliminar APIProvider y usar fetch en su lugar
- ⬜ Eliminar código sobrante no utilizado

## Tech Stack

Este template combina una serie de herramientas de terceros de código abierto:

This template combines a number of third-party open-source tools:

- **Next.js**: Construye el frontend en React.
- **Shopify API Library**: Gestiona OAuth en el backend sin servidor.
- **App Bridge React**: Añade autenticación a las solicitudes de API en el frontend.
- **Apollo**: Para interactuar con la API GraphQL de Shopify (Opcional).
- **Polaris React**: Sistema de diseño y biblioteca de componentes.
- **Prisma**: Para gestionar conexiones a la base de datos y migraciones.

## Getting Started / Primeros Pasos

### Local Development / Desarrollo Local

La Shopify CLI se conecta a una aplicación en tu panel de Partners. Proporciona variables de entorno, ejecuta comandos en paralelo y actualiza las URLs de la aplicación para facilitar el desarrollo.

You can develop locally using your preferred package manager.

Puedes desarrollar localmente usando tu gestor de paquetes preferido.

pnpm run dev

### Docker para Desarrollo Local

También puedes configurar y ejecutar la base de datos PostgreSQL localmente usando Docker:

docker-compose up
pnpm run migrate

### GraphQL Codegen

Si ejecutas el siguiente comando, generará los tipos para las consultas y mutaciones GraphQL:

pnpm run graphql-codegen

### Actualizar Prisma y Dependencias

Después de conectar la base de datos, asegúrate de actualizar Prisma y las dependencias:

pnpm update
pnpm install

### Prune Código Innecesario

Una vez que hayas configurado todo, es recomendable eliminar el código sobrante:

pnpm run prune

## Deployment / Despliegue

Puedes desplegar esta aplicación a un servicio de hosting de tu elección. Aquí está la configuración básica para desplegar en Vercel:

1. Crea tu Aplicación de Shopify en el Dashboard de Partners de Shopify.
2. Crea tu proyecto en Vercel y añade las variables de entorno:
   - SHOPIFY_API_KEY
   - SHOPIFY_API_SECRET
   - SCOPES
   - HOST
   - Cadenas de conexión a la base de datos
3. Configura las rutas de callback en tu Aplicación de Shopify
4. Despliega usando:

pnpm run deploy

## Application Storage / Almacenamiento de la Aplicación

Esta plantilla usa Prisma para almacenar y gestionar sesiones.

## Developer Resources / Recursos para Desarrolladores

- [Introducción a las aplicaciones de Shopify](https://shopify.dev/apps/getting-started)
- [Autenticación de aplicaciones](https://shopify.dev/apps/auth)
- [Shopify CLI](https://shopify.dev/apps/tools/cli)
- [Documentación de la Shopify API Library](https://github.com/Shopify/shopify-node-api)

## Recordatorios Importantes

### Actualizar shopify.app.toml

Asegúrate de actualizar el archivo shopify.app.toml con la información correcta de tu aplicación.

### Configurar el Archivo .env

El archivo .env es crucial para la configuración de tu aplicación.

### Actualizar Prisma Después de Conectar la Base de Datos

pnpm run migrate

### Mantener las Dependencias Actualizadas

pnpm update
pnpm install
