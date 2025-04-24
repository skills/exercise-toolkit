# Keyphrase Checker Action

A GitHub Action that checks for the occurrence of a specified keyphrase in a file or direct text input and fails if the number of occurrences is below a specified minimum. This action is especially useful for GitHub Skills exercises to verify that learners have added specific content to their files.

## Inputs

| Input                | Description                                                   | Required | Default |
| -------------------- | ------------------------------------------------------------- | -------- | ------- |
| `text-file`          | Path to the file to check (use either this or `text`)         | No\*     | N/A     |
| `text`               | Direct text content to check (use either this or `text-file`) | No\*     | N/A     |
| `keyphrase`          | The keyphrase to search for                                   | Yes      | N/A     |
| `minimum_occurences` | Minimum number of occurrences required                        | No       | 1       |
| `case-sensitive`     | Whether the search should be case-sensitive                   | No       | true    |

\*Note: Exactly one of `text-file` or `text` must be provided.

## Outputs

| Output       | Description                     |
| ------------ | ------------------------------- |
| `occurences` | The number of occurrences found |

## Usage in GitHub Skills Exercises

This action is particularly useful for GitHub Skills exercises where you want to verify that learners have included specific content in their files. For example:

```yaml
name: Check Exercise Step Content

on:
  push:
    branches: [main]
    paths:
      - "src/**"

jobs:
  check_step_work:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Check for required content
        id: check-content
        uses: skills/exercise-toolkit/actions/keyphrase-checker@v1
        with:
          text-file: src/app.js
          keyphrase: "participant"
          minimum_occurences: 3
          case-sensitive: false

      - name: Build message - step results
        if: always()
        id: build-message-step-results
        uses: skills/action-text-variables@v2
        with:
          template-file: exercise-toolkit/markdown-templates/step-feedback/step-results-table.md
          template-vars: |
            step_number: 3
            passed: ${{ steps.check-content.outcome == 'success' }}
            results_table:
              - name: "Check file for required content"
                passed: ${{ steps.check-content.outcome == 'success' }}
```

## Examples

### Example 1: Checking File Content

```yaml
- name: Check for GitHub mentions
  uses: skills/exercise-toolkit/actions/keyphrase-checker@v1
  with:
    text-file: README.md
    keyphrase: "GitHub"
    minimum_occurences: 3
    case-sensitive: true
```

### Example 2: Checking Direct Text Input

```yaml
- name: Check commit message
  uses: skills/exercise-toolkit/actions/keyphrase-checker@v1
  with:
    text: ${{ github.event.head_commit.message }}
    keyphrase: "fix:"
    case-sensitive: false
```

### Example 3: Using the Output

```yaml
- name: Check for function usage
  id: check-functions
  uses: skills/exercise-toolkit/actions/keyphrase-checker@v1
  with:
    text-file: src/main.js
    keyphrase: "function"

- name: Report usage
  run: echo "Found ${{ steps.check-functions.outputs.occurences }} functions in the file"
```

## Development

1. Install dependencies:

   ```
   npm install
   ```

2. Run tests:

   ```
   npm test
   ```

3. Lint and format code:

   ```
   npm run lint
   npm run format
   ```

4. Build the action:

   ```
   npm run build
   ```

5. Run all checks at once:
   ```
   npm run all
   ```

## Node.js Version

This action runs on Node.js 20.

## License

MIT
