import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import SyncIcon from "@mui/icons-material/Sync"

import { DebouncedTextField, Page } from "@feature/common"
import { Actions, Selectors } from "@app/state"

export const VariantCreatePage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    // const shouldFetch = useSelector(Selectors.Variants.requests.fetchOne.shouldFetch)

    // useEffect(() => {
    //     if (shouldFetch) {
    //         dispatch(Actions.Variants.fetchAll())
    //     }
    // }, [dispatch, shouldFetch])

    return (
        <Page title="New Variant">
        </Page>
    )
}
