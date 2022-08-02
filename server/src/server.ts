import "@src/config/configure"
import App from "@src/app"
import {
    IndexController,
    ImagesController,
    VariantsController,
} from "@src/controllers"
import { validateEnv } from "@src/config"

validateEnv()

const app = new App([
    IndexController,
    ImagesController,
    VariantsController,
])
app.listen()
