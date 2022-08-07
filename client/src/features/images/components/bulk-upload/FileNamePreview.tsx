import type { SxProps, TypographyProps } from "@mui/material"
import Typography from "@mui/material/Typography"

import {
    transformFileName,
    BulkUploadForm as FormData,
} from "@app/lib"

export interface FileNamePreview {
    fileName: string
    options: FormData.BulkUploadFormData
}

const sx: SxProps = {
    "& span": {
        marginRight: "20px",
    },
}

const typographyProps: TypographyProps = {
    variant: "code",
    display: "inline",
    sx: {
        marginRight: "20px",
    },
}

export const FileNamePreview = (props: FileNamePreview): JSX.Element => {
    return (
        <Typography sx={sx}>
            <Typography {...typographyProps}>{props.fileName}</Typography>
            <Typography {...typographyProps}>--&gt;</Typography>
            <Typography {...typographyProps}>{transformFileName(props)}</Typography>
        </Typography>
    )
}
