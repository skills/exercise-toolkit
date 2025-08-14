# Skills Exercises Toolkit :hammer_and_wrench:

<p align="center">
  <img src="https://octodex.github.com/images/manufacturetocat.png" alt="Manufacturetocat" width="300" />
</p>

- [Skills Exercises Toolkit :hammer\_and\_wrench:](#skills-exercises-toolkit-hammer_and_wrench)
  - [Purpose](#purpose)
    - [Contents](#contents)
  - [Examples](#examples)
    - [⚙️ Reusable Workflows](#️-reusable-workflows)
      - [Starting an exercise](#starting-an-exercise)
      - [Finding an exercise](#finding-an-exercise)
    - [📋 Markdown Templates](#-markdown-templates)
      - [Using with GrantBirki/comment for issue comments](#using-with-grantbirkicomment-for-issue-comments)
      - [Using with action-text-variables for file updates](#using-with-action-text-variables-for-file-updates)
  - [Notable Resources](#notable-resources)

## Purpose

This repository serves as a comprehensive toolkit for creating and managing GitHub Skills exercises. It provides a collection of tools, templates, and utilities designed to streamline the process of developing educational content for GitHub Skills.

### Contents

- **[.github/workflows](/.github/workflows)**: GitHub Actions workflows for automating common parts of Skills Exercises
- **[markdown-templates](/markdown-templates)**: Ready-to-use Markdown templates for creating consistent exercise documentation, instructions, and README files
- **[actions](/actions)**: Simple composite actions to help when building GitHub Skills exercises


## Examples

### ⚙️ Reusable Workflows

For a full list of reusable workflows go to the **[.github/workflows](/.github/workflows)** directory.

#### Starting an exercise

```yaml
jobs:
  start_exercise:
    name: Start Exercise
    uses: skills/exercise-toolkit/.github/workflows/start-exercise.yml@<git-tag>
    with:
      exercise-title: "Introduction to GitHub Copilot"
      intro-message: "Let's get you started with GitHub Copilot :robot: ! We will learn ..."
```

#### Finding an exercise

```yaml
jobs:
  find_exercise:
    name: Find Exercise Issue
    uses: skills/exercise-toolkit/.github/workflows/find-exercise-issue.yml@<git-tag>
```

### 📋 Markdown Templates

For a full list of markdown templates go to the **[markdown-templates](/markdown-templates)** directory.

```yaml
steps:
  - name: Get markdown templates
    uses: actions/checkout@v4
    with:
      repository: skills/exercise-toolkit
      path: exercise-toolkit
      ref: <git-tag>

  - name: Use the template
    run: |
      cat exercise-toolkit/markdown-templates/step-feedback/checking-work.md
```

#### Using with GrantBirki/comment for issue comments

Templates are often used with [GrantBirki/comment](https://github.com/GrantBirki/comment) to create dynamic comments on issues or pull requests:

```yaml
steps:
  - name: Get markdown templates
    uses: actions/checkout@v4
    with:
      repository: skills/exercise-toolkit
      path: exercise-toolkit
      ref: <git-tag>

  - name: Create comment - step finished
    uses: GrantBirki/comment@v2.1.1
    with:
      file: exercise-toolkit/markdown-templates/step-feedback/step-finished-prepare-next-step.md
      issue-number: ${{ env.ISSUE_NUMBER }}
      repository: ${{ env.ISSUE_REPOSITORY }}
      vars: |
        next_step_number: 2
```

#### Using with action-text-variables for file updates

Markdown templates can also be used with [skills/action-text-variables](https://github.com/skills/action-text-variables) to generate dynamic content for any purpose, e.g updating a file.

```yaml
steps:
  - name: Get markdown templates
    uses: actions/checkout@v4
    with:
      repository: skills/exercise-toolkit
      path: exercise-toolkit
      ref: <git-tag>

  - name: Build README from template
    id: build-readme
    uses: skills/action-text-variables@v3
    with:
      template-file: exercise-toolkit/markdown-templates/readme/exercise-started.md
      template-vars: |
        title: ${{ inputs.exercise-title }}
        login: ${{ github.actor }}
        issue_url: ${{ needs.create_exercise.outputs.issue-url }}

  - name: Update README file
    run: echo "$README_CONTENT" > README.md
    env:
      README_CONTENT: ${{ steps.build-readme.outputs.updated-text }}
```

## Notable Resources

These GitHub Actions are particularly useful when creating GitHub Skills Exercises:

- **[skills/action-text-variables](https://github.com/skills/action-text-variables)**: Replace variables in template files with dynamic content
- **[skills/action-keyphrase-checker](https://github.com/skills/action-keyphrase-checker)**: Verify if specific keyphrases exist in files or content
- **[GrantBirki/comment](https://github.com/GrantBirki/comment)**: Create comments on GitHub issues or pull requests with support for Nunjucks templating

