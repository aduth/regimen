# Regimen

A workout progression planning web app.

<img src="https://cldup.com/mFLAsBL11n.png">

## About

Regimen helps you plan the progression of your workouts. Choose from a number of popular weightlifting routines to generate a customized plan to help you achieve your goals.

Interested? Create your plan at https://regimenapp.com to get started.

## Contributing

If you'd like to run your own instance of Regimen or contribute to the project, you must first ensure that Node.js is installed. You can download the latest version of Node from their [download page](https://nodejs.org/en/download/).

Then, either download and extract the [latest zip](https://github.com/aduth/regimen/archive/master.zip) of this repository or, if you have `git` installed, clone the repository to a directory on your computer.

From your terminal or command line, enter the following command to clone the repository:

```bash
$ git clone https://github.com/aduth/regimen.git
```

Once cloned or extracted, change to the directory in your terminal, then install the required dependencies with `npm`:

```bash
$ cd regimen
$ npm install
```

After all of the dependencies have been installed, you can start a local development server by running `npm run dev`. Then navigate to http://localhost:3000 in your browser and you should see that the Regimen homepage is displayed.

## Testing

Coding standards are enforced via [ESLint](http://eslint.org/). Linting can be performed by running the `lint` script:

```bash
npm run lint
```

Unit tests are implemented using [Mocha](https://mochajs.org/). Run tests with the `test` script:

```bash
npm run test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Andrew Duthie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
