import Logger from "./index.mjs"
import {Logger as LoggerInstance} from './index.mjs';

const Logger2 = new LoggerInstance("mylogs.log", {dateFormat: "yyyy-mm-dd HH:MM", displayDate: true});

Logger.debug("Debug log outside a function or a class")

class Main {

  run() {
    Logger.debug("A debug message")
    Logger.log("A simple log message")
    Logger.warn("A silly debug message")
    Logger.info("An info message")
    Logger.error("An error message")
    Logger.fatal("A fatal message")


    Logger2.debug("Logger2 instance, writing into mylogs.log files")
  }
}

const app = new Main();
app.run()
