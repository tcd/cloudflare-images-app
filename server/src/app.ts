import { join } from "path"
import express, { Application, Router } from "express"
import morgan from "morgan"
import serveFavicon from "serve-favicon"
import cors from "cors"
import PromiseRouter from "express-promise-router"

import { CONFIG } from "@config"
import { logger, stream } from "@src/utils"
import {
    errorMiddleware,
    notFoundMiddleware,
} from "@src/middleware"
import {
    IndexController,
    UsageController,
} from "@src/controllers"

// const wrap = fn => (...args) => fn(...args).catch(args[2])

export class App {
    public app: Application
    public router: Router
    public env: string
    public port: string | number

    constructor() {
        this.app = express()
        // this.router = PromiseRouter()
        this.env = CONFIG.NODE_ENV
        this.port = CONFIG.PORT || 3000

        this.initializeMiddleware()
        this.initializeRoutes()
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

    private initializeRoutes() {
        this.app.get("/", (req, res, next) => IndexController.index(req, res, next))
        // this.app.get("/test", (req, res, next) => IndexController.testing(req, res, next))
        this.postAsync("/test", IndexController.testing)
        // this.app.get("/test", wrap(async (req, res, next) => await IndexController.testing(req, res, next)))
        this.postAsync("/api/cloudflare/usage", UsageController.getUsageStatistics)
    }

    public postAsync(route: string, handler: any) {
        this.app.post(route, async (req, res, next) => {
            try {
                await handler(req, res, next)
            } catch (error) {
                next(error)
            }
        })
    }
}
