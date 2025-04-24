import * as core from "@actions/core";
import * as fs from "fs";

/**
 * Main function for the GitHub Action
 */
async function run(): Promise<void> {
  try {
    // Get inputs from action definition
    const filePath: string = core.getInput("file", { required: true });
    const keyphrase: string = core.getInput("keyphrase", { required: true });
    const minimumOccurences: number = parseInt(
      core.getInput("minimum_occurences", { required: false }) || "1",
      10
    );

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      core.setFailed(`File does not exist: ${filePath}`);
      return;
    }

    // Read file content
    const fileContent: string = fs.readFileSync(filePath, "utf8");

    // Count occurrences of keyphrase
    const regex: RegExp = new RegExp(keyphrase, "g");
    const matches: string[] | null = fileContent.match(regex);
    const occurences: number = matches ? matches.length : 0;

    // Set the count as an output
    core.setOutput("occurences", occurences);

    // Log the results for easier debugging
    core.info(`Found ${occurences} occurrences of "${keyphrase}" in ${filePath}`);

    // Check if the minimum requirement is met
    if (occurences < minimumOccurences) {
      core.setFailed(
        `Expected at least ${minimumOccurences} occurrences of "${keyphrase}", but found only ${occurences}`
      );
    } else {
      core.info(
        `✅ Success! Found ${occurences} occurrences (minimum required: ${minimumOccurences})`
      );
    }
  } catch (error) {
    // Handle any uncaught errors
    core.setFailed(
      `Action failed with error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

// Call the main function
run();

// Export for testing
export { run };
