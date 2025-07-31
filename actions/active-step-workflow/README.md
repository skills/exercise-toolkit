# Active Step Workflow :package:

A GitHub Action that determines the current step of a GitHub Skills exercise by analyzing enabled workflows in the repository.

This action identifies the current step by finding enabled workflows that match the "Step X" naming pattern and extracts the step number.

## Inputs ⚙️

| Name               | Description                      | Required | Default               |
| ------------------ | -------------------------------- | -------- | --------------------- |
| `github-token`     | GitHub token for API access      | No       | `${{ github.token }}` |
| `workflow-pattern` | Regex pattern for step workflows | No       | `^Step \\d+$`         |

## Outputs 📤

| Name            | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `current-step`  | The current step number (string)                                                     |
| `workflow-name` | Name of the current step workflow file (primary workflow if multiple with same step) |

## Usage 🚀

```yaml
steps:
  - name: Get active step workflow
    id: step-info
    uses: skills/exercise-toolkit/actions/active-step-workflow@<git-tag>

  - name: Use the step information
    run: |
      echo "Currently on step: ${{ steps.step-info.outputs.current-step }}"
      echo "Workflow name: ${{ steps.step-info.outputs.workflow-name }}"
```

## Behavior 🔍

- **Detects enabled workflows**: Scans all repository workflows and identifies those in `active` state
- **Matches step pattern**: Filters workflows by the "Step X" naming pattern (e.g., "Step 0", "Step 3")
- **Single enabled step**: Returns that step number
- **Multiple enabled steps with same number**: Returns the shared step number
- **Multiple enabled steps with different numbers**: Fails with descriptive error listing all enabled steps
- **No enabled step workflows**: Fails with descriptive error


## Permissions 🔐

This action requires the following permissions:

```yaml
permissions:
  actions: read
```
