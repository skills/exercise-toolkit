# Wait for Workflow Run :package:

A GitHub Action that polls the GitHub API until a workflow run reaches a target status.

This action is useful when one workflow must wait for another workflow run to finish without using the `workflow_run` trigger.

## Inputs ⚙️

| Name               | Description                                                         | Required | Default                               |
| ------------------ | ------------------------------------------------------------------- | -------- | ------------------------------------- |
| `workflow-id`      | The workflow file name or numeric ID to poll (e.g. `ci.yml`)        | Yes      | N/A                                   |
| `head-sha`         | Filter runs by commit SHA. When omitted, checks the most recent run | No       | _latest run_                          |
| `status`           | The target run status to wait for                                   | No       | `completed`                           |
| `owner`            | Repository owner                                                    | No       | `${{ github.repository_owner }}`      |
| `repo`             | Repository name                                                     | No       | `${{ github.event.repository.name }}` |
| `polling-interval` | Seconds between each poll attempt                                   | No       | `10`                                  |
| `timeout`          | Maximum seconds to wait before giving up                            | No       | `180`                                 |
| `fail-on-timeout`  | Whether to fail the step if the timeout is reached                  | No       | `false`                               |
| `token`            | GitHub token for API requests                                       | No       | `${{ github.token }}`                 |

## Outputs 📤

| Name         | Description                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- |
| `conclusion` | The conclusion of the matched workflow run (for example `success` or `failure`), or `timeout` |

## Usage 🚀

```yaml
permissions:
  contents: read
  actions: read

steps:
  - uses: actions/checkout@v6

  - name: Wait for CI workflow to complete
    id: wait-for-ci
    uses: skills/exercise-toolkit/actions/wait-for-workflow@<git-tag>
    with:
      workflow-id: ci.yml
      head-sha: ${{ github.sha }}
      status: completed
      polling-interval: 10
      timeout: 300
      fail-on-timeout: true
```
