exports.command = async function() {
    var client = this;

    const weHaveFailures = client.currentTest.results.failed > 0 || client.currentTest.results.errors > 0;
    if (weHaveFailures){
        let dialog = require('dialog');
        let beep = require('beepbeep');
        beep();
        console.error(`Exception: ${client.currentTest.results.lastError.message}\n${client.currentTest.results.lastError.stack}\n${client.currentTest.results.lastError.detailedErr}`);
        dialog.info(`Error in test: ${client.currentTest.name}\nPlease check logs and browser window!`, 'NightwatchJS Tests', function(exitCode) {
            if (exitCode == 0) {
                client.globals.debugMsg(`Error in test: ${client.currentTest.name} Please check logs and browser window!`);
            }
        });		
    } else{
        client.end();
    }

};