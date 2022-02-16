"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCommand_1 = require("../AbstractCommand");
class RefreshCommand extends AbstractCommand_1.default {
    run() {
        this.manager.ec2Provider.refresh();
    }
    name() {
        return "awsconsole.ec2.refreshContainers";
    }
}
exports.RefreshCommand = RefreshCommand;
//# sourceMappingURL=RefreshCommand.js.map