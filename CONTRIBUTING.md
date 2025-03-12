# Contributing to Exercise Toolkit

Thank you for your interest in contributing to the Exercise Toolkit! This document provides guidelines to help you contribute effectively.

## Conventional Pull Request Titles

This project enforces [conventionalcommit](https://www.conventionalcommits.org/en/v1.0.0/) style formatting for pull request titles to automate versioning and release processes.

We do not require that every commit follows the conventionalcommits style, just the pull request title. Pull requests are squashed with the PR title as the commit message.

Each PR title must follow this format:

```
<type>(optional <scope>): <description>
```



### Examples

```
feat: add workflow to start exercise
fix(templates): correct typo in step feedback template
```

### Breaking Changes

For breaking changes, append  `!` after type/scope

```
feat!: change workflow inputs
feat(templates)!: change required variables for congratulations template
```

