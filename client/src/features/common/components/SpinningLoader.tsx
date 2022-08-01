import { Box, CircularProgress, SxProps } from "@mui/material"

const FLEX_CENTER_SX: SxProps = {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center", // center items vertically, in this case
    alignItems: "center",     // center items horizontally, in this case
    flexGrow: 1,
}

export interface SpinningLoaderProps {
    sx?: SxProps
}

const defaultSx: SxProps = {
    ...FLEX_CENTER_SX,
    height: "250px",
}

export const SpinningLoader = (props: SpinningLoaderProps): JSX.Element => {
    const sxProps = props?.sx ?? {}
    const sx = {
        ...defaultSx,
        ...sxProps,
    }

    return (
        <Box className="flex-center" sx={sx}>
            <CircularProgress />
        </Box>
    )
}
