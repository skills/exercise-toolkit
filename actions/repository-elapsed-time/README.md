# Repository Elapsed Time :package:

A GitHub Action that checks the time since the repository was created and returns it in multiple formats.

## Outputs 📤

| Name             | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `days`           | Number of days since repository creation                                                                            |
| `hours`          | Number of hours since repository creation                                                                           |
| `minutes`        | Number of minutes since repository creation                                                                         |
| `human-readable` | Human readable time since repository creation (e.g., "5 days and 12 hours", "3 hours and 45 minutes", "30 minutes") |
| `created-at`     | Repository creation timestamp (ISO 8601 format)                                                                     |

## Usage 🚀

```yaml
steps:
  - name: Check repository age
    id: repo-age
    uses: skills/exercise-toolkit/actions/repository-elapsed-time@<git-tag>

  - name: Use the outputs
    run: |
      echo "Repository is ${{ steps.repo-age.outputs.human-readable }} old"
      echo "Created at: ${{ steps.repo-age.outputs.created-at }}"
      echo "Days: ${{ steps.repo-age.outputs.days }}"
      echo "Hours: ${{ steps.repo-age.outputs.hours }}"
      echo "Minutes: ${{ steps.repo-age.outputs.minutes }}"
```
