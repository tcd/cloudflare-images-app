import { useEffect } from "react"
import Cloudflare from "cloudflare-images"
import { useDispatch, useSelector } from "react-redux"
import { useFormik, Formik, Form, Field } from "formik"
import Grid from "@mui/material/Grid"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import SyncIcon from "@mui/icons-material/Sync"

import { DebouncedTextField, Card, FormikTextField } from "@feature/common"
import { Actions, Selectors } from "@app/state"
import { VariantForm } from "@app/lib"
import { TextField } from "@mui/material"
// import { TextField } from "formik-mui"

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
        height: number().required().positive().integer(),
        width: number().required().positive().integer(),
        metadata: string().required().oneOf(Object.values(VariantForm.MetadataOptions)),
        neverRequireSignedURLs: boolean().required(),
    }),
})

export const VariantCreateForm = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: VariantSchema,
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

    return (
        <Card title="New Variant">
            <Grid container direction="column">
                <Grid item container direction="row" columns={2}>
                    <Grid item columns={2}>
                        <FormikTextField
                            id="id"
                            formik={formik}
                            label="Id"
                            type="text"
                        />
                    </Grid>
                    <Grid item columns={2}>
                        Resizing Options
                    </Grid>
                    <Grid item container direction="row" columns={2}>

                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            label="W"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            label="H"
                        />

                    </Grid>
                </Grid>
            </Grid>
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

            <FormikTextField
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
