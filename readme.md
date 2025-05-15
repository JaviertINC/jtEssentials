[![javiertinc@essentials](https://raw.githubusercontent.com/JaviertINC/essentials/refs/heads/master/images/jtEssentials-gh-header.png)](https://github.com/JaviertINC/essentials)

# ¿Qué es jtEssentials?

Este proyecto es una colección de funciones útiles que considero esenciales para el desarrollo de aplicaciones web.

> [!NOTE]
> Este proyecto está hecho con [Typescript](https://www.typescriptlang.org) e incluye las interfaces y el tipado de las funciones.

[![Documentación](https://raw.githubusercontent.com/JaviertINC/essentials/refs/heads/master/images/jtEssentials-gh-documentacion.png)](https://github.com/JaviertINC/essentials/wiki)
Revisa toda la documentación completa de las funciones en la [Wiki del proyecto](https://github.com/JaviertINC/essentials/wiki).


[![Instalación](https://raw.githubusercontent.com/JaviertINC/essentials/refs/heads/master/images/jtEssentials-gh-instalacion.png)](https://github.com/JaviertINC/essentials/wiki)
Puedes instalar el paquete utilizando npm, yarn o pnpm. Asegúrate de tener uno de estos gestores de paquetes instalado en tu sistema.

```bash
npm install @javiertinc/essentials
```
```bash
yarn add @javiertinc/essentials
```
```bash
pnpm add @javiertinc/essentials
```

[![Configuración](https://raw.githubusercontent.com/JaviertINC/essentials/refs/heads/master/images/jtEssentials-gh-configuracion.png)](https://github.com/JaviertINC/essentials/wiki)

Para utilizar las funciones de este paquete, primero debes importarlas en tu archivo JavaScript o TypeScript. Luego deberás inicializar una instancia con la configuración para tu proyecto.

```typescript
import jtEssentials from '@javiertinc/essentials';

const jtess = new jtEssentials({
    project: {
        name: 'nombre del proyecto',
        version: '1.0.0',
        environment: 'development'
    },
    data: {
        encrypt: true,
        key: 'clave de cifrado'
    },
    debug: {
        cnsl: true,
        log: true,
        strg: true,
        obsv: false
    },
    log_quantity: 100,
});
```

[![Algunos ejemplos](https://raw.githubusercontent.com/JaviertINC/essentials/refs/heads/master/images/jtEssentials-gh-algunos-ejemplos.png)](https://github.com/JaviertINC/essentials/wiki)
Utilizando la misma instancia de `jtEssentials` que inicializaste anteriormente, puedes utilizar las funciones de la siguiente manera:

```typescript
jtess.cnsl.log('Hola mundo');
let user = jtess.strg.get('user');
let normalized = jtess.text.normalize('Téxtós cón tíldés nó pérmítídás');
```

[![Dependencias externas](https://raw.githubusercontent.com/JaviertINC/essentials/refs/heads/master/images/jtEssentials-gh-dependencias-externas.png)](https://www.npmjs.com/package/@javiertinc/essentials?activeTab=dependencies)
- [crypto-js](https://www.npmjs.com/package/crypto-js): Para cifrar y descifrar datos.
- [rxjs](https://www.npmjs.com/package/rxjs): Para la reactividad y la observación de datos.