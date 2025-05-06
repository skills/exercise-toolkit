# Grading Actions

Grading actions are reusable components that can be quickly used to review exercise results and provide feedback. They all return the same format and do not fail the workflow, allowing them to be easily combined for display.

Example result of a grading workflow

```json
{
  "name": "File updated",
  "passed": true,
  "message": "Verified"
}
```

```json
{
  "name": "File updated",
  "passed": false,
  "message": "Please verify my-config.yml was updated."
}
```

## Current Grading Actions

- [Check Repository Setting](check-repo-setting/README.md) - Performs an API to get the repository settings and verifies an expected value
- [Check All Results](check-all-results/README.md) - Receives several results and produces a single boolean value. This is an exception to the pattern.

## Combining results

The [check-all-results](check-all-results/README.md) action receives several results and produces a single boolean value.

### Example

```yml
- name: Overall Check
  id: check-combined-results
  uses: skills/exercise-toolkit/.github/workflows/grading/check-all-results@cwb
  env:
    check-1: '{"name": "File Exists", "passed": true, "message": "File found"}'
    check-2: '{"name": "Content Valid", "passed": true, "message": "Content validated"}'
    check-3: '{"name": "Tests Passed", "passed": false, "message": "Test failures found"}'

- name: Fail job if not all checks passed
    if: steps.check-combined-results.outputs.result == 'false'
    run: exit 1
```
