import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import {
    transformFileName,
    BulkUploadForm as FormData,
} from "@app/lib"

interface ResultsPreviewProps {
    files: File[]
    options: FormData.BulkUploadFormData
}

const defaultProps: Partial<ResultsPreviewProps> = {
    files: [],
}

export const ResultsPreview = (props: ResultsPreviewProps): JSX.Element => {
    const {
        files,
        options,
    } = { ...defaultProps, ...props }

    const $rows = files.map((file, index) => {
        return (
            <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell>{file.name}</TableCell>
                <TableCell>{transformFileName({ fileName: file.name, options })}</TableCell>
            </TableRow>
        )
    })

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Original File Name</TableCell>
                        <TableCell>Transformed Key</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {$rows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
