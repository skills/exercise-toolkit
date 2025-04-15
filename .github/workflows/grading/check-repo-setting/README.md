# Check Repository Setting Action

This action checks a specified repository setting and verifies if it matches an expected value. It's useful for validating repository configurations as part of GitHub Skills exercises.

## Inputs

### Required Inputs

- `check-name`: The name of the check that will appear in the results
- `setting-name`: The full path to the repository setting to check (e.g., "security_and_analysis.secret_scanning.status")
- `setting-expected-value`: The expected value of the repository setting
- `pass-message`: The message to return if the check passes
- `fail-message`: The message to return if the check fails

### Optional Inputs

- `debug`: Enable debug logging (default: false)
- `owner`: The owner of the repository (default: current repository owner)
- `repo-name`: The name of the repository (default: current repository name)

## Example Usage

```yml
- name: Check if secret scanning is enabled
  id: check-secret-scanning-enabled
  uses: skills/exercise-toolkit/.github/workflows/grading/check-repo-setting@cwb
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    # Required inputs
    check-name: "Secret Scanning Enabled"
    setting-name: "security_and_analysis.secret_scanning.status"
    setting-expected-value: "enabled"
    pass-message: "Verified"
    fail-message: "Secret scanning should be enabled. Please check your repository settings."
    # Optional inputs
    debug: false
    owner: ${{ github.event.repository.owner.login }}
    repo-name: ${{ github.event.repository.name }}
```

## Output

The action outputs a JSON object containing:

- `name`: The name of the check
- `passed`: Boolean indicating if the check passed
- `message`: The pass or fail message specified in the inputs

Examples:

```json
{
  "name": "Secret Scanning Enabled",
  "passed": true,
  "message": "Verified"
}
```

```json
{
  "name": "Secret Scanning Enabled",
  "passed": false,
  "message": "Secret scanning should be enabled. Please check your repository settings."
}
```
