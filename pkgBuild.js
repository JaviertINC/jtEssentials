const fs = require('fs');
const path = require('path');

try {
    const distPath = path.resolve(process.cwd(), 'dist');
    const pkgOrigin = require(path.resolve(process.cwd(), 'package.json'));
    const pkgResult = {};

    const fieldsToKeep = [
        'name',
        'version',
        'description',
        'author',
        'homepage',
        'repository',
        'keywords',
        'license',
        'main',
        'dependencies'
    ];

    fieldsToKeep.forEach(field => {
        if (pkgOrigin[field] !== undefined) {
            pkgResult[field] = pkgOrigin[field];
        }
    });

    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }

    fs.writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(pkgResult, null, 2), 'utf8');
} catch (error) {
    console.error('❌ Error al replicar package.json:', error.message);
    process.exit(1);
}