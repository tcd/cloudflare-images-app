import { logger } from "./logger"

export const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf("\n")))
    },
}
