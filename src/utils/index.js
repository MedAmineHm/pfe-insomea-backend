"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validLocationsNames = exports.executeCommand = void 0;
var child_process_1 = require("child_process");
var executeCommand = function (command) {
    try {
        var output = (0, child_process_1.execSync)(command, { encoding: 'utf-8' });
        return output;
    }
    catch (error) {
        console.error("Error executing command: ".concat(command), error);
        throw error;
    }
};
exports.executeCommand = executeCommand;
exports.validLocationsNames = [
    'eastus',
    'eastus2',
    'westus',
    'centralus',
    'northcentralus',
    'southcentralus',
    'northeurope',
    'westeurope',
    'eastasia',
    'southeastasia',
    'japaneast',
    'japanwest',
    'australiaeast',
    'australiasoutheast',
    'australiacentral',
    'brazilsouth',
    'southindia',
    'centralindia',
    'westindia',
    'canadacentral',
    'canadaeast',
    'westus2',
    'westcentralus',
    'uksouth',
    'ukwest',
    'koreacentral',
    'koreasouth',
    'francecentral',
    'southafricanorth',
    'uaenorth',
    'switzerlandnorth',
    'germanywestcentral',
    'norwayeast',
    'jioindiawest',
    'westus3',
    'swedencentral',
    'qatarcentral',
    'polandcentral',
    'italynorth',
    'israelcentral',
];
