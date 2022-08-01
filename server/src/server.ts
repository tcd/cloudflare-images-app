import App from "@src/app"
import {
    IndexController,
    CloudflareController,
} from "@src/controllers"
import validateEnv from "@src/utils/validateEnv"

validateEnv()

const app = new App([
    IndexController,
    CloudflareController,
])
app.listen()
