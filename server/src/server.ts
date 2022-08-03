import "@src/config/configure"
import { App } from "@src/App"
import { validateEnv } from "@src/config"

validateEnv()

const app = new App()
app.listen()
