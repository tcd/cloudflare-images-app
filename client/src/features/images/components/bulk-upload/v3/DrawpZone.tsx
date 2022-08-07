import { useState } from "react"

import { DropZoneArea } from "@feature/common"

export const DrawpZone = (_props: unknown): JSX.Element => {
    const [files, setFiles] = useState([])

    const handleChange = (files) => {
        setFiles(files)
        console.log(files)
    }

    return (
        <DropZoneArea
            onChange={handleChange}
            filesLimit={25}
            showAlerts={false}
            showFileNamesInPreview={true}
            showFileNames={true}
        />
    )
}
