# Post Step Content Action

A composite action that posts step content to GitHub issues for GitHub Skills exercises.

## Usage

```yaml
- name: Post step content
  uses: skills/exercise-toolkit/actions/post-step-content@v0.5.0
  with:
    issue-url: ${{ needs.find_exercise.outputs.issue-url }}
    step-content-file: ".github/steps/2-commit-a-file.md"
```

## Inputs

| Input               | Description                                       | Required | Default |
| ------------------- | ------------------------------------------------- | -------- | ------- |
| `issue-url`         | URL of the issue to post content to               | ✅       | -       |
| `step-content-file` | Path to the markdown file containing step content | ✅       | -       |
| `template-vars`     | Template variables in YAML or JSON format         | ❌       | `""`    |

## Examples

### Basic Usage

```yaml
- uses: skills/exercise-toolkit/actions/post-step-content@v0.5.0
  with:
    issue-url: ${{ needs.find_exercise.outputs.issue-url }}
    step-content-file: ".github/steps/3-open-a-pull-request.md"
```

### With Template Variables

```yaml
- uses: skills/exercise-toolkit/actions/post-step-content@v0.5.0
  with:
    issue-url: ${{ needs.find_exercise.outputs.issue-url }}
    step-content-file: ".github/steps/step-finished-prepare-next-step.md"
    template-vars: |
      next_step_number: 4
      congratulations_message: "Great work!"
```

### Using Development Version

```yaml
- uses: skills/exercise-toolkit/actions/post-step-content@main
  with:
    issue-url: ${{ needs.find_exercise.outputs.issue-url }}
    step-content-file: ".github/steps/x-review.md"
```

## What This Action Does

1. **Checkout exercise-toolkit**: Gets the markdown templates
2. **Process templates** (if template-vars provided): Uses `skills/action-text-variables` to process template variables
3. **Post step completion message**: Adds a congratulatory comment indicating the step is finished
4. **Post step content**: Adds the step content as an issue comment
5. **Add progress comment**: Posts a "watching for progress" comment

## Requirements

- Requires `GITHUB_TOKEN` with `issues: write` permissions
- The calling workflow must have checked out the repository to access step content files

## Development

This action is part of the GitHub Skills exercise-toolkit and is designed to standardize step content posting across all GitHub Skills exercises.
