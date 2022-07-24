# mensatt

Frontend of [mensatt](https://www.mensatt.de/) written in Next.js

## License

This project is licensed under the GNU GPL v3. For more information see [LICENSE](/LICENSE) and [DEPLICENSES](/DEPLICENSES.md).

## Contributing

By default you only have rights to view this repository (which you are doing right now).

You can create a branch (for a PR) in two ways:

- By Forking this repo with the `Fork` button on the top of the page.
- By [Getting write access to this repo](#getting-write-access)

### Implementing changes

1. Create a new branch with a descriptive name based on `main`
2. Make your change(s)
3. Publish your branch in your fork (or this repo if you have write access)
4. [Create a pull request](https://github.com/mensatt/mensatt-frontend/compare)
5. Ensure all checks are passing
   > Note: You probably need to make changes to accomplish this
6. Once all checks are passing, request a review from someone with write access
7. Branch can be merged (by rebasing - see [section](#repo-structure-and-merging) below) once an approving review was given

### Commit style

It was agreed upon to use imperative present-tense commit messages.  
Example: Instead of

> Added new bugs so we do not run out of work

use

> Add new bugs so we do not run out of work

Ideally, use [conventional commit style](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages

### Repo structure and merging

Similarly to above it was agreed upon to use rebasing as the preferred method for updating and merging branches.  
This has a few implications - mainly that only one person should work on a branch at a time and that force pushes become mandatory to update your branch (e.g. when `main` has changed since you created your feature-branch).

### Getting write access

If you want to get write access (which is not needed to contribute) get in touch with one of the repo admins - they may grant you write access if they see fit.

## Setting up development environment

1. Install dependencies:

   ```
   yarn
   ```

2. As this is only a frontend you need to install and run the [backend](https://github.com/mensatt/mensatt-backend) as well.  
   Consult the documentation of the backend for further information.

## Run development environment

```
yarn dev
```

Will start a development server on `localhost:3000`.

## Linting and formatting

```
yarn lint
```

Will check your local files for linting and style errors and will notify you of found problems.

> This is also run before every commit (see [section about husky](#pre-commit-hooks) below)

```
yarn lint-fix
```

Will try to programmatically resolve linting problems.

### Style guideline:

- Indentation: 2 Spaces
- Only unix newlines (LF, not CRLF)
- Semicolons are in the source, not inferred
- Newline at the end of every file

### Pre-Commit hooks

We use husky for pre-commit hooks in git, to help with linting. Please run `yarn husky install` to install the git hooks.

## Creating a production build

```
yarn build
```

can be used to create a production build that can be started with

```
yarn start
```
