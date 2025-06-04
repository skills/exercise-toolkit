# Repository Elapsed Time :package:

A GitHub Action that checks the time since the repository was created and returns it in multiple formats.

## Outputs 📤

| Name             | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `minutes`        | Number of minutes since repository creation                                                                         |
| `human-readable` | Human readable time since repository creation (e.g., "5 days and 12 hours", "3 hours and 45 minutes", "30 minutes") |

## Usage 🚀

```yaml
steps:
  - name: Check repository age
    id: repo-age
    uses: skills/exercise-toolkit/actions/repository-elapsed-time@<git-tag>

  - name: Use the outputs
    run: |
      echo "Repository is ${{ steps.repo-age.outputs.human-readable }} old"
      echo "Minutes: ${{ steps.repo-age.outputs.minutes }}"

  - name: Run step if repository is older than 1 hour
    if: steps.repo-age.outputs.minutes > 60
    run: |
      echo "This repository has been around for more than an hour!"
```
