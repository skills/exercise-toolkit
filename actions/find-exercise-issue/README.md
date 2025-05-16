# Find Exercise Issue :mag:

A GitHub Action that searches for an open issue in a repository containing a specific text in its title and returns its URL and issue number.

This action will fail if no matching issue is found

## Inputs ⚙️

| Name               | Description                              | Required | Default               |
| ------------------ | ---------------------------------------- | -------- | --------------------- |
| `issue-title-text` | Text to search for within issue titles   | No       | `Exercise`            |
| `github-token`     | GitHub token with issues:read permission | No       | `${{ github.token }}` |

## Outputs 📤

| Output         | Description               |
| -------------- | ------------------------- |
| `issue-url`    | URL of the found issue    |
| `issue-number` | Number of the found issue |

## Usage 🚀

```yaml
steps:
  - name: Find exercise issue
    id: find-exercise-issue
    uses: skills/exercise-toolkit/actions/find-exercise-issue@<git-tag>

  # Use the outputs
  - name: Use the found issue
    run: |
      echo "Found issue: ${{ steps.find-exercise-issue.outputs.issue-url }}"
      echo "Issue number: ${{ steps.find-exercise-issue.outputs.issue-number }}"
```
