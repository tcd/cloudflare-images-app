import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "luxon"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import SyncIcon from "@mui/icons-material/Sync"
import ClearIcon from "@mui/icons-material/Clear"

import { isBlank } from "@app/lib"
import { Actions, Selectors } from "@app/state"
import { DebouncedTextField, Page } from "@feature/common"
import { ImagesTable } from "./ImagesTable"
import { useRef } from "react"

export const ImagesPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const deleting = useSelector(Selectors.Images.requests.delete.submitting)

    const handleClick = () => {
        dispatch(Actions.Images.beginUpdate())
    }

    const pageAction = (
        <Stack direction="row" alignItems="flex-end">
            <Filter />
            <div>
                <Tooltip title="Refresh">
                    <IconButton onClick={handleClick} sx={{ ml: 4 }}>
                        <SyncIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Stack>
    )

    return (
        <Page title="Images" action={pageAction} loading={deleting}>
            <ImagesTable />
        </Page>
    )
}

const Filter = (_props: unknown): JSX.Element => {

    const key = useRef(DateTime.now().toISO())
    const dispatch = useDispatch()

    const value = useSelector(Selectors.Images.searchFilter)

    const handleChange = (event) => {
        dispatch(Actions.Images.setSearchFilter({ filter: event.target.value }))
    }

    const handleClearClick = () => {
        key.current = DateTime.now().toISO()
        dispatch(Actions.Images.clearSearchFilter())
    }

    const clearButton = (
        <InputAdornment position="end">
            <IconButton
                disabled={isBlank(value)}
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
            key={key.current}
            label="Filter"
            value={value}
            onChange={handleChange}
            InputProps={{ endAdornment: clearButton }}
        />
    )
}
