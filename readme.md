[![javiertinc@essentials](https://javiertinc.github.io/media/jtEssentials/gh-header.png)](https://github.com/JaviertINC/jtEssentials)

¿Cansado de escribir una y otra vez el mismo código para tareas comunes en tus proyectos web? ¿Buscas formas de acelerar tu desarrollo sin sacrificar la calidad?

**jtEssentials** es tu respuesta.

Es tu **caja de herramientas indispensable** con una colección de funciones y utilidades que te ayudarán a optimizar tu flujo de trabajo. Desde la manipulación de cadenas hasta la gestión de temas, idiomas, generación de datos, cifrado, decifrado y mucho, mucho más, este paquete está diseñado para hacer tu vida más fácil en el mundo del desarrollo web.

> [!NOTE]
> Este proyecto está hecho con [Typescript](https://www.typescriptlang.org) e incluye las interfaces y el tipado de las funciones.

[![Documentación](https://javiertinc.github.io/media/jtEssentials/gh-documentacion.png)](https://github.com/JaviertINC/jtEssentials/wiki)
¿Listo para simplificar tu desarrollo web y liberar todo tu potencial? 🚀

jtEssentials no es solo una colección de funciones; son las herramientas que te harán codificar más rápido, limpio y eficientemente. Pero para descubrir cómo cada una de estas **fascinantes funciones** puede transformar tu flujo de trabajo y resolver esos dolores de cabeza comunes... ¡tienes que explorarlas a fondo!

Sumérgete en la [**Wiki del proyecto**](https://github.com/JaviertINC/jtEssentials/wiki). Allí te espera la guía completa, ejemplos prácticos y todos los secretos para dominar jtEssentials como todo un profesional.

[![Instalación](https://javiertinc.github.io/media/jtEssentials/gh-instalacion.png)](https://github.com/JaviertINC/jtEssentials/wiki)
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

[![Algunos ejemplos](https://javiertinc.github.io/media/jtEssentials/gh-algunos-ejemplos.png)](https://github.com/JaviertINC/jtEssentials/wiki)
Aquí te muestro ejemplos de unas pocas de las muchas utilidades que esta librería te puede ofrecer.

```typescript
import jtEssentials from '@javiertinc/essentials';

let textCapitalized = jtEssentials.text.capitalize('hola mundito, ¿cómo está todo?',true);
//output: Hola Mundito, ¿Cómo Está Todo?

let textCapitalized2 = jtEssentials.text.capitalize('¿qué sucede?');
//output: ¿Qué sucede?

let textCamelCase = jtEssentials.text.camelCase('hola mundazo');
//output: HolaMundazo

// Convierte a string casi cualquier variable, puede ser un objeto, array, string, number (Y lo puedes cifrar).
let dataStringified = jtEssentials.data.stringify({name:'JaviertINC', hobby:'Programar'},'ClaveDeCifrado');
//output (string): 

// Luego lo puedes regresar al mismo tipo de dato que fue alguna vez (Y decifrar).
let result = jtEssentials.data.parse(dataStringified,'ClaveDeCifrado');
//output: (object): {name:'JaviertINC', hobby:'Programar'}

// Generadores
let loremIpsum = jtEssentials.gen.loremIpsum(100); //Cantidad de palabras
//output: Volutpat pharetra blandit cras suspendisse quisque ac volutpat a amet accumsan, proin per...

let password = jtEssentials.gen.password(12);
//output: hqav86b2th7
```

Recuerda revisar la [**documentación**](https://github.com/JaviertINC/jtEssentials/wiki) con más detalles sobre cada increible utilidad y sus opciones. Tu creatividad será el límite.

[![Dependencias externas](https://javiertinc.github.io/media/jtEssentials/gh-dependencias-externas.png)](https://www.npmjs.com/package/@javiertinc/essentials?activeTab=dependencies)

- [crypto-js](https://www.npmjs.com/package/crypto-js): Para cifrar y descifrar datos.
