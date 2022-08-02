import { useDispatch, useSelector } from "react-redux"
import { useFormik, Formik, Form, Field } from "formik"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LoadingButton from "@mui/lab/LoadingButton"

import { Card, CustomSelect, FormikInput, FormikSelect } from "@feature/common"
import { Actions, Selectors } from "@app/state"
import { VariantForm } from "@app/lib"

const initialValues: VariantForm.CreateVariantFormData = {
    id: "",
    fit: "scale-down",
    height: 768,
    width: 1366,
    metadata: "none",
    neverRequireSignedURLs: false,
}

import { object, string, number, boolean } from "yup"

const VariantSchema = object({
    id: string().required(),
    options: object({
        fit: string().required().oneOf(Object.values(VariantForm.VariantFits)),
        height: number().required().min(0).positive().integer(),
        width: number().required().min(0).positive().integer(),
        metadata: string().required().oneOf(Object.values(VariantForm.MetadataOptions)),
        neverRequireSignedURLs: boolean().required(),
    }),
})

export const VariantCreateForm = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: VariantSchema,
        validate: VariantForm.validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    // const shouldFetch = useSelector(Selectors.Variants.requests.fetchOne.shouldFetch)

    // useEffect(() => {
    //     if (shouldFetch) {
    //         dispatch(Actions.Variants.fetchAll())
    //     }
    // }, [dispatch, shouldFetch])

    const handleSubmitClick = async () => {
        await formik.validateForm()
        if (formik.isValid) {
            formik.submitForm()
        }
    }

    const cardFooter = (
        <Box sx={{ mt: 3 }}>
            <LoadingButton
                variant="contained"
                loading={formik.isSubmitting}
                disabled={!formik.isValid}
                onClick={handleSubmitClick}
            >
                Submit
            </LoadingButton>
        </Box>
    )

    return (
        <Card footer={cardFooter}>
            <Grid container direction="column">
                <FormikInput
                    id="id"
                    formik={formik}
                    label="Id"
                    type="text"
                />
                <Box>
                    Resizing Options
                </Box>
                <FormikInput
                    id="width"
                    formik={formik}
                    label="Width"
                    type="number"
                />
                <FormikInput
                    id="height"
                    formik={formik}
                    label="Height"
                    type="number"
                />
                <FormikSelect
                    id="fit"
                    options={VariantForm.fitOptions}
                    formik={formik}
                    label="Fit"
                />
                <FormikSelect
                    id="metadata"
                    options={VariantForm.metadataOptions}
                    formik={formik}
                    label="Metadata"
                />
            </Grid>
            {/* <Grid container direction="column">
                <Grid item container direction="row" columns={2}>
                    <Grid item columns={2}>
                        <FormikInput
                            id="id"
                            formik={formik}
                            label="Id"
                            type="text"
                        />
                    </Grid>
                    <Grid item columns={2}>
                        Resizing Options
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            label="Width"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            label="Height"
                        />
                    </Grid>
                </Grid>
            </Grid> */}
        </Card>
    )
}

export const _VariantCreateForm = () => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: VariantSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
    })
    console.log(formik)
    return (
        <form onSubmit={formik.handleSubmit}>

            <FormikInput
                id="id"
                formik={formik}
                label="Id"
                type="text"
            />

            {/* <label htmlFor="id">Id</label>
            <input
                id="id"
                type="text"
                {...formik.getFieldProps("id")}
            />
            {formik.touched.id && formik.errors.id ? (
                <div>{formik.errors.id}</div>
            ) : null} */}

            <label htmlFor="width">Width</label>
            <input
                id="width"
                type="number"
                {...formik.getFieldProps("width")}
            />
            {formik.touched.width && formik.errors.width ? (
                <div>{formik.errors.width}</div>
            ) : null}

            <label htmlFor="height">Height</label>
            <input
                id="height"
                type="number"
                {...formik.getFieldProps("height")}
            />
            {formik.touched.height && formik.errors.height ? (
                <div>{formik.errors.height}</div>
            ) : null}

            <button type="submit">Submit</button>
        </form>
    )
}
