![javiertinc@essentials](https://repository-images.githubusercontent.com/982520411/43ddd299-ea98-473b-aaa0-5a70d9c74ab2)

# ¿Qué es jt@essentials?

Este proyecto es una colección de funciones útiles que considero esenciales para el desarrollo de aplicaciones web.

> [!NOTE]
> Este proyecto está hecho con Typescript e incluye el tipado de las funciones. Si no estás familiarizado con Typescript, puedes consultar la [documentación oficial](https://www.typescriptlang.org/docs/).

# Instalación
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

# Configuración

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
    }
});
```

# Ejemplo básico
Utilizando la misma instancia de `jtEssentials` que inicializaste anteriormente, puedes utilizar las funciones de la siguiente manera:

```typescript
jtess.cnsl.log('Hola mundo');

let formatedRut = jtess.rut.format('12345678-9');
```

# Documentación
Revisa toda la documentación completa de las funciones en la [Wiki del proyecto](https://github.com/JaviertINC/essentials/wiki/Documentaci%C3%B3n).

# Dependencias externas de la librería
- [crypto-js](https://www.npmjs.com/package/crypto-js): Para cifrar y descifrar datos.
- [rxjs](https://www.npmjs.com/package/rxjs): Para la observación de datos.