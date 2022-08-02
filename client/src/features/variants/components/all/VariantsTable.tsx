import Cloudflare from "cloudflare-images"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useConfirm } from "material-ui-confirm"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import EyeIcon from "@mui/icons-material/RemoveRedEye"

import { Actions, Selectors } from "@app/state"
import { DataTable, DataTableColumn  } from "@feature/common"

const ActionsColumn = ({ row }: { row: Cloudflare.Variants.Variant }): JSX.Element => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const confirm = useConfirm()

    const handleViewClick = () => {
        navigate(`/variants/${row.id}`)
    }

    const handleEditClick = () => {
        navigate(`/variants/${row.id}/edit`)
    }

    const handleDeleteClick = () => {
        confirm({
            title: "Confirm Deletion",
            description: "Are you sure you want to delete this variant?",
            confirmationButtonProps: { color: "error", variant: "contained" },
            cancellationButtonProps: { color: "info",  variant: "contained" },
        })
            .then(() => {
                dispatch(Actions.Variants.submitDelete(row.id))
            })
            .catch(() => {
                console.debug("variant delete not confirmed")
            })
    }

    return (
        <Stack direction="row" sx={{ whiteSpace: "nowrap" }}>
            {/* <Tooltip title="Details" placement="top">
                <IconButton onClick={handleViewClick}>
                    <EyeIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="top">
                <IconButton onClick={handleEditClick}>
                    <EditIcon />
                </IconButton>
            </Tooltip> */}
            <Tooltip title="Delete" placement="top">
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon color="primary" />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

const columns: DataTableColumn<Cloudflare.Variants.Variant>[] = [
    {
        field: "id",
        header: "Id",
        sortable: true,
    },
    {
        field: "options",
        header: "Height",
        sortable: false,
        align: "center",
        renderFunc: (row) => row.options.height,
    },
    {
        field: "options",
        header: "Width",
        sortable: false,
        align: "center",
        renderFunc: (row) => row.options.width,
    },
    {
        field: "options",
        header: "Fit",
        sortable: false,
        align: "center",
        renderFunc: (row) => row.options.fit,
    },
    {
        field: "id",
        header: "Actions",
        sortable: false,
        align: "center",
        renderFunc: (row) => <ActionsColumn row={row} />,
    },
]

export const VariantsTable = (_props: unknown): JSX.Element => {

    const rows = useSelector(Selectors.Variants.filtered)
    const fetching = useSelector(Selectors.Variants.requests.fetchAll.fetching)

    return (
        <DataTable
            rows={rows}
            columns={columns}
            progressPending={fetching}
            pagination={false}
            paginationServer={false}
            noDataMessage="No variants found"
        />
    )
}
