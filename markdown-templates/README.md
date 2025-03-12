# Skills Exercises Markdown Templates

A collection of templates for use in Skills exercises.

## Template Collections

- `/readme/*` - templates intended for updating an exercise's root readme file.
- `/step-feedback/*` - templates for sharing step progress, grading pass/fail, and congratulations. Typically used for issue comments.

## Template Variables

Several templates contain [mustache style variables](https://mustache.github.io/mustache.5.html). They are intended for use with the [skills/action-text-variables](https://github.com/skills/action-text-variables) GitHub Action, which supports full mustache templating.

### Example

#### hello.md

```markdown
Hello {{ login }}, nice to meet you!
```

#### json input

```json
{
  "login": "${{ github.actor }}"
}
```

> [!TIP]
> See [mustache syntax](https://mustache.github.io/mustache.5.html) for all capabilities like iteration and if/then logic.
