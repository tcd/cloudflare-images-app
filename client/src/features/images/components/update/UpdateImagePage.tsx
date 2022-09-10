import { useSelector } from "react-redux"
import Box from "@mui/material/Box"

import { Selectors } from "@app/state"
import { CrumbProps, Page } from "@feature/common"
// import { UpdateImageForm } from "./UpdateImageForm"

const crumbs: CrumbProps[] = [
    { title: "Images", to: "/images", last: false },
    { title: "update", to: "/images/update", last: true },
]

export const UpdateImagePage = (_props: unknown): JSX.Element => {

    const submitting = useSelector(Selectors.Images.requests.update.submitting)

    return (
        <Page title="Update Image" loading={submitting} crumbs={crumbs}>
            <Box>
                {/* <UpdateImageForm /> */}
            </Box>
        </Page>
    )
}
