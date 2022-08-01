import { Controller, Get } from "routing-controllers"

@Controller("/api")
export class IndexController {
    @Get("/")
    index() {
        return "OK"
    }
}
