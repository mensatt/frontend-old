# mensatt

Frontend of [sigfood](https://www.sigfood.de/)-successor written in Next.js

## Contributing

**NO ONE PUSHES TO MAIN!!!**

## Setting up development environment

1. Install dependencies:

   ```
   yarn
   ```

2. As this is only a frontend you need to install and run a backend as well

   > Until [the proper backend](https://github.com/mensatt/mensatt-backend) is ready you have to use the [demo-backend](https://github.com/mensatt/demo-backend).

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

> This is also run before every commit (see [section about husky](#pre-commit-hooks) below )

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
