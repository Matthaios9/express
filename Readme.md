
Fast, minimalist web framework for [Node.js](https://nodejs.org).

```js
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

## Installation

Express is a web framework for Node.js.

Before installing, make sure Node.js 18 or higher is installed.

Create a new project and install Express:

```bash
npm init -y
npm install express
```

## Features

* Fast and minimalist
* Robust routing
* Middleware support
* HTTP helpers
* REST API support
* Easy to use and extend
* High performance

## Quick Start

Create an `app.js` file:

```js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

Start the application:

```bash
node app.js
```

Open the application in your browser:

```text
http://localhost:3000
```

## Philosophy

Express provides simple and flexible tools for building web applications and HTTP APIs with Node.js.

It does not force you to use a specific database, ORM, template engine, or application structure. You can choose the tools and architecture that best fit your project.

## Examples

Install the dependencies:

```bash
npm install
```

Run an example:

```bash
node examples/content-negotiation
```

## Contributing

Contributions are welcome, including code improvements, documentation, tests, and bug fixes.

### Running Tests

Install the dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```
