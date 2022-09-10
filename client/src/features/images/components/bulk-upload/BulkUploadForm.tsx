import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { DateTime } from "luxon"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LoadingButton from "@mui/lab/LoadingButton"

import {
    Card,
    CardProps,
    FormikInput,
    FormikSwitch,
    FormikSelect,
    DropZoneArea,
    FileObject,
} from "@feature/common"
import { Actions, Selectors } from "@app/state"
import {
    BulkUploadForm as FormConfig,
    transformFileName,
    isDataUri,
    isBlank,
    fileObjectToFormData,
} from "@app/lib"
import { ResultsPreview } from "./ResultsPreview"

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

    const dispatch = useDispatch()

    const inProgress = useSelector(Selectors.Images.bulkUpload.inProgress)
    const currentIndex = useSelector(Selectors.Images.bulkUpload.currentIndex)
    const shouldUploadNext = useSelector(Selectors.Images.requests.createBulk.shouldSubmit)

    const [files, setFiles] = useState<File[]>([])
    const [fileObjects, setFileObjects] = useState<FileObject[]>([])

    const handleFilesChange = (files: FileObject[]) => {
        setFileObjects(files)
        setFiles(files.map(x => x.file))
    }

    const formik = useFormik({
        initialValues: FormConfig.initialValues,
        validate: FormConfig.validate,
        onSubmit: (_values) => {
            dispatch(Actions.Images.beginBulkUpload({ totalImages: files.length }))
        },
    })

    const uploadCurrentFile = useCallback(async () => {
        try {
            if (!inProgress) { return null }
            const { values } = formik
            const fileObject = fileObjects[currentIndex]
            const { file, data } = fileObject
            if (isBlank(data)) {
                dispatch(Actions.Images.cancelBulkUpload({ message: `no data for file named '${file?.name}' at index '${currentIndex}'` }))
                return null
            }
            const formData = await fileObjectToFormData(fileObject, {
                id: transformFileName({ fileName: file.name, options: values }),
                requireSignedURLs: values.requireSignedURLs,
                fileName: file.name,
            })
            dispatch(Actions.Images.submitFileForBulk(formData))
        } catch (error) {
            dispatch(Actions.Images.cancelBulkUpload({ message: error }))
            return null
        }
    }, [dispatch, inProgress, currentIndex, formik, fileObjects])

    useEffect(() => {
        if (inProgress) {
            if (shouldUploadNext) {
                uploadCurrentFile()
            }
        }
    }, [dispatch, inProgress, shouldUploadNext, uploadCurrentFile])

    const canSubmit = (!inProgress && formik.isValid && (files?.length ?? 0) > 0)

    return (
        <Card>
            <Card title="Options" {...cardProps}>
                <Grid container direction="column">
                    <FormikSwitch
                        formik={formik}
                        id="requireSignedURLs"
                        label="Require Signed URLs"
                    />
                    <FormikSwitch
                        formik={formik}
                        id="removeExtension"
                        label="Remove File Extension"
                    />
                    <FormikSelect
                        formik={formik}
                        id="caseChange"
                        label="Id Case Change"
                        options={FormConfig.caseChangeOptions}
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
                    filesLimit={26}
                    showAlerts={false}
                    showFileNamesInPreview={true}
                    showFileNames={true}
                />
            </Card>
            <Card title="Results" {...cardProps}>
                <ResultsPreview files={files} options={formik.values} />
            </Card>
            <Box sx={{ mt: 3 }}>
                <LoadingButton
                    variant="contained"
                    loading={inProgress}
                    disabled={!canSubmit}
                    onClick={formik.submitForm}
                >
                    Submit
                </LoadingButton>
            </Box>
        </Card>
    )
}
