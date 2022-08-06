import { useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import Box from "@mui/material/Box"
import LoadingButton from "@mui/lab/LoadingButton"
import InputLabel, { InputLabelProps } from "@mui/material/InputLabel"


import { Card, FormikInput, FormikFileInput, FormikSwitch } from "@feature/common"
import { Actions } from "@app/state"
import { ImageForm, isBlank } from "@app/lib"
// import { Previews, MuiDropzone } from "./v2"
import { DrawpZone } from "./v3"

const inputLabelProps: InputLabelProps = {
    htmlFor: "trans-input",
    sx: {
        mb: 2,
    },
}

export const BulkUploadForm = (_props: unknown): JSX.Element => {

    const filesArray = useRef([])

    const handleSubmitClick = () => {
        console.log()
    }

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({ onDrop })


    // useEffect(() => {
    //     if (editor.current) {
    //         setContainer(editor.current)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [editor.current])


    return (
        <Card>
            <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
                <Box>
                    {/* <Previews /> */}
                    {/* <MuiDropzone /> */}
                    <DrawpZone />
                </Box>
                <Box sx={{ mt: 3 }}>
                    <LoadingButton
                        variant="contained"
                        // loading={formik.isSubmitting}
                        // disabled={!formik.isValid}
                        onClick={handleSubmitClick}
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </Box>
        </Card>
    )
}
