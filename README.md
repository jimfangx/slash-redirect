# slash-redirect
A simple extension to redirect URLs based on path segments. 100% written by ChatGPT :P

Enables `/docs`, `/meet`, etc to work in browsers. Routing table is in `const ROUTES` in each `bg.js`.

## Installation - Chrome
* `chrome://extensions`, turn on dev mode, load unpacked, select the chrome folder

## Installation - Firefox
* `about:debugging#/runtime/this-firefox`, click "This Firefox", click "Load Temporary Add-on", select `manifest.json` in the firefox folder

OR

* You can permanently install unsigned extensions on Developer Edition by changing `xpinstall.signatures.required` to false in `about:config`. Then, install in `about:addons`.
