import get from "lodash/get"
import isNumber from "lodash/isNumber"
import { useFormik } from "formik"
import TextField, { TextFieldProps } from "@mui/material/TextField"

export type FormikNumberInputProps = TextFieldProps & {
    id: string
    formik: ReturnType<typeof useFormik>
}

export const FormikNumberInput = (props: FormikNumberInputProps): JSX.Element => {
    const {
        id,
        formik,
        ...rest
    } = props

    const valuePath = ["values", id].join(".")
    const touchedPath = ["touched", id].join(".")
    const errorsPath = ["errors", id].join(".")

    const value   = get(formik, valuePath)
    const touched = get(formik, touchedPath)
    const errors  = get(formik, errorsPath)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // event.preventDefault()
        const value = event.target?.value
        if (isNumber(value)) {
            const parsedValue = parseFloat(event.target.value)
            formik.setFieldValue(id, parsedValue)
        } else {
            formik.setFieldValue(id, 0)
        }
    }

    return (
        <TextField
            {...rest}
            type="text"
            id={id}
            name={id}
            value={value}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            helperText={touched && errors}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            inputProps={{
                pattern: "[0-9]*",
            }}
        />
    )
}
