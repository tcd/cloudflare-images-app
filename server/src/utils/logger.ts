import { ConsoleLogger } from "."

const logger = new ConsoleLogger()

const stream = {
    write: (message: string) => {
        console.info(message.substring(0, message.lastIndexOf("\n")))
    },
}

export { logger, stream }
