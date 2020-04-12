var fs = require('fs');
 
fs.unlink('target.zip', function (err) {
    if (err) throw err;
    console.log('Билд с версией функции успешно удален');
}); 