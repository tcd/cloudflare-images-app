import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useConfirm } from "material-ui-confirm"
import { DateTime } from "luxon"
import { useQueryParam, NumberParam } from "use-query-params"


import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import EyeIcon from "@mui/icons-material/RemoveRedEye"
import DeleteIcon from "@mui/icons-material/Delete"
import LaunchIcon from "@mui/icons-material/Launch"

import { ImageWithoutVariantsWithSrc, isBlank } from "@app/lib"
import { Actions, Selectors } from "@app/state"
import { DataTable, DataTableColumn  } from "@feature/common"

export const ImagesTable = (_props: unknown): JSX.Element => {

    const rows = useSelector(Selectors.Images.all.filteredWithSrc)

    const [currentPage, setCurrentPage] = useQueryParam("page", NumberParam, { updateType: "replace" })
    const [perPage, setPerPage]         = useQueryParam("rows", NumberParam, { updateType: "replace" })

    // if (isBlank(perPage)) {
    //     setPerPage(10)
    // }

    const handleChangePage = (page: number, totalRows: number): void => {
        setCurrentPage(page)
        // setPerPage(currentRowsPerPage)
        console.log(currentPage)
        // console.log(currentPageArg)
    }

    const handleChangeRowsPerPage = (currentRowsPerPage: number, currentPageArg: number): void => {
        setPerPage(currentRowsPerPage)
        // setCurrentPage(currentPageArg)
        // console.log(currentPage)
        // console.log(currentPageArg)
    }

    return (
        <DataTable
            rows={rows}
            columns={columns}
            noDataMessage="No images found"
            // progressPending={fetching}
            pagination={true}
            paginationServer={false}
            paginationPerPage={15}
            paginationComponentOptions={{
                noRowsPerPage: false,
            }}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            // paginationRowsPerPageOptions={[ 15, 20, 25, 30 ]}
            onChangePage={handleChangePage}
        />
    )
}

const columns: DataTableColumn<ImageWithoutVariantsWithSrc>[] = [
    {
        field: "id",
        header: null,
        sortable: false,
        align: "center",
        renderFunc: (row) => <ImgColumn image={row} />,
    },
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
        renderFunc: (row) => <ActionsColumn image={row} />,
    },
]

const ImgColumn = ({ image }: { image: ImageWithoutVariantsWithSrc }): JSX.Element => {
    return (
        <Box sx={{ width: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
                style={{
                    maxWidth: "100%",
                    height: "auto",
                }}
                src={image.src}
                alt={image.filename}
            />
        </Box>
    )
}

const ActionsColumn = ({ image }: { image: ImageWithoutVariantsWithSrc }): JSX.Element => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const confirm = useConfirm()

    const creds = useSelector(Selectors.Core.credentials)
    const externalLink = `https://dash.cloudflare.com/${creds.accountId}/images/images/${image.id}`

    const handleViewClick = () => {
        navigate(`/images/${encodeURIComponent(image.id)}`)
    }

    const handleEditClick = () => {
        navigate(`/images/${image.id}/edit`)
    }

    const handleDeleteClick = () => {
        confirm({
            title: "Confirm Deletion",
            description: "Are you sure you want to delete this image?",
            confirmationButtonProps: { color: "error", variant: "contained" },
            cancellationButtonProps: { color: "info",  variant: "contained" },
        })
            .then(() => {
                dispatch(Actions.Images.submitDelete(image.id))
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
