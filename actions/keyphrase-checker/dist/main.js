"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
/**
 * Main function for the GitHub Action
 */
async function run() {
    try {
        // Get inputs from action definition
        const textFile = core.getInput("text-file", { required: false });
        const text = core.getInput("text", { required: false });
        const keyphrase = core.getInput("keyphrase", { required: true });
        const caseSensitive = core.getBooleanInput("case-sensitive", { required: true });
        const minimumOccurences = parseInt(core.getInput("minimum_occurences", { required: true }));
        // Check that exactly one of text or textFile is provided
        if ((!textFile && !text) || (textFile && text)) {
            core.setFailed("Exactly one of 'text-file' or 'text' inputs must be provided");
            return;
        }
        let contentToCheck;
        // Get content based on which input was provided
        if (textFile) {
            // Check if file exists
            if (!fs.existsSync(textFile)) {
                core.setFailed(`File does not exist: ${textFile}`);
                return;
            }
            // Read file content
            contentToCheck = fs.readFileSync(textFile, "utf8");
        }
        else {
            // Use the provided text content
            contentToCheck = text;
        }
        // Create regex for the keyphrase with case sensitivity option
        const regexFlags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(keyphrase, regexFlags);
        const matches = contentToCheck.match(regex);
        const occurences = matches ? matches.length : 0;
        // Set the count as an output
        core.setOutput("occurences", occurences);
        // Log the results for easier debugging
        core.info(`Found ${occurences} occurrences of "${keyphrase}" ${caseSensitive ? "(case-sensitive)" : "(case-insensitive)"} in ${textFile ? textFile : "provided text"}`);
        // Check if the minimum requirement is met
        if (occurences < minimumOccurences) {
            core.setFailed(`Expected at least ${minimumOccurences} occurrences of "${keyphrase}", but found only ${occurences}`);
        }
        else {
            core.info(`✅ Success! Found ${occurences} occurrences (minimum required: ${minimumOccurences})`);
        }
    }
    catch (error) {
        // Handle any uncaught errors
        core.setFailed(`Action failed with error: ${error instanceof Error ? error.message : String(error)}`);
    }
}
// Call the main function
run();
