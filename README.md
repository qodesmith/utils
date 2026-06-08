# @qodestack/utils

```
 __  __   __         ___
/\ \/\ \ /\ \__  __ /\_ \ by: The Qodesmith
\ \ \ \ \\ \ ,_\/\_\\//\ \      ____
 \ \ \ \ \\ \ \/\/\ \ \ \ \    /',__\
  \ \ \_\ \\ \ \_\ \ \ \_\ \_ /\__, `\
   \ \_____\\ \__\\ \_\/\____\\/\____/
    \/_____/ \/__/ \/_/\/____/ \/___/

```

<!-- https://patorjk.com/software/taag/#p=display&h=1&f=Larry%203D&t=Utils -->
<!-- Font: Larry 3D -->

A bunch of utility functions that I use in various projects.

<!-- BEGIN UTILITIES -->
## Modules

- [arrays](docs/arrays/README.md)
- [colors](docs/colors/README.md)
- [dates](docs/dates/README.md)
- [errors](docs/errors/README.md)
- [fetchWithProgress](docs/fetchWithProgress/README.md)
- [json](docs/json/README.md)
- [noop](docs/noop/README.md)
- [numbers](docs/numbers/README.md)
- [objects](docs/objects/README.md)
- [terminal](docs/terminal/README.md)
- [text](docs/text/README.md)
- [timing](docs/timing/README.md)
<!-- END UTILITIES -->

## Steps to adding new features & publishing

1. Add new file or function and test if possible
1. Run `bun run build` to ensure the new changes can be built without error
   - This will run a script that automatically generates `index.ts` and compiles `.js` and `.d.ts` assets into the `dist` folder
1. Commit the new changes to the repo (ensuring no TypeScript errors)
1. Run `bun pm version minor.` (or `major` if a breaking change)
1. Log into npm
   - Run `bun pm whoami` to see if you're authenticated with npm
   - If you're not authenticated, run `bunx npm login` to do so
1. Run `bun run publishPackage` to publish to npm
