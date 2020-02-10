exports.command = async function() {
    var client = this;

    var weHaveFailures = client.currentTest.results.failed > 0 || client.currentTest.results.errors > 0;
    var fileName = client.currentTest.module + '/' + client.currentTest.name;
    fileName = fileName.replace(/\s/g, '-').replace(/"|'/g, '').replace(/\\/g, '/');
    
    if (weHaveFailures) {
        client.globals.debugMsg(`Error occured! Errors: ${client.currentTest.results.lastError.message} Failed: ${client.currentTest.results.stackTrace}`);
        let result = await client.saveScreenshot(client.screenshotsPath + '/failed/' + fileName + '.png',)
            if (!result){
                client.globals.debugMsg('Error saving screenshot...', result);
            }
    } else {
        let result = await client.saveScreenshot(client.screenshotsPath + '/success/' + fileName + '.png');
        if (!result) {
            client.globals.debugMsg(`Error saving screenshot... ${result}`);
        }
    }
};