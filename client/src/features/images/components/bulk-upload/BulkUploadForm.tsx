import { useCallback, useEffect, useRef, useState } from "react"
import type { InputLabelProps } from "@mui/material"
import { useDropzone } from "react-dropzone"
import { useFormik } from "formik"
import Box from "@mui/material/Box"
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
} from "@feature/common"
import { Actions } from "@app/state"
import { BulkUploadForm as FormData } from "@app/lib"
// import { Previews, MuiDropzone } from "./v2"
import { DrawpZone } from "./v3"

const inputLabelProps: InputLabelProps = {
    htmlFor: "trans-input",
    sx: {
        mb: 2,
    },
}

const cardProps: Partial<CardProps> = {
    CardProps: {
        elevation: 3,
    },
    sx: {
        my: 2,
    },
}

export const BulkUploadForm = (_props: unknown): JSX.Element => {

    const filesArray = useRef([])

    const handleSubmitClick = () => {
        console.log()
    }

    const formik = useFormik({
        initialValues: FormData.initialValues,
        // validationSchema: VariantSchema,
        // validate: VariantForm.validate,
        onSubmit: (values) => {
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
                    <br />
                    <FormikInput
                        formik={formik}
                        id="transformationInput"
                        label="Transformation - Input"
                        type="text"
                    />
                    <FormikInput
                        formik={formik}
                        id="transformationOutput"
                        label="Transformation - Output"
                        type="text"
                    />
                </Grid>
            </Card>
            <Card title="Files" {...cardProps}>
                {/* <Previews /> */}
                {/* <MuiDropzone /> */}
                <DrawpZone />
            </Card>
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
        </Card>
    )
}
