"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCommand_1 = require("../AbstractCommand");
const vscode = require("vscode");
const clipboardy_1 = require("clipboardy");
class CopyCommand extends AbstractCommand_1.default {
    run(item) {
        if (!item || !(item instanceof vscode.TreeItem)) {
            return null;
        }
        const items = (item.label || "").split(":").map(v => v.trim());
        if (items.length === 2) {
            clipboardy_1.writeSync(items[1]);
            vscode.window.showInformationMessage("Copied to clipboard");
        }
    }
    name() {
        return "awsconsole.ec2.copyItemValue";
    }
}
exports.CopyCommand = CopyCommand;
//# sourceMappingURL=CopyCommand.js.map