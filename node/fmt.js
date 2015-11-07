(function() {

    var child_process = require('child_process');
    var spawn = require('child_process').spawn;
    var path = require("path");
    exports.init = function(domainManager) {
        if (!domainManager.hasDomain("goCommands")) {
            domainManager.registerDomain("goCommands", {
                major: 1,
                minor: 0
            });
        }
        domainManager.registerCommand('goCommands', 'formatFile', formatFile, true);
        domainManager.registerCommand('goCommands', 'runGoFile', runGoFile, true);
        domainManager.registerCommand('goCommands', 'openTerminal', openTerminal, true);

    };

    function formatFile(filePath, callback) {
        var command = 'gofmt "' + filePath + '"';
        child_process.exec(command, function(err, stdout, stderr) {
            callback(null, stderr + stdout);
        });
    }

    function runGoFile(filePath, callback) {
        var command = 'go run "' + filePath + '"';
        child_process.exec(command, function(err, stdout, stderr) {
            callback(null, stderr + stdout);
        });

    }

    function killSelf() {
        //killall -v Brackets
    }


    function openTerminal(filePath) {
        var command = "cd " + path.dirname(filePath) + "&& gnome-terminal"
        child_process.exec(command, null);
    }
}());
