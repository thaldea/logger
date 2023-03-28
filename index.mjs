import chalk from 'chalk'
import fs from 'fs'

// Get current direname
const __dirname = process.cwd()

let ID = 0

class Logger {
  constructor (outputFilename) {
    this.ID = ID++
    this.COLORS = {
      debug: 'gray',
      error: 'red',
      fatal: 'magenta',
      info: 'blue',
      warn: 'yellow',
      log: 'white'
    }

    this.TYPES_STR = {
      log: '  LOG  ',
      info: '? INFO ',
      debug: '. DEBUG',
      error: '! ERROR',
      fatal: 'X FATAL',
      warn: '~ WARN '
    }
    this.OUTPUT_FILENAME = outputFilename
  }

  getId () {
    return this.ID
  }

  _getContext (stackLine = 4) {
    const e = new Error()
    const stack = e.stack.split('\n')
    let firstNonLoggerLine = ''
    for (let i = 1; i < stack.length; i++) {
      // NOTE: first line is always "Error"
      const line = stack[i]
      if (line.indexOf('at Logger.') === -1) {
        firstNonLoggerLine = line
          .replace(`file://${__dirname}/`, '')
          .replace('    at ', '')
          .split(' ')
        break
      }
    }
    const date = new Date().toISOString()
    let tag = firstNonLoggerLine[0].split('.')[0]
    let func = firstNonLoggerLine[0].split('.')[1]
    let filename = firstNonLoggerLine[1]
    // Override if it's at root
    if(filename === undefined) {
      filename = firstNonLoggerLine[0]
      tag = "[Root]"
      func = ""
    }
    // Override if it's a constructor
    else if (tag === 'new') {
      tag = firstNonLoggerLine[1]
      func = 'constructor'
      filename = firstNonLoggerLine[2]
    }
    if (this.ID > 1) {
      tag = `[${this.ID}] ${tag}`
    }
    return { tag, func, filename, date }
  }

  _print (type = 'debug', ...msg) {
    const ctx = this._getContext()
    ctx.level = type
    console.log(
      chalk[this.COLORS[type]](this.TYPES_STR[type]),
      chalk.blue(`${ctx.tag}>`) + chalk.magenta(`${ctx.func}`),
      ...msg,
      chalk.gray(`${ctx.date}`),
      chalk.gray(ctx.filename)
    )
    if (this.OUTPUT_FILENAME) {
      const data = Object.assign(ctx, {data: msg});
      fs.appendFileSync(this.OUTPUT_FILENAME, JSON.stringify(data) + '\n')
    }
  }

  log (...msg) {
    this._print('log', ...msg)
  }

  debug (...msg) {
    this._print('debug', ...msg)
  }

  info (...msg) {
    this._print('info', ...msg)
  }

  error (...msg) {
    this._print('error', ...msg)
  }

  fatal (...msg) {
    this._print('fatal', ...msg)
  }

  warn (...msg) {
    this._print('warn', ...msg)
  }
}

const logger = new Logger()
export { logger as default, Logger }
