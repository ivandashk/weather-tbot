var file_system = require('fs');
var archiver = require('archiver');

var output = file_system.createWriteStream('target.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('Билд с новой версией функции успешно заархивирован');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);
archive.directory('src/', false);
archive.finalize();