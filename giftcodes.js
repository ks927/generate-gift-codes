var fs = require('fs');
var count = 1,
tryAgain = 0;
str = '',
arr = [],
// batchCount / codeCount = # of codes per batch
codeCount = 2000,
batchCount = 40;

// current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = `${mm}-${dd}-${yyyy}`

fs.mkdirSync(today, 0o776);

function uniqueCode() {
    var code = 'Y' + Math.floor(Math.random() * 1000000000) + '\n';
    
    if (!arr.includes(code)) {
        arr.push(code);
        return code;
    } else {
        tryAgain++;
        uniqueCode();
    }
}
// generates 40 batches of 50
for (i=1; i<=2000; i++) {
    code = uniqueCode();
    str += code
    if (i % 50 === 0) {
        if (i === 2000) {
            console.log('tryagain count', tryAgain)
        }
        fs.writeFile(`./${today}/file_${count}.txt`, str, function (err) {
            if (err) throw err;
        });
        count++;
        str = ''
    }
}
// generates 3 batches of 200
// for (i=1; i<=300; i++) {
//     code = uniqueCode();
//     str += code
//     if (i % 100 === 0) {
//         if (i === 300) {
//             console.log('tryagain count', tryAgain)
//         }
//         fs.writeFile(`./${today}/file_${count}.txt`, str, function (err) {
//             if (err) throw err;
//         });
//         count++;
//         str = ''
//     }
// }