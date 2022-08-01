import { Controller, Get, HttpCode } from "routing-controllers"

@Controller()
export class IndexController {
    @Get("/")
    @Get("/api")
    @Get("/api/cloudflare")
    @Get("/api/cloudflare/images")
    @Get("/api/cloudflare/variants")
    @HttpCode(200)
    public index() {
        return { message: "ok" }
    }
}
