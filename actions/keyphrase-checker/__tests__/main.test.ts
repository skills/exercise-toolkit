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

  describe("Text-File Input Tests", () => {
    test("finds correct number of occurrences and passes when above minimum", async () => {
      // Setup mocks
      (core.getInput as jest.Mock).mockImplementation((name: string) => {
        switch (name) {
          case "text-file":
            return "test-file.txt";
          case "text":
            return "";
          case "keyphrase":
            return "test";
          case "minimum_occurences":
            return "2";
          case "case-sensitive":
            return "true";
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
          case "text-file":
            return "test-file.txt";
          case "text":
            return "";
          case "keyphrase":
            return "missing";
          case "minimum_occurences":
            return "2";
          case "case-sensitive":
            return "true";
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
          case "text-file":
            return "non-existent-file.txt";
          case "text":
            return "";
          case "keyphrase":
            return "test";
          case "case-sensitive":
            return "true";
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
  });

  describe("Direct Text Input Tests", () => {
    test("finds correct number of occurrences in direct text", async () => {
      // Setup mocks
      (core.getInput as jest.Mock).mockImplementation((name: string) => {
        switch (name) {
          case "text-file":
            return "";
          case "text":
            return "This is a test string with test content for testing.";
          case "keyphrase":
            return "test";
          case "minimum_occurences":
            return "2";
          case "case-sensitive":
            return "true";
          default:
            return "";
        }
      });

      // Run the action
      await run();

      // Check if the correct outputs were set
      expect(core.setOutput).toHaveBeenCalledWith("occurences", 3);
      expect(core.setFailed).not.toHaveBeenCalled();
      expect(core.info).toHaveBeenCalledWith(expect.stringContaining("Success"));
    });

    test("fails when occurrences in direct text are below minimum", async () => {
      // Setup mocks
      (core.getInput as jest.Mock).mockImplementation((name: string) => {
        switch (name) {
          case "text-file":
            return "";
          case "text":
            return "This text does not contain the required phrase.";
          case "keyphrase":
            return "missing";
          case "minimum_occurences":
            return "2";
          case "case-sensitive":
            return "true";
          default:
            return "";
        }
      });

      // Run the action
      await run();

      // Check if failure was triggered
      expect(core.setOutput).toHaveBeenCalledWith("occurences", 0);
      expect(core.setFailed).toHaveBeenCalledWith(
        expect.stringContaining("Expected at least 2 occurrences")
      );
    });
  });

  describe("Case Sensitivity Tests", () => {
    test("respects case sensitivity when enabled", async () => {
      // Setup mocks
      (core.getInput as jest.Mock).mockImplementation((name: string) => {
        switch (name) {
          case "text-file":
            return "";
          case "text":
            return "Test TEST test Test";
          case "keyphrase":
            return "test";
          case "minimum_occurences":
            return "2";
          case "case-sensitive":
            return "true";
          default:
            return "";
        }
      });

      // Run the action
      await run();

      // Should only find "test" (lowercase) once, so it should fail
      expect(core.setOutput).toHaveBeenCalledWith("occurences", 1);
      expect(core.setFailed).toHaveBeenCalledWith(
        expect.stringContaining("Expected at least 2 occurrences")
      );
    });

    test("ignores case when case sensitivity is disabled", async () => {
      // Setup mocks
      (core.getInput as jest.Mock).mockImplementation((name: string) => {
        switch (name) {
          case "text-file":
            return "";
          case "text":
            return "Test TEST test Test";
          case "keyphrase":
            return "test";
          case "minimum_occurences":
            return "2";
          case "case-sensitive":
            return "false";
          default:
            return "";
        }
      });

      // Run the action
      await run();

      // Should find all 4 occurrences regardless of case
      expect(core.setOutput).toHaveBeenCalledWith("occurences", 4);
      expect(core.setFailed).not.toHaveBeenCalled();
    });
  });

  describe("Input Validation Tests", () => {
    test("fails when both text and text-file inputs are provided", async () => {
      // Setup mocks
      (core.getInput as jest.Mock).mockImplementation((name: string) => {
        switch (name) {
          case "text-file":
            return "some-file.txt";
          case "text":
            return "Some text";
          case "keyphrase":
            return "test";
          default:
            return "";
        }
      });

      // Run the action
      await run();

      // Check that it fails with the correct error message
      expect(core.setFailed).toHaveBeenCalledWith(
        expect.stringContaining("Exactly one of 'text-file' or 'text' inputs must be provided")
      );
    });

    test("fails when neither text nor text-file inputs are provided", async () => {
      // Setup mocks
      (core.getInput as jest.Mock).mockImplementation((name: string) => {
        switch (name) {
          case "text-file":
            return "";
          case "text":
            return "";
          case "keyphrase":
            return "test";
          default:
            return "";
        }
      });

      // Run the action
      await run();

      // Check that it fails with the correct error message
      expect(core.setFailed).toHaveBeenCalledWith(
        expect.stringContaining("Exactly one of 'text-file' or 'text' inputs must be provided")
      );
    });
  });

  test("uses default minimum occurrences when not specified", async () => {
    // Setup mocks
    (core.getInput as jest.Mock).mockImplementation((name: string) => {
      switch (name) {
        case "text-file":
          return "test-file.txt";
        case "text":
          return "";
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
