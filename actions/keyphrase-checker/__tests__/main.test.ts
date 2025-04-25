import path from "path";

// Keep the mock for core actions
const mockCore = {
  getInput: jest.fn(),
  getBooleanInput: jest.fn(),
  setOutput: jest.fn(),
  setFailed: jest.fn(),
  startGroup: jest.fn(),
  endGroup: jest.fn(),
  info: jest.fn(),
};

jest.mock("@actions/core", () => mockCore);

import { run } from "../src/main";

describe("Keyphrase Checker Action", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("passes when text file has enough occurrences", async () => {
    // Get the path to the test file
    const testFilePath = path.join(__dirname, "test-two-occurrences.md");

    // Setup mocks
    mockCore.getInput.mockImplementation((name) => {
      switch (name) {
        case "text-file":
          return testFilePath;
        case "keyphrase":
          return "GitHub";
        case "minimum-occurences":
          return "2";
        default:
          return "";
      }
    });
    mockCore.getBooleanInput.mockReturnValue(true);

    // Run the action
    await run();

    // Check expectations
    expect(mockCore.setOutput).toHaveBeenCalledWith("occurences", 2);
    expect(mockCore.setFailed).not.toHaveBeenCalled();
  });

  test("fails when text file has fewer occurrences than required", async () => {
    // Get the path to the test file
    const testFilePath = path.join(__dirname, "test-two-occurrences.md");

    // Setup mocks
    mockCore.getInput.mockImplementation((name) => {
      switch (name) {
        case "text-file":
          return testFilePath;
        case "keyphrase":
          return "GitHub";
        case "minimum-occurences":
          return "3";
        default:
          return "";
      }
    });
    mockCore.getBooleanInput.mockReturnValue(true);

    // Run the action
    await run();

    // Check expectations
    expect(mockCore.setOutput).toHaveBeenCalledWith("occurences", 2);
    expect(mockCore.setFailed).toHaveBeenCalledWith(
      'Expected at least 3 occurrences of "GitHub", but found only 2'
    );
  });

  test("passes with direct text input having enough occurrences", async () => {
    // Setup mocks
    mockCore.getInput.mockImplementation((name) => {
      switch (name) {
        case "text":
          return "Hey @professortocat, I'm finished with my task";
        case "keyphrase":
          return "professortocat";
        case "minimum-occurences":
          return "1";
        default:
          return "";
      }
    });
    mockCore.getBooleanInput.mockReturnValue(true);

    // Run the action
    await run();

    // Check expectations
    expect(mockCore.setOutput).toHaveBeenCalledWith("occurences", 1);
    expect(mockCore.setFailed).not.toHaveBeenCalled();
  });

  test("handles case-insensitive search correctly", async () => {
    // Get the path to the test file with mixed case occurrences
    const testFilePath = path.join(__dirname, "test-mixed-case.md");

    // Setup mocks
    mockCore.getInput.mockImplementation((name) => {
      switch (name) {
        case "text-file":
          return testFilePath;
        case "keyphrase":
          return "GitHub";
        case "minimum-occurences":
          return "3";
        default:
          return "";
      }
    });
    mockCore.getBooleanInput.mockReturnValue(false);

    // Run the action
    await run();

    // Check expectations
    expect(mockCore.setOutput).toHaveBeenCalledWith("occurences", 3);
    expect(mockCore.setFailed).not.toHaveBeenCalled();
  });

  test("fails when file does not exist", async () => {
    const nonExistentFilePath = path.join(__dirname, "non-existent.md");

    // Setup mocks
    mockCore.getInput.mockImplementation((name) => {
      switch (name) {
        case "text-file":
          return nonExistentFilePath;
        case "keyphrase":
          return "GitHub";
        case "minimum-occurences":
          return "1";
        default:
          return "";
      }
    });
    mockCore.getBooleanInput.mockReturnValue(true);

    // Run the action
    await run();

    // Check expectations
    expect(mockCore.setFailed).toHaveBeenCalledWith(`File does not exist: ${nonExistentFilePath}`);
  });

  test("fails when neither text nor text-file is provided", async () => {
    // Setup mocks
    mockCore.getInput.mockImplementation((name) => {
      switch (name) {
        case "keyphrase":
          return "GitHub";
        case "minimum-occurences":
          return "1";
        default:
          return "";
      }
    });
    mockCore.getBooleanInput.mockReturnValue(true);

    // Run the action
    await run();

    // Check expectations
    expect(mockCore.setFailed).toHaveBeenCalledWith(
      "Exactly one of 'text-file' or 'text' inputs must be provided"
    );
  });

  test("fails when both text and text-file are provided", async () => {
    const testFilePath = path.join(__dirname, "test-two-occurrences.md");

    // Setup mocks
    mockCore.getInput.mockImplementation((name) => {
      switch (name) {
        case "text-file":
          return testFilePath;
        case "text":
          return "Some text";
        case "keyphrase":
          return "GitHub";
        case "minimum-occurences":
          return "1";
        default:
          return "";
      }
    });
    mockCore.getBooleanInput.mockReturnValue(true);

    // Run the action
    await run();

    // Check expectations
    expect(mockCore.setFailed).toHaveBeenCalledWith(
      "Exactly one of 'text-file' or 'text' inputs must be provided"
    );
  });
});
