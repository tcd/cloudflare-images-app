import { ReactNode } from "react"
import { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

interface HeadingProps {
    title: string
    children?: ReactNode
}

const containerSx: SxProps = {
    display: "flex",
    flexFlow: "column nowrap",
    boxSizing: "border-box",
}

const rowSx: SxProps = {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
}

const childrenContainerSx: SxProps = {
    justifySelf: "stretch",
    display: "flex",
    alignItems: "center",
    mr: 2,
}

const dividerSx: SxProps = {
    boxSizing: "border-box",
    mt: 1,
    mb: 5,
}

export const Heading = (props: HeadingProps): JSX.Element => {
    const { title, children } = props || {}

    if (!title) {
        return null
    }

    return (
        <Box sx={containerSx}>
            <Box sx={rowSx}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
                <Box sx={childrenContainerSx}>
                    <>{children && children}</>
                </Box>
            </Box>
            <Divider sx={dividerSx} />
        </Box>
    )
}

