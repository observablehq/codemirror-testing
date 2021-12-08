CodeMirror Testing
==================

This repo exists to test out CodeMirror outside of the Observable infrastructure.
The main use case is for quickly creating reproduction examples of bugs for
reporting issues to CodeMirror.

To keep things simple, we dispense with much of our normal tooling. We use
TypeScript and Webpack directly to build the sample website, which only has
CodeMirror dependencies in it (i.e. no Next.js, React, etc.)

## Running this repo

To use this repo, run the following:

```
npm install
npm run build
npm start
```

Then point your browser to http://localhost:8080/.

You can also run `npm run watch` to have Webpack watch for changes. Note: this
command does _not_ include hot reloading in the browser, so don't forget to
manually reload after compilation finishes!

## Creating a reproducible case

You can either create a branch, or commit directly to main and tag the committed
version you want to share (as I did with scrollPosIntoView). Since this is more
or less a scratchpad, we don't need to worry about keeping this orderly.
