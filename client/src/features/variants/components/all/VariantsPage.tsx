import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"

import { DebouncedTextField, Page } from "@feature/common"
import { Actions, Selectors } from "@app/state"
import { VariantsTable } from "./VariantsTable"

export const VariantsPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const shouldFetch = useSelector(Selectors.Variants.requests.fetchAll.shouldFetch)

    useEffect(() => {
        if (shouldFetch) {
            dispatch(Actions.Variants.fetchAll())
        }
    }, [dispatch, shouldFetch])

    const handleClick = () => {
        navigate("/variants/create")
    }

    const pageAction = (
        <Stack direction="row">
            <Filter />
            <Tooltip title="New Variant">
                <IconButton onClick={handleClick} sx={{ ml: 4 }}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    )

    return (
        <Page title="Variants" action={pageAction}>
            <VariantsTable />
        </Page>
    )
}

const Filter = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const filter = useSelector(Selectors.Variants.searchFilter)

    const handleChange = (event) => {
        dispatch(Actions.Variants.setSearchFilter({ filter: event.target.value }))
    }

    return (
        <DebouncedTextField
            label="Filter"
            onChange={handleChange}
            value={filter}
        />
    )
}
