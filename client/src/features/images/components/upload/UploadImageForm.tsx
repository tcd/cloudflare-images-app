import { useState } from "react"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import Box from "@mui/material/Box"
import LoadingButton from "@mui/lab/LoadingButton"

import { Card, FormikInput, FormikFileInput, FormikSwitch } from "@feature/common"
import { Actions } from "@app/state"
import { ImageForm, isBlank } from "@app/lib"

// =============================================================================

export const UploadImageForm = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const [fileData, setFileData] = useState(null)

    const handleSubmit = (values: ImageForm.CreateImageFormData) => {
        const formData = new FormData()
        formData.append("id", values.id)
        formData.append("fileName", values.fileName)
        formData.append("requireSignedURLs", values.requireSignedURLs.toString())
        formData.append("fileData", fileData, values.fileName)
        dispatch(Actions.Images.submitCreate(formData))
    }

    const formik = useFormik({
        initialValues: ImageForm.initialValues,
        // validationSchema: VariantSchema,
        validate: ImageForm.validate,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    })

    const handleSubmitClick = async () => {
        await formik.validateForm()
        if (formik.isValid) {
            formik.submitForm()
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // lastModified: 1659540158894
        // lastModifiedDate: Wed Aug 03 2022 10:22:38 GMT-0500 (Central Daylight Time) {}
        // name: "w3c_home.png"
        // size: 2028
        // type: "image/png"
        // webkitRelativePath: ""
        const file = event?.target?.files?.[0]
        if (file) {
            setFileData(file)
            if (isBlank(formik.values.fileName)) {
                formik.setFieldValue("fileName", file.name)
            }
            if (isBlank(formik.values.id)) {
                formik.setFieldValue("id", file.name)
            }
        }
        // debugger
    }

    const cardFooter = (
        <Box sx={{ mt: 3 }}>
            <LoadingButton
                variant="contained"
                // loading={formik.isSubmitting}
                disabled={!formik.isValid}
                onClick={handleSubmitClick}
            >
                Submit
            </LoadingButton>
        </Box>
    )

    return (
        <Card footer={cardFooter}>
            <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
                <FormikInput
                    formik={formik}
                    id="id"
                    label="Id"
                    type="text"
                />
                <FormikInput
                    formik={formik}
                    id="fileName"
                    label="File Name"
                    type="text"
                />
                <FormikSwitch
                    formik={formik}
                    id="requireSignedUrls"
                    label="Require Signed URLs"
                />
                <FormikFileInput
                    formik={formik}
                    id="fileData"
                    label="Image"
                    onChange={handleFileChange}
                />
            </Box>
        </Card>
    )
}
