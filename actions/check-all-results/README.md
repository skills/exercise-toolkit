# Check All Results Action

This action combines the results of multiple grading checks and returns a boolean indicating if all checks have passed.

## Inputs

The action expects input through environment variables. Each check result should be passed as an environment variable with a name starting with `check` (case insensitive).

Each check value should be a JSON string in the following format:

```json
{
  "name": "Display Name",
  "passed": false,
  "message": "Explanation of the result."
}
```

## Example Usage

```yml
- name: Overall Check
  id: check-combined-results
  uses: skills/exercise-toolkit/.github/workflows/grading/check-all-results@cwb
  env:
    check-1: '{"name": "File Exists", "passed": true, "message": "File found"}'
    check-2: '{"name": "Content Valid", "passed": true, "message": "Content validated"}'
    check-3: '{"name": "Tests Passed", "passed": false, "message": "Test failures found"}'
```

## Outputs

- `result`: A boolean string (`'true'` or `'false'`) indicating if all checks have passed. The action returns `true` only if all check results have `passed: true`.
