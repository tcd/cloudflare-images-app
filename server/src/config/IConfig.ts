import { config } from "dotenv"
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` })

import type { TLogLevelName } from "tslog"

export type NodeEnv = "development" | "production" | "test"

export interface IConfig {
    NODE_ENV: NodeEnv
    PORT: number

    SECRET_KEY: string

    LOG_LEVEL: TLogLevelName
    LOG_FORMAT: string
    LOG_DIR: string

    ORIGIN: string
    CREDENTIALS: boolean
}

export class Config implements IConfig {

    public NODE_ENV: NodeEnv

    public PORT: number

    public SECRET_KEY: string

    public LOG_LEVEL: TLogLevelName
    public LOG_FORMAT: string
    public LOG_DIR: string

    public ORIGIN: string
    public CREDENTIALS: boolean

    constructor() {
        this.NODE_ENV    = process.env?.NODE_ENV as NodeEnv ?? "development"
        this.PORT        = parseInt(process.env?.PORT) ?? 3000
        this.SECRET_KEY  = process.env?.SECRET_KEY
        this.LOG_LEVEL   = process.env?.LOG_LEVEL as TLogLevelName ?? "silly"
        this.LOG_FORMAT  = process.env?.LOG_FORMAT
        this.LOG_DIR     = process.env?.LOG_DIR
        this.ORIGIN      = process.env?.ORIGIN
        this.CREDENTIALS = process.env?.CREDENTIALS === "true"
    }
}
