import { isBlank } from "."

export const LogLevels = {
    trace: "trace",
    debug: "debug",
    info:  "info",
    warn:  "warn",
    error: "error",
    fatal: "fatal",
} as const
type LogLevelKey = keyof typeof LogLevels
export type LogLevel = typeof LogLevels[LogLevelKey];

export type LogFunction = (message?: any, ...optionalParams: any[]) => void;
// export type LogFunction = (...args: any[]) => void

export interface ILogger {
    trace: LogFunction
    debug: LogFunction
    info:  LogFunction
    warn:  LogFunction
    error: LogFunction
    fatal: LogFunction
}

const LogLevelIds: Record<LogLevel, number> = {
    trace: 0,
    debug: 1,
    info:  2,
    warn:  3,
    error: 4,
    fatal: 5,
}

export class ConsoleLogger implements ILogger {
    public trace(message?: any, ...optionalParams: any[]) { this._log("trace", message, ...optionalParams) }
    public debug(message?: any, ...optionalParams: any[]) { this._log("debug", message, ...optionalParams) }
    public info (message?: any, ...optionalParams: any[]) { this._log("info",  message, ...optionalParams)  }
    public warn (message?: any, ...optionalParams: any[]) { this._log("warn",  message, ...optionalParams)  }
    public error(message?: any, ...optionalParams: any[]) { this._log("error", message, ...optionalParams) }
    public fatal(message?: any, ...optionalParams: any[]) { this._log("fatal", message, ...optionalParams) }
    // public fatal(args: any) { console.error(args) }

    // private _info(...args: any[]): void {
    //     const callsite = getCallsite();
    //     console.info(callsite, ...args);
    // }

    private _log(level: LogLevel, message?: any, ...optionalParams: any[]): void {
        if (!this._shouldLog(level)) {
            return null
        }
        if (isBlank(message)) {
            message = "[no message]"
        } else {
            if (isBlank(optionalParams)) {
                switch (level) {
                    case "trace": console.trace(message); break
                    case "debug": console.debug(message); break
                    case "info":  console.info(message);  break
                    case "warn":  console.warn(message);  break
                    case "error": console.error(message); break
                    case "fatal": console.error(message); break
                    default: break
                }
                return null
            } else {
                if (isBlank(optionalParams)) {
                    switch (level) {
                        case "trace": console.trace(message, ...optionalParams); break
                        case "debug": console.debug(message, ...optionalParams); break
                        case "info":  console.info(message,  ...optionalParams); break
                        case "warn":  console.warn(message,  ...optionalParams); break
                        case "error": console.error(message, ...optionalParams); break
                        case "fatal": console.error(message, ...optionalParams); break
                        default: break
                    }
                    return null
                }
            }
        }
    }

    private _shouldLog(level: LogLevel): boolean {
        return true
        // const minimumLevelId = LogLevelIds[CONFIG.logLevel]
        // const levelId        = LogLevelIds[level]
        // return levelId >= minimumLevelId
    }
}
