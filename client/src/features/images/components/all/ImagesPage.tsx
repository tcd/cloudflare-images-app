import { useDispatch } from "react-redux"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import SyncIcon from "@mui/icons-material/Sync"

import { DebouncedTextField, Page } from "@feature/common"
import { Actions } from "@app/state"
import { ImagesTable } from "./ImagesTable"

export const ImagesPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(Actions.Images.beginUpdate())
    }

    const pageAction = (
        <Stack direction="row">
            <Filter />
            <Tooltip title="Refresh">
                <IconButton onClick={handleClick} sx={{ ml: 4 }}>
                    <SyncIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    )

    return (
        <Page title="Images" action={pageAction}>
            <ImagesTable />
        </Page>
    )
}

const Filter = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(Actions.Images.setSearchFilter({ filter: event.target.value }))
    }

    return (
        <DebouncedTextField
            label="Filter"
            onChange={handleChange}
        />
    )
}
