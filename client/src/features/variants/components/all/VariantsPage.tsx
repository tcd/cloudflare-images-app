import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "luxon"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"

import { isBlank } from "@app/lib"
import { DebouncedTextField, Page, CrumbProps } from "@feature/common"
import { Actions, Selectors } from "@app/state"
import { VariantsTable } from "./VariantsTable"

const crumbs: CrumbProps[] = [
    { title: "Variants", to: "/variants", last: true },
]

export const VariantsPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const shouldFetch = useSelector(Selectors.Variants.requests.fetchAll.shouldFetch)
    const fetching = useSelector(Selectors.Variants.requests.fetchAll.fetching)
    const deleting = useSelector(Selectors.Variants.requests.delete.submitting)

    useEffect(() => {
        if (shouldFetch) {
            dispatch(Actions.Variants.fetchAll())
        }
    }, [dispatch, shouldFetch])

    const handleClick = () => {
        navigate("/variants/create")
    }

    const pageAction = (
        <Stack direction="row" alignItems="flex-end">
            <Filter />
            <Tooltip title="New Variant">
                <IconButton onClick={handleClick} sx={{ ml: 7 }}>
                    <AddIcon color="primary" />
                </IconButton>
            </Tooltip>
        </Stack>
    )

    return (
        <Page title="Variants" action={pageAction} loading={fetching || deleting} crumbs={crumbs}>
            <VariantsTable />
        </Page>
    )
}

const Filter = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const filter = useSelector(Selectors.Variants.searchFilter)
    const key = useRef(DateTime.now().toISO())

    const handleChange = (event) => {
        dispatch(Actions.Variants.setSearchFilter({ filter: event.target.value }))
    }

    const handleClearClick = () => {
        key.current = DateTime.now().toISO()
        dispatch(Actions.Variants.clearSearchFilter())
    }

    const clearButton = (
        <InputAdornment position="end">
            <IconButton
                disabled={isBlank(filter)}
                onClick={handleClearClick}
                onMouseDown={handleClearClick}
                edge="end"
                aria-label="clear"
                size="small"
                sx={{ mb: 1 }}
            >
                <ClearIcon fontSize="small" />
            </IconButton>
        </InputAdornment>
    )

    return (
        <DebouncedTextField
            debounceDuration={150}
            key={key.current}
            label="Filter"
            onChange={handleChange}
            value={filter}
            InputProps={{ endAdornment: clearButton }}
        />
    )
}
