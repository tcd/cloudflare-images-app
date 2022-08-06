import { useState } from "react"

import { DropzoneArea } from "@feature/common"

export const DrawpZone = (_props: unknown): JSX.Element => {
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
