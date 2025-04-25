# Keyphrase Checker Action

A GitHub Action that checks for the occurrence of a specified keyphrase in a file or direct text input and fails if the number of occurrences is below a specified minimum. This action is especially useful for GitHub Skills exercises to verify that learners have added specific content to their files, issue comments or other text fields.

## Inputs

| Input                | Description                                                   | Required | Default |
| -------------------- | ------------------------------------------------------------- | -------- | ------- |
| `text-file`          | Path to the file to check (use either this or `text`)         | No\*     | N/A     |
| `text`               | Direct text content to check (use either this or `text-file`) | No\*     | N/A     |
| `keyphrase`          | The keyphrase to search for                                   | Yes      | N/A     |
| `minimum-occurences` | Minimum number of occurrences required                        | No       | 1       |
| `case-sensitive`     | Whether the search should be case-sensitive                   | No       | false   |

\*Note: Exactly one of `text-file` or `text` must be provided.

## Outputs

| Output       | Description                     |
| ------------ | ------------------------------- |
| `occurences` | The number of occurrences found |
