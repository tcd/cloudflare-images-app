import { Application } from "express"

import { IRouteData } from "@src/types"
import {
    IndexController,
    UsageController,
    ImagesController,
    VariantsController,
} from "@src/controllers"

const ROUTES: IRouteData[] = [
    { method: "GET",  route: "/",     handler: IndexController.index   },
    { method: "POST", route: "/test", handler: IndexController.testing },

    { method: "POST", route: "/api/cloudflare/usage", handler: UsageController.getUsageStatistics },

    { method: "POST", route: "/api/cloudflare/images/list",   handler: ImagesController.listImages  },
    { method: "POST", route: "/api/cloudflare/images/get",    handler: ImagesController.getImage    },
    { method: "POST", route: "/api/cloudflare/images/create", handler: ImagesController.createImage },
    { method: "POST", route: "/api/cloudflare/images/delete", handler: ImagesController.deleteImage },

    { method: "POST", route: "/api/cloudflare/variants/list",   handler: VariantsController.listVariants  },
    { method: "POST", route: "/api/cloudflare/variants/get",    handler: VariantsController.getVariant    },
    { method: "POST", route: "/api/cloudflare/variants/create", handler: VariantsController.createVariant },
    { method: "POST", route: "/api/cloudflare/variants/update", handler: VariantsController.updateVariant },
    { method: "POST", route: "/api/cloudflare/variants/delete", handler: VariantsController.deleteVariant },
]

export class RouteBuilder {
    private app: Application

    constructor(app: Application) {
        this.app = app
    }

    public build(): void {
        for (const { method, route, handler } of ROUTES) {
            if (method == "POST") {
                this.postAsync(route, handler)
            } else {
                this.getAsync(route, handler)
            }
        }
    }

    private getAsync(route: string, handler: any) {
        this.app.get(route, async (req, res, next) => {
            try {
                await handler(req, res, next)
            } catch (error) {
                next(error)
            }
        })
    }

    private postAsync(route: string, handler: any) {
        this.app.post(route, async (req, res, next) => {
            try {
                await handler(req, res, next)
            } catch (error) {
                next(error)
            }
        })
    }
}
