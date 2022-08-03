import "@src/config/configure"
import { App } from "@src/app"
import { validateEnv } from "@src/config"

validateEnv()

const app = new App()
app.listen()
