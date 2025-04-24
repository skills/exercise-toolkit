import * as core from "@actions/core";
import * as fs from "fs";
import { run } from "../src/main";

// Mock the GitHub Actions core library
jest.mock("@actions/core");

// Mock the fs module
jest.mock("fs", () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

describe("Keyphrase Checker Action", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  test("finds correct number of occurrences and passes when above minimum", async () => {
    // Setup mocks
    (core.getInput as jest.Mock).mockImplementation((name: string) => {
      switch (name) {
        case "file":
          return "test-file.txt";
        case "keyphrase":
          return "test";
        case "minimum_occurences":
          return "2";
        default:
          return "";
      }
    });

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      "This is a test file with test content for testing."
    );

    // Run the action
    await run();

    // Check if the correct outputs were set
    expect(core.setOutput).toHaveBeenCalledWith("occurences", 3);
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.info).toHaveBeenCalledWith(expect.stringContaining("Success"));
  });

  test("fails when occurrences are below minimum", async () => {
    // Setup mocks
    (core.getInput as jest.Mock).mockImplementation((name: string) => {
      switch (name) {
        case "file":
          return "test-file.txt";
        case "keyphrase":
          return "missing";
        case "minimum_occurences":
          return "2";
        default:
          return "";
      }
    });

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      "This file does not contain the required phrase."
    );

    // Run the action
    await run();

    // Check if failure was triggered
    expect(core.setOutput).toHaveBeenCalledWith("occurences", 0);
    expect(core.setFailed).toHaveBeenCalledWith(
      expect.stringContaining("Expected at least 2 occurrences")
    );
  });

  test("fails when file does not exist", async () => {
    // Setup mocks
    (core.getInput as jest.Mock).mockImplementation((name: string) => {
      switch (name) {
        case "file":
          return "non-existent-file.txt";
        case "keyphrase":
          return "test";
        default:
          return "";
      }
    });

    (fs.existsSync as jest.Mock).mockReturnValue(false);

    // Run the action
    await run();

    // Check if failure was triggered due to missing file
    expect(core.setFailed).toHaveBeenCalledWith(expect.stringContaining("File does not exist"));
  });

  test("uses default minimum occurrences when not specified", async () => {
    // Setup mocks
    (core.getInput as jest.Mock).mockImplementation((name: string) => {
      switch (name) {
        case "file":
          return "test-file.txt";
        case "keyphrase":
          return "test";
        case "minimum_occurences":
          return ""; // Not providing minimum_occurences
        default:
          return "";
      }
    });

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue("This is a test file.");

    // Run the action
    await run();

    // Should pass with default minimum of 1
    expect(core.setOutput).toHaveBeenCalledWith("occurences", 1);
    expect(core.setFailed).not.toHaveBeenCalled();
  });
});
