import jtEssentials from './dist/index.js';

const config = {
    project: {
        name: 'Test',
        version: '1.0.0',
        environment: 'test'
    },
    data: {
        encrypt: false,
        key: ''
    },
    debug: {
        cnsl: false,
        log: false,
        strg: false,
        obsv: false
    }
};

const lib = new jtEssentials(config);
console.log('ES module import successful:', lib.data ? 'Yes' : 'No');

// Test reactive system
const watcher = lib.strg.watch('testStore', 'test');
watcher.subscribe((data) => {
    console.log('Watcher callback:', data);
});
console.log('Watcher created successfully');