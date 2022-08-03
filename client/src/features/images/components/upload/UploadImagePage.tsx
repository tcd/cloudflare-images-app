import Box from "@mui/material/Box"

import { Page } from "@feature/common"
import { UploadImageForm } from "."

export const UploadImagePage = (_props: unknown): JSX.Element => {
    return (
        <Page title="Upload Image">
            <Box>
                <UploadImageForm />
            </Box>
        </Page>
    )
}
