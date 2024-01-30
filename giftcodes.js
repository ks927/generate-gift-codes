const fs = require('fs');

// add error handling
// add the zip step
const generate = {
    todayFormatted: '',
    fileCount: 1,
    arr: [],

    init: () => {
        generate.createDirectory();
        generate.createCodes();
    },

    createDirectory: () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        generate.todayFormatted = `${mm}-${dd}-${yyyy}`;

        fs.mkdirSync(generate.todayFormatted, 0o776);
    },

    createCodes: () => {
        const numberOfBatches = process.argv[2];
        const codesPerBatch = process.argv[3];
        const totalCodes = numberOfBatches * codesPerBatch;
        const tryAgain = 0;
        let codeHolder = '';

        // generates numberOfBatches of codesPerBatch
        for (i = 1; i <= totalCodes; i++) {
            let code = generate.uniqueCode();
            codeHolder += code;

            if (i % codesPerBatch === 0) {
                if (i === totalCodes) {
                    console.log('tryagain count', tryAgain);
                }
                generate.writeToFile(codeHolder);
                generate.fileCount++;
                codeHolder = ''
            }
        }
    },

    uniqueCode: () => {
        const prefix = process.argv[4] ?? 'H';
        const code = prefix + Math.floor(Math.random() * 1000000000) + '\n';
        
        // check for duplicates
        if (!generate.arr?.includes(code)) {
            generate.arr.push(code);
            return code;
        } else {
            tryAgain++;
            uniqueCode();
        }
    },

    writeToFile: (code) => {
        fs.writeFile(`./${generate.todayFormatted}/batch_${generate.fileCount}.txt`, code, function (err) {
            if (err) throw err;
        });
    },

}

generate.init();



