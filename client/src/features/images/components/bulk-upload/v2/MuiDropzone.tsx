import { DropzoneArea } from "mui-file-dropzone"
import { useState } from "react"

export const MuiDropzone = (_props: unknown): JSX.Element => {
    const [files, setFiles] = useState([])

    const handleChange = (files) => {
        setFiles(files)
    }

    return (
        <DropzoneArea
            onChange={handleChange}
            filesLimit={25}
        />
    )
}
