import get from "lodash/get"
import { useFormik } from "formik"
import TextField, { TextFieldProps } from "@mui/material/TextField"

export type FormikInputProps = TextFieldProps & {
    id: string
    formik: ReturnType<typeof useFormik>
}

export const FormikInput = (props: FormikInputProps): JSX.Element => {
    const {
        id,
        formik,
        ...rest
    } = props

    const valuePath   = ["values", id].join(".")
    const touchedPath = ["touched", id].join(".")
    const errorsPath  = ["errors", id].join(".")

    const value   = get(formik, valuePath)
    const touched = get(formik, touchedPath)
    const errors  = get(formik, errorsPath)

    return (
        <TextField
            {...rest}
            id={id}
            name={id}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={touched && errors}
            error={formik.touched[id] && Boolean(formik.errors[id])}
        />
    )
}
