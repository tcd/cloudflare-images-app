import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { CrumbProps, Page } from "@feature/common"
import { Actions, Selectors } from "@app/state"
import { ImageDetails } from "."

const crumbs: CrumbProps[] = [
    { title: "Images", to: "/images", last: false },
    { title: "Details", to: window.location.pathname, last: true },
]

export const ImageDetailPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const shouldFetch = useSelector(Selectors.Images.requests.fetchOne.shouldFetch)
    const fetching = useSelector(Selectors.Images.requests.fetchOne.fetching)
    const activeId = useSelector(Selectors.Images.active.id)

    useEffect(() => {
        if (shouldFetch) {
            dispatch(Actions.Images.fetchOne(activeId))
        }
    }, [dispatch, shouldFetch, activeId])

    return (
        <Page title="Image Details" loading={fetching} crumbs={crumbs}>
            <ImageDetails />
        </Page>
    )
}
