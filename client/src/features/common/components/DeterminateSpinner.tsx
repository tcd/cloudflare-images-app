import type { SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

const boxSx: SxProps = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

export interface DeterminateSpinnerProps extends CircularProgressProps {
    /**
     * Percentage of 100.
     */
    value: number
}

export const DeterminateSpinner = (props: DeterminateSpinnerProps): JSX.Element => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" {...props} />
            <Box sx={boxSx}>
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}
