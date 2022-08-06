import { SnackbarProvider } from "notistack"
import * as DZA from "./DropzoneArea"

export type DropzoneAreaProps = DZA.DropzoneAreaProps

export const DropZoneArea = (props: DZA.DropzoneAreaProps): JSX.Element => {
    return (
        <SnackbarProvider maxSnack={10}>
            <DZA.DropzoneArea {...props} />
        </SnackbarProvider>
    )
}
