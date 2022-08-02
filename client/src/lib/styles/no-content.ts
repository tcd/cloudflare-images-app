import { SxProps } from "@mui/material"

export const NoContent: SxProps = {
    "&::after": {
        content: "\u200B",
        visibility: "hidden",
    },
}
