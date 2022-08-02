import "@src/config/configure"
import App from "@src/app"
import {
    IndexController,
    ImagesController,
    UsageController,
    VariantsController,
} from "@src/controllers"
import { validateEnv } from "@src/config"

validateEnv()

const app = new App([
    IndexController,
    ImagesController,
    UsageController,
    VariantsController,
])
app.listen()
