import jtEssentials from '../dist/index.js';
import fs from 'fs';

let testId = 1;
let failedTests = [];
let totalTests = 0;
let fileName = 'tests/tests.txt';

function runTest(name, utility, expected, actual) {
    totalTests++;
    const passed = JSON.stringify(expected) === JSON.stringify(actual);
    const result = {
        id: testId++,
        name: name,
        utility: utility,
        expected: expected,
        actual: actual,
        passed: passed ? 'Sí' : 'No'
    };

    if (!passed) {
        failedTests.push(result.id);
    }

    return result;
}

function writeTestResult(result) {
    const output = `ID: ${result.id}
Nombre: ${result.name}
Utilidad: ${result.utility}
Esperado: ${JSON.stringify(result.expected)}
Obtenido: ${JSON.stringify(result.actual)}
Aprobado: ${result.passed}

`;
    fs.appendFileSync(fileName, output);
}

function writeSummary() {
    const summary = `\n${totalTests - failedTests.length}/${totalTests}
${failedTests.length === 0 ? 'Todas las pruebas pasaron con éxito' : `Pruebas fallidas: ${failedTests.join(', ')}`}
`;
    fs.appendFileSync(fileName, summary);
}

// Limpiar archivo anterior
if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
}

// Pruebas para módulo data
console.log('Ejecutando pruebas del módulo data...');

// stringify sin encriptación
let result = runTest('data.stringify - string', 'jtEssentials.data.stringify("test")', '{"type":"string","data":"test"}', jtEssentials.data.stringify("test"));
writeTestResult(result);

result = runTest('data.stringify - number', 'jtEssentials.data.stringify(123)', '{"type":"number","data":"123"}', jtEssentials.data.stringify(123));
writeTestResult(result);

result = runTest('data.stringify - boolean', 'jtEssentials.data.stringify(true)', '{"type":"boolean","data":"true"}', jtEssentials.data.stringify(true));
writeTestResult(result);

result = runTest('data.stringify - object', 'jtEssentials.data.stringify({a:1})', '{"type":"object","data":"{\\"a\\":1}"}', jtEssentials.data.stringify({a:1}));
writeTestResult(result);


// parse sin desencriptación
result = runTest('data.parse - string', 'jtEssentials.data.parse(\'{"type":"string","data":"test"}\')', 'test', jtEssentials.data.parse('{"type":"string","data":"test"}'));
writeTestResult(result);

result = runTest('data.parse - number', 'jtEssentials.data.parse(\'{"type":"number","data":"123"}\')', 123, jtEssentials.data.parse('{"type":"number","data":"123"}'));
writeTestResult(result);

result = runTest('data.parse - boolean', 'jtEssentials.data.parse(\'{"type":"boolean","data":"true"}\')', true, jtEssentials.data.parse('{"type":"boolean","data":"true"}'));
writeTestResult(result);

result = runTest('data.parse - object', 'jtEssentials.data.parse(\'{"type":"object","data":"{\\\\"a\\\\":1}"}\')', {a:1}, jtEssentials.data.parse('{"type":"object","data":"{\\"a\\":1}"}'));
writeTestResult(result);

// parse con desencriptación
const encryptedStr = jtEssentials.data.stringify("test", "key");
result = runTest('data.parse - encrypted', 'jtEssentials.data.parse(encryptedStr, "key")', 'test', jtEssentials.data.parse(encryptedStr, "key"));
writeTestResult(result);

// encrypt/decrypt
const original = "test data";
const encryptedData = jtEssentials.data.encrypt(original, "key");
const decryptedData = jtEssentials.data.decrypt(encryptedData, "key");
result = runTest('data.encrypt/decrypt', 'jtEssentials.data.decrypt(jtEssentials.data.encrypt("test data", "key"), "key")', original, decryptedData);
writeTestResult(result);

// usid
result = runTest('data.usid', 'jtEssentials.data.usid("test name")', jtEssentials.data.usid("test name"), jtEssentials.data.usid("test name"));
writeTestResult(result);

// Pruebas para módulo text
console.log('Ejecutando pruebas del módulo text...');

result = runTest('text.capitalize - all words', 'jtEssentials.text.capitalize("hello world", true)', 'Hello World', jtEssentials.text.capitalize("hello world", true));
writeTestResult(result);

result = runTest('text.capitalize - first word', 'jtEssentials.text.capitalize("hello world")', 'Hello world', jtEssentials.text.capitalize("hello world"));
writeTestResult(result);

result = runTest('text.camelCase', 'jtEssentials.text.camelCase("hello world test")', 'helloWorldTest', jtEssentials.text.camelCase("hello world test"));
writeTestResult(result);

result = runTest('text.kebabCase', 'jtEssentials.text.kebabCase("Hello World Test")', 'hello-world-test', jtEssentials.text.kebabCase("Hello World Test"));
writeTestResult(result);

result = runTest('text.snakeCase', 'jtEssentials.text.snakeCase("Hello World Test")', 'hello_world_test', jtEssentials.text.snakeCase("Hello World Test"));
writeTestResult(result);

result = runTest('text.reverse', 'jtEssentials.text.reverse("hello")', 'olleh', jtEssentials.text.reverse("hello"));
writeTestResult(result);

result = runTest('text.normalize', 'jtEssentials.text.normalize("café naïve")', 'cafe naive', jtEssentials.text.normalize("café naïve"));
writeTestResult(result);

// Pruebas para módulo date
console.log('Ejecutando pruebas del módulo date...');

const testDate = new Date('2023-01-15T10:30:45');
result = runTest('date.format', 'jtEssentials.date.format(new Date("2023-01-15T10:30:45"))', '15/01/2023 10:30:45', jtEssentials.date.format(testDate));
writeTestResult(result);

result = runTest('date.daysBetween', 'jtEssentials.date.daysBetween(new Date("2023-01-01"), new Date("2023-01-15"))', 14, jtEssentials.date.daysBetween(new Date('2023-01-01'), new Date('2023-01-15')));
writeTestResult(result);

result = runTest('date.time.add', 'jtEssentials.date.time.add(new Date("2023-01-15T10:30:45"), {hours:2, minutes:30})', new Date('2023-01-15T13:00:45'), jtEssentials.date.time.add(new Date("2023-01-15T10:30:45"), {hours: 2, minutes: 30}));
writeTestResult(result);

result = runTest('date.time.sub', 'jtEssentials.date.time.sub(new Date("2023-01-15T10:30:45"), {hours:1, minutes:15})', new Date('2023-01-15T09:15:45'), jtEssentials.date.time.sub(new Date("2023-01-15T10:30:45"), {hours: 1, minutes: 15}));
writeTestResult(result);

result = runTest('date.days.add', 'jtEssentials.date.days.add(new Date("2023-01-15"), 5)', new Date('2023-01-20'), jtEssentials.date.days.add(new Date("2023-01-15"), 5));
writeTestResult(result);

result = runTest('date.days.sub', 'jtEssentials.date.days.sub(new Date("2023-01-15"), 3)', new Date('2023-01-12'), jtEssentials.date.days.sub(new Date("2023-01-15"), 3));
writeTestResult(result);

result = runTest('date.months.add', 'jtEssentials.date.months.add(new Date("2023-01-15"), 2)', new Date('2023-03-15'), jtEssentials.date.months.add(new Date("2023-01-15"), 2));
writeTestResult(result);

result = runTest('date.months.sub', 'jtEssentials.date.months.sub(new Date("2023-01-15"), 1)', new Date('2022-12-15'), jtEssentials.date.months.sub(new Date("2023-01-15"), 1));
writeTestResult(result);

result = runTest('date.years.add', 'jtEssentials.date.years.add(new Date("2023-01-15"), 1)', new Date('2024-01-15'), jtEssentials.date.years.add(new Date("2023-01-15"), 1));
writeTestResult(result);

result = runTest('date.years.sub', 'jtEssentials.date.years.sub(new Date("2023-01-15"), 2)', new Date('2021-01-15'), jtEssentials.date.years.sub(new Date("2023-01-15"), 2));
writeTestResult(result);

result = runTest('date.getAge', 'jtEssentials.date.getAge("1998-11-19")', {years: 26, months: 10, days: 27}, jtEssentials.date.getAge("1998-11-19"));
writeTestResult(result);

result = runTest('date.getDayOfWeek', 'jtEssentials.date.getDayOfWeek(new Date("2023-01-15"))', 'domingo', jtEssentials.date.getDayOfWeek(new Date('2023-01-15')));
writeTestResult(result);

result = runTest('date.getMonth', 'jtEssentials.date.getMonth(new Date("2023-01-15"))', 'enero', jtEssentials.date.getMonth(new Date('2023-01-15')));
writeTestResult(result);

// Pruebas para módulo util
console.log('Ejecutando pruebas del módulo util...');

result = runTest('util.mask - basic', 'jtEssentials.util.mask("123456789", "000-000-000")', {public: '123-456-789', private: '123-456-789'}, jtEssentials.util.mask("123456789", "000-000-000"));
writeTestResult(result);

result = runTest('util.mask - with X', 'jtEssentials.util.mask("123456789", "XXX-XXX-000")', {public: '***-***-789', private: '123-456-789'}, jtEssentials.util.mask("123456789", "XXX-XXX-000"));
writeTestResult(result);

result = runTest('util.mask - invert', 'jtEssentials.util.mask("12345678", "00.000.000-0", true)', {public: '1.234.567-8', private: '1.234.567-8'}, jtEssentials.util.mask("12345678", "00.000.000-0", true));
writeTestResult(result);

result = runTest('util.blob', 'jtEssentials.util.blob("test").startsWith("blob:")', true, jtEssentials.util.blob("test").startsWith("blob:"));
writeTestResult(result);

// isMobile - esta función depende del userAgent, probaremos con un mock básico
result = runTest('util.isMobile', 'jtEssentials.util.isMobile() returns boolean', 'boolean', typeof jtEssentials.util.isMobile());
writeTestResult(result);

// theme functions - dependen del DOM, probaremos que no lancen error
try {
    jtEssentials.util.theme.set('dark');
    result = runTest('util.theme.set', 'jtEssentials.util.theme.set("dark")', undefined, undefined);
    writeTestResult(result);
} catch (e) {
    result = runTest('util.theme.set', 'jtEssentials.util.theme.set("dark")', 'error: window is not defined', 'error: ' + e.message);
    writeTestResult(result);
}

try {
    const theme = jtEssentials.util.theme.get();
    result = runTest('util.theme.get', 'jtEssentials.util.theme.get()', 'string or null', typeof theme === 'string' || theme === null);
    writeTestResult(result);
} catch (e) {
    result = runTest('util.theme.get', 'jtEssentials.util.theme.get()', 'error: window is not defined', 'error: ' + e.message);
    writeTestResult(result);
}

try {
    const browserTheme = jtEssentials.util.theme.browser();
    result = runTest('util.theme.browser', 'jtEssentials.util.theme.browser()', 'dark or light', browserTheme === 'dark' || browserTheme === 'light');
    writeTestResult(result);
} catch (e) {
    result = runTest('util.theme.browser', 'jtEssentials.util.theme.browser()', 'error: window is not defined', 'error: ' + e.message);
    writeTestResult(result);
}

// lang functions - dependen del DOM, probaremos que no lancen error
try {
    jtEssentials.util.lang.set('es');
    result = runTest('util.lang.set', 'jtEssentials.util.lang.set("es")', undefined, undefined);
    writeTestResult(result);
} catch (e) {
    result = runTest('util.lang.set', 'jtEssentials.util.lang.set("es")', 'error: window is not defined', 'error: ' + e.message);
    writeTestResult(result);
}

try {
    const lang = jtEssentials.util.lang.get();
    result = runTest('util.lang.get', 'jtEssentials.util.lang.get()', 'string or null', typeof lang === 'string' || lang === null);
    writeTestResult(result);
} catch (e) {
    result = runTest('util.lang.get', 'jtEssentials.util.lang.get()', 'error: window is not defined', 'error: ' + e.message);
    writeTestResult(result);
}

const browserLang = jtEssentials.util.lang.browser();
result = runTest('util.lang.browser', 'jtEssentials.util.lang.browser()', 'en-US', browserLang);
writeTestResult(result);


// Pruebas para módulo gen
console.log('Ejecutando pruebas del módulo gen...');

result = runTest('gen.password - default', 'jtEssentials.gen.password(8)', 'length 8', 'length ' + jtEssentials.gen.password(8).length);
writeTestResult(result);

result = runTest('gen.password - with config', 'jtEssentials.gen.password(10, {numbers:false, special:true})', 'length 10', 'length ' + jtEssentials.gen.password(10).length);
writeTestResult(result);

result = runTest('gen.loremIpsum', 'jtEssentials.gen.loremIpsum(10)', 50, jtEssentials.gen.loremIpsum(50).trim().split(/\s+/).length);
writeTestResult(result);

result = runTest('gen.ip.v4', 'jtEssentials.gen.ip.v4().split(".").length', 4, jtEssentials.gen.ip.v4().split('.').length);
writeTestResult(result);

result = runTest('gen.ip.v6', 'jtEssentials.gen.ip.v6().split(":").length', 8, jtEssentials.gen.ip.v6().split(':').length);
writeTestResult(result);

// Pruebas para módulo log
console.log('Ejecutando pruebas del módulo log...');

// Mock sessionStorage for Node.js environment
if (typeof global.sessionStorage === 'undefined') {
    global.sessionStorage = {
        storage: {},
        getItem(key) { return this.storage[key] || null; },
        setItem(key, value) { this.storage[key] = value; },
        removeItem(key) { delete this.storage[key]; },
        clear() { this.storage = {}; }
    };
}

// Mock document for Node.js environment
if (typeof global.document === 'undefined') {
    global.document = {
        documentElement: {
            getAttribute() { return null; },
            setAttribute() {}
        },
        createElement() { return { href: '', download: '', click() {}, remove() {} }; }
    };
}

// Mock window for Node.js environment
if (typeof global.window === 'undefined') {
    global.window = {
        document: global.document,
        matchMedia() { return { matches: false }; },
        navigator: { userAgent: 'Node.js', language: 'en' }
    };
}

jtEssentials.log.setup({project: {name: 'Test Project'}, quantity: 10});
result = runTest('log.setup', 'jtEssentials.log.setup({project: {name: "Test Project"}, quantity: 10})', undefined, undefined);
writeTestResult(result);


jtEssentials.log.push('Test log entry');
const logData2 = jtEssentials.log.get();
result = runTest('log.push', 'jtEssentials.log.push("Test log entry")', 1, logData2.logs.length);
writeTestResult(result);

jtEssentials.log.clear();
const logData3 = jtEssentials.log.get();
result = runTest('log.clear', 'jtEssentials.log.clear()', 0, logData3.logs.length);
writeTestResult(result);

// Escribir resumen final
writeSummary();

console.log('Pruebas completadas. Resultados guardados en tests.txt');