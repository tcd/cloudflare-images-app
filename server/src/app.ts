import "reflect-metadata"
// import { defaultMetadataStorage } from "class-transformer"
import { validationMetadatasToSchemas } from "class-validator-jsonschema"
import express from "express"
import morgan from "morgan"
import { useExpressServer, getMetadataArgsStorage } from "routing-controllers"
import { routingControllersToSpec } from "routing-controllers-openapi"
import swaggerUi from "swagger-ui-express"

import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config"
import {
    errorMiddleware,
    notFoundMiddleware,
} from "@src/middleware"
import { logger, stream } from "@src/utils"

class App {
    public app: express.Application
    public env: string
    public port: string | number

    constructor(Controllers: Function[]) {
        this.app = express()
        this.env = NODE_ENV || "development"
        this.port = PORT || 3000

        this.initializeMiddleware()
        this.initializeRoutes(Controllers)
        this.initializeSwagger(Controllers)
        this.initializeErrorHandling()
    }

    public listen() {
        const message = `
            =================================
            ENV: ${this.env}
            🚀 App listening on port ${this.port}
            =================================
        `.trim()
        this.app.listen(this.port, () => {
            logger.info("server started", { env: this.env, port: this.port })
            // logger.info(`=================================`)
            // logger.info(`ENV: ${this.env}`)
            // logger.info(`🚀 App listening on port ${this.port}`)
            // logger.info(`=================================`)
        })
    }

    public getServer() {
        return this.app
    }

    private initializeMiddleware() {
        this.app.use(morgan(LOG_FORMAT, { stream }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private initializeRoutes(controllers: Function[]) {
        useExpressServer(this.app, {
            cors: {
                origin: ORIGIN,
                credentials: CREDENTIALS,
            },
            controllers: controllers,
            defaultErrorHandler: false,
        })
    }

    private initializeSwagger(controllers: Function[]) {
        const schemas = validationMetadatasToSchemas({
            // classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: "#/components/schemas/",
        })

        const routingControllersOptions = {
            controllers: controllers,
        }

        const storage = getMetadataArgsStorage()
        const spec = routingControllersToSpec(storage, routingControllersOptions, {
            components: {
                schemas,
                // securitySchemes: {
                //     basicAuth: {
                //         scheme: "basic",
                //         type: "http",
                //     },
                // },
            },
            info: {
                title: "Cloudflare Images App",
                version: "1.0.0",
            },
        })

        this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(spec))
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
        this.app.use(notFoundMiddleware)
    }
}

export default App