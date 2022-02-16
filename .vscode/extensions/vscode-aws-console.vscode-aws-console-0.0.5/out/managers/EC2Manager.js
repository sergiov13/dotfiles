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
const vscode = require("vscode");
const aws_sdk_1 = require("aws-sdk");
const AbstractManager_1 = require("./AbstractManager");
const ec2_1 = require("../commands/ec2");
const EC2ContainerProvider_1 = require("../providers/EC2ContainerProvider");
class EC2Manager extends AbstractManager_1.default {
    constructor() {
        super();
        this._client = new aws_sdk_1.EC2();
        this.commands = [
            new ec2_1.StartCommand(this),
            new ec2_1.StopCommand(this),
            new ec2_1.RefreshCommand(this),
            new ec2_1.CopyCommand(this)
        ];
        this.ec2Provider = new EC2ContainerProvider_1.EC2ContainerProvider(this);
        this.init();
        vscode.workspace.onDidChangeConfiguration(() => {
            this.init();
            this.ec2Provider.refresh();
        });
    }
    init() {
        const { region } = vscode.workspace.getConfiguration("awsconsole.ec2", null);
        this._client = new aws_sdk_1.EC2({ region });
    }
    get client() {
        return this._client;
    }
    register() {
        this.registerProviders();
        this.registerCommands();
    }
    registerProviders() {
        vscode.window.registerTreeDataProvider("aws_ec2_containers", this.ec2Provider);
    }
    registerCommands() {
        this.commands.forEach(command => {
            vscode.commands.registerCommand(command.name(), command.run.bind(command));
        });
    }
    isInstanceInProgress(instanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusCode = yield this.getInstanceStatusCode(instanceId);
            return [0, 32, 64].indexOf(statusCode) !== -1;
        });
    }
    getInstanceStatusCode(instanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Reservations } = (yield this.client
                .describeInstances({
                InstanceIds: [instanceId]
            })
                .promise());
            return Reservations[0].Instances[0].State.Code;
        });
    }
}
exports.default = EC2Manager;
//# sourceMappingURL=EC2Manager.js.map