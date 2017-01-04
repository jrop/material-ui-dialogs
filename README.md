# material-ui-dialogs

## Installation

```sh
npm install material-ui-dialogs
```

## Use

```js
'use strict'

const muiDialogs = require('material-ui-dialogs')
async function main() {
	await muiDialogs.alert('My title', 'My message')
	const shouldContinue = await muiDialogs.confirm('Confirm Title', 'Should I continue?')
	const name = await muiDialogs.prompt('Prompt Title', 'What is your name?', 'Default value here')
}
main()
```

To show your own custom component as a dialog, see the example in `test/index-source.js`.

## License

ISC License (ISC)
Copyright (c) 2016, Jonathan Apodaca <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
