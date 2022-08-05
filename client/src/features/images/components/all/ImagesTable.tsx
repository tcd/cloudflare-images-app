import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useConfirm } from "material-ui-confirm"
import { DateTime } from "luxon"

import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import EyeIcon from "@mui/icons-material/RemoveRedEye"
import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
import LaunchIcon from "@mui/icons-material/Launch"

import { ImageWithoutVariants } from "@app/lib"
import { Actions, Selectors } from "@app/state"
import { DataTable, DataTableColumn  } from "@feature/common"

export const ImagesTable = (_props: unknown): JSX.Element => {

    const rows = useSelector(Selectors.Images.filteredImages)

    return (
        <DataTable
            rows={rows}
            columns={columns}
            noDataMessage="No images found"
            // progressPending={fetching}
            pagination={true}
            paginationServer={false}
            paginationComponentOptions={{
                noRowsPerPage: false,
            }}
        />
    )
}

const columns: DataTableColumn<ImageWithoutVariants>[] = [
    {
        field: "id",
        header: "Id",
        sortable: true,
    },
    {
        field: "filename",
        header: "File Name",
        sortable: true,
    },
    {
        field: "uploaded",
        header: "Uploaded",
        sortable: true,
        align: "center",
        renderFunc: (row) => DateTime.fromISO(row.uploaded).toFormat("yyyy-MM-dd, hh:mm a"),
    },
    {
        field: "id",
        header: "Actions",
        sortable: false,
        align: "center",
        renderFunc: (row) => <ActionsColumn row={row} />,
    },
]

const ActionsColumn = ({ row }: { row: ImageWithoutVariants }): JSX.Element => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const confirm = useConfirm()

    const creds = useSelector(Selectors.Core.credentials)
    const externalLink = `https://dash.cloudflare.com/${creds.accountId}/images/images/${row.id}`

    const handleViewClick = () => {
        navigate(`/images/${encodeURIComponent(row.id)}`)
    }

    const handleEditClick = () => {
        navigate(`/images/${row.id}/edit`)
    }

    const handleDeleteClick = () => {
        confirm({
            title: "Confirm Deletion",
            description: "Are you sure you want to delete this image?",
            confirmationButtonProps: { color: "error", variant: "contained" },
            cancellationButtonProps: { color: "info",  variant: "contained" },
        })
            .then(() => {
                dispatch(Actions.Images.submitDelete(row.id))
            })
            .catch(() => {
                console.debug("image delete not confirmed")
            })
    }

    return (
        <Stack direction="row" sx={{ whiteSpace: "nowrap" }}>
            <Tooltip title="Details" placement="top">
                <IconButton onClick={handleViewClick}>
                    <EyeIcon color="primary" />
                </IconButton>
            </Tooltip>
            {/* <Tooltip title="Edit" placement="top">
                <IconButton onClick={handleEditClick}>
                    <EditIcon />
                </IconButton>
            </Tooltip> */}
            <Tooltip title="Edit on Cloudflare" placement="top">
                <IconButton component="a" href={externalLink} target="_blank" rel="noopener noreferrer">
                    <LaunchIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon color="primary" />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}
