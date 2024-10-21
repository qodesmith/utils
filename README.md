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

## Steps to adding new features & publishing

1. Add new file or function and test if possible
1. Run `bun run build` to ensure the new changes can be built without error
   - This will run a script that automatically generates `index.ts` and compiles `.js` and `.d.ts` assets into the `dist` folder
1. Commit the new changes to the repo (ensuring no TypeScript errors)
1. Run `npm version minor` (or `major` if a breaking change)
1. Run `bun run publishPackage` to publish to npm
