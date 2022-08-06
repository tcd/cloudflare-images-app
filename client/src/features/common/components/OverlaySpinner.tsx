import type { SxProps, Theme } from "@mui/material"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

const backdropSx: SxProps = {
    color: "#fff",
    zIndex: (theme: Theme) => theme.zIndex.overlay,
}

export interface OverlaySpinnerProps {
    open: boolean
    /**
     * Optional.
     * Spinner component.
     */
    spinner?: JSX.Element
}

export const OverlaySpinner = ({ open, ...props }: OverlaySpinnerProps): JSX.Element => {

    const $spinner = props?.spinner ?? <CircularProgress color="inherit" />
    return (
        <Backdrop sx={backdropSx} open={open}>
            {$spinner}
        </Backdrop>
    )
}
