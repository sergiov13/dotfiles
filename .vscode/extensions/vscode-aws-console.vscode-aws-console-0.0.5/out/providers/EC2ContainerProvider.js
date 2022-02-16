"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class EC2ContainerProvider {
    constructor(manager) {
        this.manager = manager;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element && element instanceof EC2ContainerItem) {
            return Promise.resolve(element.getDetailTreeItems());
        }
        else if (element) {
            return Promise.resolve([]);
        }
        return this.manager.client
            .describeInstances({})
            .promise()
            .then(response => {
            if (!response.Reservations || !response.Reservations.length) {
                return [];
            }
            const items = [];
            response.Reservations.forEach(reservation => {
                if (reservation &&
                    reservation.Instances &&
                    reservation.Instances.length) {
                    reservation.Instances.forEach(instance => {
                        items.push(new EC2ContainerItem(instance));
                    });
                }
                return null;
            });
            return items;
        });
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
}
exports.EC2ContainerProvider = EC2ContainerProvider;
class EC2ContainerItem extends vscode.TreeItem {
    constructor(instance) {
        super("", vscode.TreeItemCollapsibleState.Collapsed);
        this.instance = instance;
        this.label = this.getLabel();
        if (this.instance.State && this.instance.State.Name === "stopped") {
            this.contextValue = "stopped_container";
        }
        else if (this.instance.State &&
            this.instance.State.Name === "running") {
            this.contextValue = "running_container";
        }
        else {
        }
    }
    getLabel() {
        const nameTag = this.tags["Name"];
        const instanceId = this.instance.InstanceId;
        let prefix = "";
        if (this.instance.State && this.instance.State.Name) {
            prefix = `${this.instance.State.Name}`;
        }
        if (nameTag && instanceId) {
            return `[${prefix}] ${nameTag} - ${instanceId}`;
        }
        else if (instanceId) {
            return `[${prefix}] ${instanceId}`;
        }
        else {
            return "none";
        }
    }
    get tags() {
        return (this.instance.Tags || []).reduce((tags, tagItem) => {
            tags[tagItem.Key || "none"] = tagItem.Value || "";
            return tags;
        }, {});
    }
    get instanceId() {
        return this.instance.InstanceId || "";
    }
    getDetailTreeItems() {
        return [
            "ImageId",
            "InstanceId",
            "InstanceType",
            "KeyName",
            "LaunchTime",
            "PrivateDnsName",
            "PrivateIpAddress",
            "PublicDnsName",
            "PublicIpAddress",
            "SubnetId",
            "VpcId",
            "Architecture",
            "ClientToken"
        ].map(name => {
            const value = this.instance[name];
            const item = new vscode.TreeItem(`${name} : ${value}`);
            item.contextValue = "detail_item";
            return item;
        });
    }
}
exports.EC2ContainerItem = EC2ContainerItem;
//# sourceMappingURL=EC2ContainerProvider.js.map