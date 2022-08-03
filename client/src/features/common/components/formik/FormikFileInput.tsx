import get from "lodash/get"
import { useFormik } from "formik"
import TextField, { TextFieldProps } from "@mui/material/TextField"

type FormikFileInputProps = TextFieldProps & {
    id: string
    formik: ReturnType<typeof useFormik>
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any
}

export const FormikFileInput = (props: FormikFileInputProps): JSX.Element => {
    const {
        id,
        formik,
        onChange,
        ...rest
    } = props

    const valuePath   = ["values", id].join(".")
    const touchedPath = ["touched", id].join(".")
    const errorsPath  = ["errors", id].join(".")

    const value   = get(formik, valuePath)
    const touched = get(formik, touchedPath)
    const errors  = get(formik, errorsPath)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event)
        }
        formik.handleChange(event)
    }

    return (
        <TextField
            {...rest}
            type="file"
            id={id}
            name={id}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            helperText={touched && errors}
            error={formik.touched[id] && Boolean(formik.errors[id])}
        />
    )
}
