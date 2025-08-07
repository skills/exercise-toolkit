# Skills Exercises Markdown Templates

A collection of templates for use in Skills exercises.

## Template Collections

- `/readme/*` - templates intended for updating an exercise's root readme file.
- `/step-feedback/*` - templates for sharing step progress, grading pass/fail, and congratulations. Typically used for issue comments.

## Template Variables

Several templates contain [Nunjucks](https://mozilla.github.io/nunjucks/) style variable templating. They are intended for use with the [skills/action-text-variables](https://github.com/skills/action-text-variables) or [GrantBirki/comment](https://github.com/GrantBirki/comment) GitHub Actions, both of which support full Nunjucks templating.



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

#### yaml input
```yaml
login: "${{ github.actor }}"
```

> [!TIP]
> See [Nunjucks templating documentation](https://mozilla.github.io/nunjucks/templating.html) for all capabilities like iteration, conditionals, and more.
