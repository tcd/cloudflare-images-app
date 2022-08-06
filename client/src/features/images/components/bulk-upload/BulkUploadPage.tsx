import { useSelector } from "react-redux"
import Box from "@mui/material/Box"

import { Selectors } from "@app/state"
import { CrumbProps, Page } from "@feature/common"
import { BulkUploadForm } from "./BulkUploadForm"

const crumbs: CrumbProps[] = [
    { title: "Images",      to: "/images",             last: false },
    { title: "Bulk Upload", to: "/images/bulk-upload", last: true },
]

export const BulkUploadPage = (_props: unknown): JSX.Element => {

    const submitting = useSelector(Selectors.Images.requests.create.submitting)

    return (
        <Page title="Bulk Upload" loading={submitting} crumbs={crumbs}>
            <Box>
                <BulkUploadForm />
            </Box>
        </Page>
    )
}
