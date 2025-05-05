# File Exists :package:

A GitHub Action that checks if a file exists in the repository.

This action will fail if the file does not exist

## Inputs ⚙️

| Name   | Description                                                    | Required |
| ------ | -------------------------------------------------------------- | -------- |
| `file` | The path to the file to check, relative to the repository root | Yes      |

## Usage 🚀

```yaml
steps:
  - uses: actions/checkout@v4
  - name: Check if file exists
    uses: skills/exercise-toolkit/actions/file-exists@<git-tag>
    with:
      file: "path/to/your/file.md"
```
