import { join } from "path"
import express, { Application } from "express"
import morgan from "morgan"
import serveFavicon from "serve-favicon"
import cors from "cors"

import { CONFIG } from "@config"
import { logger, stream } from "@src/utils"
import {
    errorMiddleware,
    notFoundMiddleware,
} from "@src/middleware"
import { RouteBuilder } from "./RouteBuilder"

// const wrap = fn => (...args) => fn(...args).catch(args[2])

export class App {
    public app: Application
    public env: string
    public port: string | number

    constructor() {
        this.app = express()
        this.env = CONFIG.NODE_ENV
        this.port = CONFIG.PORT || 3000

        this.initializeMiddleware()
        new RouteBuilder(this.app).build()
        this.initializeErrorHandling()
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info({
                message: "🚀 App started",
                env: this.env,
                port: this.port,
            })
        })
    }

    private initializeMiddleware() {
        this.app.use(cors({
            origin: CONFIG.ORIGIN,
            credentials: CONFIG.CREDENTIALS,
        }))
        this.app.use(morgan(CONFIG.LOG_FORMAT, { stream }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(serveFavicon(join(__dirname, "..", "public", "favicon.ico")))
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
        this.app.use(notFoundMiddleware)
    }
}
