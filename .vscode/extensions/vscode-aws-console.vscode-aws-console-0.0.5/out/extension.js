"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const EC2Manager_1 = require("./managers/EC2Manager");
function activate(context) {
    vscode.workspace.onDidChangeConfiguration(() => { });
    const ec2Manager = new EC2Manager_1.default();
    ec2Manager.register();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map