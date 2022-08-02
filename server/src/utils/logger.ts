import { join, resolve } from "path"
import { appendFileSync } from "fs"
import {
    Logger,
    ILogObject,
    ISettingsParam,
} from "tslog"
import { CONFIG } from "@config"

const logFileName = `${CONFIG.NODE_ENV}.logs.jsonl`
const logFolderPath = resolve(__dirname, CONFIG.LOG_DIR)
const logFilePath = join(logFolderPath, logFileName)

export const logToFile = (logObject: ILogObject) => {
    const {
        // hostname,
        date,
        logLevel,
        // logLevelId,
        filePath,
        // fullFilePath,
        // fileName,
        lineNumber,
        // columnNumber,
        // isConstructor,
        argumentsArray,
    } = logObject
    const output = {
        date,
        logLevel,
        // logLevelId,
        // filePath,
        // fullFilePath,
        // fileName,
        // lineNumber,
        // columnNumber,
        // isConstructor,
        source: `${filePath.replaceAll("\\", "/")}:${lineNumber}`,
        argumentsArray,
    }
    appendFileSync(logFilePath, JSON.stringify(output) + "\n")
}

const loggerSettings: ISettingsParam = {
    minLevel: CONFIG?.LOG_LEVEL || "silly",
    type: "pretty",
    displayFunctionName: false,
    displayInstanceName: false,
    dateTimeTimezone: "CST",
    dateTimePattern: "year-month-day hour:minute:second",
}

const _logger: Logger = new Logger(loggerSettings)

_logger.attachTransport(
    {
        silly: logToFile,
        debug: logToFile,
        trace: logToFile,
        info:  logToFile,
        warn:  logToFile,
        error: logToFile,
        fatal: logToFile,
    },
    "debug",
)

export const logger = _logger

