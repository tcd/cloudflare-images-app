import { useSelector } from "react-redux"
import Box from "@mui/material/Box"

import { Selectors } from "@app/state"
import { Page } from "@feature/common"
import { UploadImageForm } from "."

export const UploadImagePage = (_props: unknown): JSX.Element => {

    const submitting = useSelector(Selectors.Images.requests.create.submitting)

    return (
        <Page title="Upload Image" loading={submitting}>
            <Box>
                <UploadImageForm />
            </Box>
        </Page>
    )
}
