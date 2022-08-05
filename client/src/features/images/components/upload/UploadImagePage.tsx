import { useSelector } from "react-redux"
import Box from "@mui/material/Box"

import { Selectors } from "@app/state"
import { CrumbProps, Page } from "@feature/common"
import { UploadImageForm } from "."

const crumbs: CrumbProps[] = [
    { title: "Images", to: "/images", last: false },
    { title: "Upload", to: "/images/create", last: true },
]

export const UploadImagePage = (_props: unknown): JSX.Element => {

    const submitting = useSelector(Selectors.Images.requests.create.submitting)

    return (
        <Page title="Upload Image" loading={submitting} crumbs={crumbs}>
            <Box>
                <UploadImageForm />
            </Box>
        </Page>
    )
}
