"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EC2ContainerProvider_1 = require("../../providers/EC2ContainerProvider");
const AbstractCommand_1 = require("../AbstractCommand");
class StopCommand extends AbstractCommand_1.default {
    run(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item || !(item instanceof EC2ContainerProvider_1.EC2ContainerItem)) {
                return null;
            }
            yield this.manager.client
                .stopInstances({
                InstanceIds: [item.instanceId]
            })
                .promise();
            this.manager.ec2Provider.refresh();
            while (yield this.manager.isInstanceInProgress(item.instanceId)) {
                yield new Promise(resolve => setTimeout(() => resolve(), 5000));
            }
            this.manager.ec2Provider.refresh();
        });
    }
    name() {
        return "awsconsole.ec2.stopContainer";
    }
}
exports.StopCommand = StopCommand;
//# sourceMappingURL=StopCommand.js.map