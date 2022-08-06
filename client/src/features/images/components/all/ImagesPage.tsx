import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "luxon"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import SyncIcon from "@mui/icons-material/Sync"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
// import FileUploadIcon from "@mui/icons-material/FileUpload"

import { isBlank } from "@app/lib"
import { Actions, Selectors } from "@app/state"
import { CrumbProps, DebouncedTextField, Page } from "@feature/common"
import { ImagesTable, ImagesGrid } from "."

const crumbs: CrumbProps[] = [
    { title: "Images", to: "/images", last: true },
]

export const ImagesPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleting = useSelector(Selectors.Images.requests.delete.submitting)

    const handleRefreshClick = () => {
        dispatch(Actions.Images.beginUpdate())
    }

    const handleCreateClick = () => {
        navigate("/images/create")
    }

    const pageAction = (
        <Stack direction="row" alignItems="flex-end">
            <Filter />
            <Tooltip title="Refresh" placement="top">
                <IconButton onClick={handleRefreshClick} sx={{ ml: 2 }}>
                    <SyncIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Upload Image" placement="top">
                <IconButton onClick={handleCreateClick} sx={{}}>
                    <AddIcon color="primary" />
                </IconButton>
            </Tooltip>
        </Stack>
    )

    return (
        <Page title="Images" action={pageAction} loading={deleting} crumbs={crumbs}>
            {/* <ImagesTable /> */}
            <ImagesGrid />
        </Page>
    )
}

const Filter = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const value = useSelector(Selectors.Images.searchFilter)
    const key = useRef(DateTime.now().toISO())

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
            debounceDuration={150}
            key={key.current}
            label="Filter"
            value={value}
            onChange={handleChange}
            InputProps={{ endAdornment: clearButton }}
        />
    )
}
