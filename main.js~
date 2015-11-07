define(function(require, exports, module) {
    "use strict";

    var EditorManager = brackets.getModule('editor/EditorManager'),
        CommandManager = brackets.getModule("command/CommandManager"),
        DocumentManager = brackets.getModule('document/DocumentManager'),
        Menus = brackets.getModule("command/Menus"),
        GFT_CMD_ID = "goCommands.runfmt",
        GO_RUN_ID = "goCommands.run",
        GO_TOGGLE_CASE = "goCommands.togglecase",
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        NodeConnection = brackets.getModule("utils/NodeConnection"),
        PanelManager = brackets.getModule('view/PanelManager'), // PanelManager
        AppInit = brackets.getModule("utils/AppInit");
    var node = new NodeConnection();

var CMD_INSERT_CHAR="goCommands.insertchar";

    function getSelectedText() {
        return EditorManager.getActiveEditor().getSelectedText();
    }
    var panelHTML = $(require('text!res/mainToolbar.html'));
    var mainToolbar;

    function replaceActiveSelection(str) {
        EditorManager.getActiveEditor()._codeMirror.replaceSelection(str);
        EditorManager.getActiveEditor();
        EditorManager.focusEditor();
    }
    CommandManager.register("Toggle Case", GO_TOGGLE_CASE, function() {

        var str = getSelectedText();
        if (str) {
            var codeZ = "Z".charAt(0);
            var codeS = str.trim().charAt(0);
            if (codeS > codeZ) {
                replaceActiveSelection(str.toUpperCase())
            } else {
                replaceActiveSelection(str.toLowerCase())

            }
        };



    })
    CommandManager.register("Format Go File", GFT_CMD_ID, function() {
        var currentDocument = DocumentManager.getCurrentDocument();
        //callback(Object.keys(node.domains.goCommands).join("\n"))
        node.domains.goCommands.formatFile(currentDocument.file._path).done(function(datas) {
            var editor = EditorManager.getFocusedEditor();
            var v = "";
            datas.split("\n").forEach(function(l) {
                if (l.trim()) {
                    v += l + "\n";
                };

            })

            var f = "// go run " + currentDocument.file._path;
            if (!/ go run /.test(v)) {
                v += "\n" + f;
            };

            editor.document.setText(v);
        }).fail(function(v) {
            var editor = EditorManager.getFocusedEditor();
            editor.document.setText(v);

        })

    });
    CommandManager.register("Command Line", GO_RUN_ID, function() {
        var currentDocument = DocumentManager.getCurrentDocument();
        node.domains.goCommands.openTerminal(currentDocument.file._path)
    })
    CommandManager.register("：", CMD_INSERT_CHAR, function() {
             var str = '：'
            replaceActiveSelection(str)
    })
    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    contextMenu.addMenuItem(GFT_CMD_ID);
    contextMenu.addMenuItem(GO_RUN_ID);
    contextMenu.addMenuItem(GO_TOGGLE_CASE);


    if (!node.domains.goCommands) {
        node.connect(true).done(function() {
            var path = ExtensionUtils.getModulePath(module, 'node/fmt.js');
            node.loadDomains([path], true).done(function() {});
        });
    } else {

    }
    AppInit.appReady(function() {

        mainToolbar = PanelManager.createBottomPanel('david5i6.bracketsgoide.mainToolbar.panel', panelHTML, 32);
        mainToolbar.show();

        $('#md-code').click(function() {
            var str = '`' + getSelectedText().trim() + '`'
            replaceActiveSelection(str)
        });
        $('#md-pre').click(function() {
            var str = '```\n' + getSelectedText() + '\n```'
            replaceActiveSelection(str)
        })

    });

});
