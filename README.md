# ALDER

# Contributing Guideline

Here's how to submit a Pull Request (PR):

1. [Fork this repository on GitHub][fork] then do the following:
    * Setup an [Upstream remote][configure-upstream] to this repository
      `https://github.com/MirzaHilmi/ALDER-App`.
    * [Sync your fork][sync-fork] with the upstream.
2. Clone your fork of the repository to your local computer.
3. Create a branch with a descriptive name to work (i.e., `git checkout -b your-name`).
4. Make changes, commit them, and push the branch to your repository fork.
5. [Submit a pull request][pull-req] to the master branch.

[fork]: https://help.github.com/articles/fork-a-repo

[configure-upstream]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork

[sync-fork]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork

[pull-req]: https://help.github.com/articles/using-pull-requests

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
