import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import { Actions, Selectors } from "@app/state"
import { CrumbProps, Page, DeterminateSpinner } from "@feature/common"
import { BulkUploadForm } from "./BulkUploadForm"

const crumbs: CrumbProps[] = [
    { title: "Images",      to: "/images",             last: false },
    { title: "Bulk Upload", to: "/images/bulk-upload", last: true },
]

export const BulkUploadPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [notified, setNotified] = useState(false)

    const inProgress = useSelector(Selectors.Images.bulkUpload.inProgress)
    const progress = useSelector(Selectors.Images.bulkUpload.progress)
    const complete = useSelector(Selectors.Images.bulkUpload.complete)

    const $spinner = <DeterminateSpinner value={progress} />

    useEffect(() => {
        if (complete && !notified) {
            setNotified(true)
            dispatch(Actions.Notifications.addNotification({
                message: "Bulk Upload Completed",
                variant: "success",
            }))
            navigate("/images")
        }
    }, [dispatch, navigate, complete, notified, setNotified])

    return (
        <Page
            title="Bulk Upload"
            loading={inProgress}
            crumbs={crumbs}
            spinner={$spinner}
        >
            <BulkUploadForm />
        </Page>
    )
}
