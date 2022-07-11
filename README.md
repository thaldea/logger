# @thaldea/logger

This is really stupid NodeJS logger that is really not optimized but really good
for fast prototyping. 

## Starting up

```bash
npm install @thaldea/logger
```

## Simple log example

```javascript
import Logger from "./logger.mjs"

Logger.debug("Debug log outside a function or a class")

class Main {

  run() {
    Logger.log("A simple log message")
    Logger.debug("A debug message")
    Logger.silly("A silly debug message")
    Logger.info("An info message")
    Logger.error("An error message")
    Logger.fatal("A fatal message")
  }
}

const app = new Main();
app.run()
```

## Log and file

```javascript
import {Logger as LoggerInstance} from './logger.mjs';

const Logger = new LoggerInstance("mylogs.log");

class Main {

  run() {
    Logger.log("A simple log message")
    Logger.debug("A debug message")
    Logger.silly("A silly debug message")
    Logger.info("An info message")
    Logger.error("An error message")
    Logger.fatal("A fatal message")
  }
}

const app = new Main();
app.run()
```
