/** generate 2000 unique codes in bunches of 50.
 * codes must begin with G followed by 8 num
 */
var fs = require('fs');

var count = 1,
tryAgain = 0;
str = '',
arr = [];

function uniqueCode() {
    var code = 'G' + Math.floor(Math.random() * 1000000000) + '\n';
    
    if (!arr.includes(code)) {
        arr.push(code);
        return code;
    } else {
        tryAgain++;
        uniqueCode();
    }

}

for (i=1; i<=2000; i++) {
    code = uniqueCode();
    str += code

    if (i % 50 === 0) {
        if (i === 2000) {
            console.log('tryagain count', tryAgain)
        }
        fs.writeFile('./GiftCodes/file_' + count + '.txt', str, function (err) {
            if (err) throw err;
        });
        count++;
        str = ''
    }
}

