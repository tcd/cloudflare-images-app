import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Actions, Selectors } from "@app/state"
import { DeterminateSpinner, OverlaySpinner } from "@feature/common"

export const FetchAllHandler = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const [notified, setNotified] = useState(false)

    const updateInProgress = useSelector(Selectors.Images.update.inProgress)
    const shouldFetchNext  = useSelector(Selectors.Images.requests.fetchOnePage.shouldFetch)

    const currentPage = useSelector(Selectors.Images.update.currentPage)
    const totalPages  = useSelector(Selectors.Core.apiPageCount)

    const progress = (currentPage / totalPages) * 100
    const complete = (currentPage == totalPages)

    const $spinner = <DeterminateSpinner value={progress} />

    useEffect(() => {
        if (updateInProgress) {
            if (shouldFetchNext) {
                dispatch(Actions.Images.fetchOnePage())
            }
        }
        if (complete && !notified) {
            setNotified(true)
            dispatch(Actions.Notifications.addNotification({
                message: "Image Sync Complete",
                variant: "success",
            }))
        }
    }, [dispatch, updateInProgress, shouldFetchNext, complete, notified, setNotified])

    return (
        <OverlaySpinner
            open={updateInProgress}
            spinner={$spinner}
        />
    )
}
