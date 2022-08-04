import { join, resolve } from "path"
import type { TLogLevelName } from "tslog"

import type { NodeEnv } from "@src/types"

export interface IConfig {
    NODE_ENV: NodeEnv
    PORT: number

    SECRET_KEY: string

    LOG_LEVEL: TLogLevelName
    LOG_FORMAT: string

    /** to whitelist for CORS */
    ORIGIN: string
    /** for CORS */
    CREDENTIALS: boolean
    /** Absolute path to the root folder of the application */
    ROOT: string
}

export class Config implements IConfig {

    public NODE_ENV: NodeEnv

    public PORT: number

    public SECRET_KEY: string

    public LOG_LEVEL: TLogLevelName
    public LOG_FORMAT: string

    public ORIGIN: string
    public CREDENTIALS: boolean

    public ROOT: string

    constructor() {
        this.NODE_ENV    = process.env?.NODE_ENV as NodeEnv ?? "development"
        this.PORT        = parseInt(process.env?.PORT) ?? 3000
        this.SECRET_KEY  = process.env?.SECRET_KEY
        this.LOG_LEVEL   = process.env?.LOG_LEVEL as TLogLevelName ?? "silly"
        this.LOG_FORMAT  = process.env?.LOG_FORMAT
        this.ORIGIN      = process.env?.ORIGIN
        this.CREDENTIALS = process.env?.CREDENTIALS === "true"
        this.ROOT        = resolve(__dirname, "..", "..")
    }

    public get logDir(): string { return join(this.ROOT, "logs") }
    public get tmpDir(): string { return join(this.ROOT, "tmp") }
    public get storageDir(): string { return join(this.ROOT, "tmp", "storage") }

    public get notProduction(): boolean {
        return this.NODE_ENV != "production"
    }
}
