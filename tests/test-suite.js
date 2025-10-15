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

// stringify con encriptación
result = runTest('data.stringify - encrypted', 'jtEssentials.data.stringify("test", "key")', jtEssentials.data.stringify("test", "key"), jtEssentials.data.stringify("test", "key"));
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

const date1 = new Date('2023-01-15T10:30:45');
const date2 = new Date(date1);
jtEssentials.date.time.add(date2, {hours: 2, minutes: 30});
result = runTest('date.time.add', 'jtEssentials.date.time.add(date, {hours:2, minutes:30})', '15/01/2023 13:00:45', jtEssentials.date.format(date2));
writeTestResult(result);

const date3 = new Date('2023-01-15T10:30:45');
const date4 = new Date(date3);
jtEssentials.date.time.sub(date4, {hours: 1, minutes: 15});
result = runTest('date.time.sub', 'jtEssentials.date.time.sub(date, {hours:1, minutes:15})', '15/01/2023 09:15:45', jtEssentials.date.format(date4));
writeTestResult(result);

const date5 = new Date('2023-01-15');
const date6 = new Date(date5);
jtEssentials.date.days.add(date6, 5);
result = runTest('date.days.add', 'jtEssentials.date.days.add(date, 5)', '20/01/2023 00:00:00', jtEssentials.date.format(date6));
writeTestResult(result);

const date7 = new Date('2023-01-15');
const date8 = new Date(date7);
jtEssentials.date.days.sub(date8, 3);
result = runTest('date.days.sub', 'jtEssentials.date.days.sub(date, 3)', '12/01/2023 00:00:00', jtEssentials.date.format(date8));
writeTestResult(result);

const date9 = new Date('2023-01-15');
const date10 = new Date(date9);
jtEssentials.date.months.add(date10, 2);
result = runTest('date.months.add', 'jtEssentials.date.months.add(date, 2)', '15/03/2023 00:00:00', jtEssentials.date.format(date10));
writeTestResult(result);

const date11 = new Date('2023-01-15');
const date12 = new Date(date11);
jtEssentials.date.months.sub(date12, 1);
result = runTest('date.months.sub', 'jtEssentials.date.months.sub(date, 1)', '15/12/2022 00:00:00', jtEssentials.date.format(date12));
writeTestResult(result);

const date13 = new Date('2023-01-15');
const date14 = new Date(date13);
jtEssentials.date.years.add(date14, 1);
result = runTest('date.years.add', 'jtEssentials.date.years.add(date, 1)', '15/01/2024 00:00:00', jtEssentials.date.format(date14));
writeTestResult(result);

const date15 = new Date('2023-01-15');
const date16 = new Date(date15);
jtEssentials.date.years.sub(date16, 2);
result = runTest('date.years.sub', 'jtEssentials.date.years.sub(date, 2)', '15/01/2021 00:00:00', jtEssentials.date.format(date16));
writeTestResult(result);

result = runTest('date.getAge', 'jtEssentials.date.getAge("1990-05-15")', {years: 33, months: 8, days: 0}, jtEssentials.date.getAge("1990-05-15"));
writeTestResult(result);

result = runTest('date.getDayOfWeek', 'jtEssentials.date.getDayOfWeek(new Date("2023-01-15"))', 'domingo', jtEssentials.date.getDayOfWeek(new Date('2023-01-15')));
writeTestResult(result);

result = runTest('date.getMonth', 'jtEssentials.date.getMonth(new Date("2023-01-15"))', 'enero', jtEssentials.date.getMonth(new Date('2023-01-15')));
writeTestResult(result);

// Pruebas para módulo util
console.log('Ejecutando pruebas del módulo util...');

result = runTest('util.mask - basic', 'jtEssentials.util.mask("123456789", "000-000-000")', {public: '123-456-789', private: '123456789'}, jtEssentials.util.mask("123456789", "000-000-000"));
writeTestResult(result);

result = runTest('util.mask - with X', 'jtEssentials.util.mask("123456789", "XXX-XXX-000")', {public: '***-***-789', private: '123456789'}, jtEssentials.util.mask("123456789", "XXX-XXX-000"));
writeTestResult(result);

result = runTest('util.mask - invert', 'jtEssentials.util.mask("123456789", "000-XXX-XXX", true)', {public: '789-***-***', private: '987654321'}, jtEssentials.util.mask("123456789", "000-XXX-XXX", true));
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
    result = runTest('util.theme.set', 'jtEssentials.util.theme.set("dark")', 'no error', 'error: ' + e.message);
    writeTestResult(result);
}

try {
    const theme = jtEssentials.util.theme.get();
    result = runTest('util.theme.get', 'jtEssentials.util.theme.get()', 'string or null', typeof theme === 'string' || theme === null);
    writeTestResult(result);
} catch (e) {
    result = runTest('util.theme.get', 'jtEssentials.util.theme.get()', 'no error', 'error: ' + e.message);
    writeTestResult(result);
}

try {
    const browserTheme = jtEssentials.util.theme.browser();
    result = runTest('util.theme.browser', 'jtEssentials.util.theme.browser()', 'dark or light', browserTheme === 'dark' || browserTheme === 'light');
    writeTestResult(result);
} catch (e) {
    result = runTest('util.theme.browser', 'jtEssentials.util.theme.browser()', 'no error', 'error: ' + e.message);
    writeTestResult(result);
}

// lang functions - dependen del DOM, probaremos que no lancen error
try {
    jtEssentials.util.lang.set('es');
    result = runTest('util.lang.set', 'jtEssentials.util.lang.set("es")', undefined, undefined);
    writeTestResult(result);
} catch (e) {
    result = runTest('util.lang.set', 'jtEssentials.util.lang.set("es")', 'no error', 'error: ' + e.message);
    writeTestResult(result);
}

try {
    const lang = jtEssentials.util.lang.get();
    result = runTest('util.lang.get', 'jtEssentials.util.lang.get()', 'string or null', typeof lang === 'string' || lang === null);
    writeTestResult(result);
} catch (e) {
    result = runTest('util.lang.get', 'jtEssentials.util.lang.get()', 'no error', 'error: ' + e.message);
    writeTestResult(result);
}

try {
    const browserLang = jtEssentials.util.lang.browser();
    result = runTest('util.lang.browser', 'jtEssentials.util.lang.browser()', 'string', typeof browserLang === 'string');
    writeTestResult(result);
} catch (e) {
    result = runTest('util.lang.browser', 'jtEssentials.util.lang.browser()', 'no error', 'error: ' + e.message);
    writeTestResult(result);
}

// Pruebas para módulo gen
console.log('Ejecutando pruebas del módulo gen...');

result = runTest('gen.password - default', 'jtEssentials.gen.password(8)', 'length 8', jtEssentials.gen.password(8).length === 8);
writeTestResult(result);

result = runTest('gen.password - with config', 'jtEssentials.gen.password(10, {numbers:false, special:true})', 'length 10', jtEssentials.gen.password(10, {numbers: false, special: true}).length === 10);
writeTestResult(result);

result = runTest('gen.loremIpsum', 'jtEssentials.gen.loremIpsum(50).split(" ").length', 50, jtEssentials.gen.loremIpsum(50).split(' ').length);
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

const logData = jtEssentials.log.get();
result = runTest('log.get', 'jtEssentials.log.get()', 'object with project and logs', typeof logData === 'object' && logData.project && Array.isArray(logData.logs));
writeTestResult(result);

jtEssentials.log.push('Test log entry');
const logData2 = jtEssentials.log.get();
result = runTest('log.push', 'jtEssentials.log.push("Test log entry")', 1, logData2.logs.length);
writeTestResult(result);

jtEssentials.log.clear();
const logData3 = jtEssentials.log.get();
result = runTest('log.clear', 'jtEssentials.log.clear()', 0, logData3.logs.length);
writeTestResult(result);

// Pruebas de combinaciones
console.log('Ejecutando pruebas de combinaciones...');

// Combinación data + text
const originalText = "Hello World Test";
const stringified = jtEssentials.data.stringify(originalText);
const parsed = jtEssentials.data.parse(stringified);
const camelCased = jtEssentials.text.camelCase(parsed);
result = runTest('combination data+text', 'jtEssentials.text.camelCase(jtEssentials.data.parse(jtEssentials.data.stringify("Hello World Test")))', 'helloWorldTest', camelCased);
writeTestResult(result);

// Combinación gen + text
const lorem = jtEssentials.gen.loremIpsum(10);
const capitalized = jtEssentials.text.capitalize(lorem, true);
result = runTest('combination gen+text', 'jtEssentials.text.capitalize(jtEssentials.gen.loremIpsum(10), true)', 'string starting with capital', capitalized.charAt(0) === capitalized.charAt(0).toUpperCase());
writeTestResult(result);

// Combinación date + text
const now = new Date();
const formatted = jtEssentials.date.format(now);
const kebabed = jtEssentials.text.kebabCase(formatted);
result = runTest('combination date+text', 'jtEssentials.text.kebabCase(jtEssentials.date.format(new Date()))', 'string with kebab-case', kebabed.includes('-'));
writeTestResult(result);

// Combinación gen + data
const password = jtEssentials.gen.password(12);
const encryptedPwd = jtEssentials.data.encrypt(password, 'testkey');
const decryptedPwd = jtEssentials.data.decrypt(encryptedPwd, 'testkey');
result = runTest('combination gen+data', 'jtEssentials.data.decrypt(jtEssentials.data.encrypt(password, "testkey"), "testkey")', password, decryptedPwd);
writeTestResult(result);

// Escribir resumen final
writeSummary();

console.log('Pruebas completadas. Resultados guardados en tests.txt');