[![javiertinc@essentials](https://javiertinc.github.io/media/jtEssentials/gh-header.png)](https://github.com/JaviertINC/essentials)

¿Cansado de escribir una y otra vez el mismo código para tareas comunes en tus proyectos web? ¿Buscas formas de acelerar tu desarrollo sin sacrificar la calidad?

**jtEssentials** es tu respuesta.

Es tu **caja de herramientas indispensable** con una colección de funciones y utilidades que te ayudarán a optimizar tu flujo de trabajo. Desde la manipulación de cadenas hasta la gestión de almacenamiento, pasando por la depuración y el cifrado de datos, este paquete está diseñado para hacer tu vida más fácil en el mundo del desarrollo web.

> [!NOTE]
> Este proyecto está hecho con [Typescript](https://www.typescriptlang.org) e incluye las interfaces y el tipado de las funciones.

[![Documentación](https://javiertinc.github.io/media/jtEssentials/gh-documentacion.png)](https://github.com/JaviertINC/essentials/wiki)
¿Listo para simplificar tu desarrollo web y liberar todo tu potencial? 🚀

jtEssentials no es solo una colección de funciones; son las herramientas que te harán codificar más rápido, limpio y eficientemente. Pero para descubrir cómo cada una de estas **fascinantes funciones** puede transformar tu flujo de trabajo y resolver esos dolores de cabeza comunes... ¡tienes que explorarlas a fondo!

Sumérgete en la [**Wiki del proyecto**](https://github.com/JaviertINC/essentials/wiki). Allí te espera la guía completa, ejemplos prácticos y todos los secretos para dominar jtEssentials como todo un profesional.

[![Instalación](https://javiertinc.github.io/media/jtEssentials/gh-instalacion.png)](https://github.com/JaviertINC/essentials/wiki)
¡Empezar con jtEssentials es rápido y sencillo! Solo necesitas un gestor de paquetes como npm, yarn o pnpm. Si ya tienes uno instalado, simplemente ejecuta uno de los siguientes comandos en la raíz de tu proyecto:

```bash
npm install @javiertinc/essentials
```

```bash
yarn add @javiertinc/essentials
```

```bash
pnpm add @javiertinc/essentials
```

¡Y listo! ¡Ya tienes jtEssentials instalado y preparado para llevar tus proyectos al siguiente nivel!

[![Configuración](https://javiertinc.github.io/media/jtEssentials/gh-configuracion.png)](https://github.com/JaviertINC/essentials/wiki)

Para aprovechar al máximo jtEssentials y adaptarlo a las necesidades específicas de tu proyecto, es necesario realizar una configuración inicial. ¡No te preocupes, es un proceso sencillo!

1. **Importa** la librería en tu archivo principal o donde vayas a utilizar las funciones.
2. **Crea una nueva instancia** de `jtEssentials` pasándole un objeto de configuración.

Aquí tienes un ejemplo de cómo configurar una instancia básica con las secciones principales:

```typescript
import jtEssentials from '@javiertinc/essentials';

// Configura jtEssentials con los detalles y preferencias de tu proyecto
const jtess = new jtEssentials({
    // Información básica de tu proyecto (útil para logs, identificación, etc.)
    project: {
        name: 'Mi Increíble Aplicación Web', // <- ¡Dale un nombre real a tu proyecto!
        version: '1.0.0', // <- Versión actual de tu proyecto
        environment: 'development' // <- 'development', 'production', 'testing', etc.
    },
    // Opciones relacionadas con el manejo de datos (como cifrado)
    data: {
        encrypt: true, // <- Define si los datos se cifran por defecto
        key: 'tu-clave-super-secreta-y-unica' // <- ¡CAMBIA esto por una clave segura!
    },
    // Controla las opciones de depuración y visibilidad (consola, logs, etc.)
    debug: {
        cnsl: true, // Salida a consola
        log: true, // Generación de archivos de log
        strg: true, // Uso de almacenamiento local/sesión
        obsv: false // Observadores o monitorización avanzada
    },
    // Otros parámetros globales, como la cantidad máxima de logs a mantener
    log_quantity: 100
});
```

¡Y SAS! Ahora puedes usar 'jtess' para acceder a todas las funciones de jtEssentials. Recuerda revisar la [**documentación**](https://github.com/JaviertINC/essentials/wiki) con más detalles sobre cada sección y sus opciones.

[![Algunos ejemplos](https://javiertinc.github.io/media/jtEssentials/gh-algunos-ejemplos.png)](https://github.com/JaviertINC/essentials/wiki)
Utilizando la misma instancia de `jtEssentials` que inicializaste anteriormente, puedes utilizar las funciones de la siguiente manera:

```typescript
jtess.cnsl.log('Hola mundo');
let user = jtess.strg.get('user');
let normalized = jtess.text.normalize('Téxtós cón tíldés nó pérmítídás');
```

[![Dependencias externas](https://javiertinc.github.io/media/jtEssentials/gh-dependencias-externas.png)](https://www.npmjs.com/package/@javiertinc/essentials?activeTab=dependencies)

- [crypto-js](https://www.npmjs.com/package/crypto-js): Para cifrar y descifrar datos.
