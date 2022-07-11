import Logger from "./logger.mjs"
import {Logger as LoggerInstance} from './logger.mjs';

const Logger2 = new LoggerInstance("mylogs.log");

Logger.debug("Test outside everything")

class Main {

  run() {
    Logger.log("A simple log message")
    Logger.debug("A debug message")
    Logger.silly("A silly debug message")
    Logger.info("An info message")
    Logger.error("An error message")
    Logger.fatal("A fatal message")


    Logger2.debug("Logger2 message instance")
  }
}

const app = new Main();
app.run()
