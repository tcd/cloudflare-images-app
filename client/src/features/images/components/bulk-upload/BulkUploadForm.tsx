import type { InputLabelProps } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFormik } from "formik"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import LoadingButton from "@mui/lab/LoadingButton"

import {
    Card,
    CardProps,
    FormikInput,
    FormikFileInput,
    FormikSwitch,
    FormikSelect,
    DropZoneArea,
    FileObject,
    If,
} from "@feature/common"
import { Actions } from "@app/state"
import { BulkUploadForm as FormData } from "@app/lib"
// import { Previews, MuiDropzone } from "./v2"
import { FileNamePreview } from "./FileNamePreview"
import { ResultsPreview } from "./ResultsPreview"

const inputLabelProps: InputLabelProps = {
    htmlFor: "trans-input",
    sx: {
        mb: 2,
    },
}

const cardProps: Partial<CardProps> = {
    CardProps: {
        elevation: 4,
    },
    sx: {
        display: "flex",
        flexFlow: "column nowrap",
        mb: 4,
    },
}

export const BulkUploadForm = (_props: unknown): JSX.Element => {

    const filesArray = useRef([])
    const [files, setFiles] = useState<File[]>([])
    const [fileObjects, setFileObjects] = useState<FileObject[]>([])
    const [fileData, setFileData] = useState<Record<string, any>>({})

    // const setFiles = (files: File[]) => {
    //     const fileNames = files.map(x => x.name)
    //     const newFileData = {}
    //     for (const name of fileNames) {

    //     }
    //     // const newFileData = fileData.filter()
    // }

    // const handleSubmitClick = (values) => {
    //     alert(JSON.stringify(values, null, 4))
    // }

    const handleFilesChange = (files: FileObject[]) => {
        setFileObjects(files)
        setFiles(files.map(x => x.file))
    }

    const formik = useFormik({
        initialValues: FormData.initialValues,
        validate: FormData.validate,
        onSubmit: (values) => {
            // handleSubmitClick(values)
            alert(JSON.stringify(values, null, 4))
        },
    })

    // const onDrop = useCallback((acceptedFiles) => {
    //     // Do something with the files
    // }, [])

    // const {
    //     getRootProps,
    //     getInputProps,
    //     isDragActive,
    // } = useDropzone({ onDrop })

    // useEffect(() => {
    //     if (editor.current) {
    //         setContainer(editor.current)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [editor.current])

    return (
        <Card>
            <Card title="Keys" {...cardProps}>
                <Grid container direction="column">
                    <FormikSwitch
                        formik={formik}
                        id="removeExtension"
                        label="Remove File Extension"
                    />
                    <FormikSelect
                        formik={formik}
                        id="caseChange"
                        label="Case Change"
                        options={FormData.caseChangeOptions}
                    />
                    <FormikInput
                        formik={formik}
                        id="idTransform"
                        label="Id Transformation"
                        type="text"
                    />
                </Grid>
            </Card>
            <Card title="Files" {...cardProps}>
                <DropZoneArea
                    onChange={handleFilesChange}
                    filesLimit={25}
                    showAlerts={false}
                    showFileNamesInPreview={true}
                    showFileNames={true}
                    // on
                />
            </Card>
            <Card title="Results" {...cardProps}>
                <ResultsPreview files={files} options={formik.values} />
            </Card>
            <Box sx={{ mt: 3 }}>
                <LoadingButton
                    variant="contained"
                    // loading={formik.isSubmitting}
                    // disabled={!formik.isValid}
                    onClick={formik.submitForm}
                >
                    Submit
                </LoadingButton>
            </Box>
        </Card>
    )
}
