2026-02-27T05:07:56.3788701Z Current runner version: '2.331.0'
Runner Image Provisioner
Operating System
Runner Image
GITHUB_TOKEN Permissions
Secret source: Actions
Prepare workflow directory
Prepare all required actions
Getting action download info
Download action repository 'actions/attest-build-provenance@v3' (SHA:977bb373ede98d70efdf65b84cb5f73e068dcc2a)
Download action repository 'actions/upload-artifact@b7c566a772e6b6bfb58ed0dc250532a479d7789f' (SHA:b7c566a772e6b6bfb58ed0dc250532a479d7789f)
Download action repository 'masci/datadog@a3f481d2ed0f4e1edde2be2f564b94719d6d4bc2' (SHA:a3f481d2ed0f4e1edde2be2f564b94719d6d4bc2)
Getting action download info
Download action repository 'actions/attest-build-provenance@864457a58d4733d7f1574bd8821fa24e02cf7538' (SHA:864457a58d4733d7f1574bd8821fa24e02cf7538)
Download action repository 'actions/attest@daf44fb950173508f38bd2406030372c1d1162b1' (SHA:daf44fb950173508f38bd2406030372c1d1162b1)
Uses: actions/attest-build-provenance/.github/workflows/prober.yml@refs/heads/main (a2bbfa25375fe432b6a289bc6b6cd05ecd0c4c32)
 Inputs
Complete job name: prober / probe## Workflow file Naming Convention

Workflows in this directory follow a simple naming convention:

- **Workflows prefixed with `_`** (underscore): These workflows are intended for internal repository functionality only. They are not designed to be reused via `workflow_call` from other repositories.

