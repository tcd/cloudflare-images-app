import get from "lodash/get"
import { useFormik } from "formik"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

type FormikInputProps = TextFieldProps & {
    id: string
    label: string
    formik: ReturnType<typeof useFormik>
}

export const FormikSwitch = (props: FormikInputProps): JSX.Element => {
    const {
        id,
        formik,
        label,
        ...rest
    } = props

    const valuePath   = ["values", id].join(".")
    const touchedPath = ["touched", id].join(".")
    const errorsPath  = ["errors", id].join(".")

    const value   = get(formik, valuePath)
    const touched = get(formik, touchedPath)
    const errors  = get(formik, errorsPath)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue(id, event.target.checked)
    }

    const $switch = (
        <Switch
            id={id}
            name={id}
            checked={value == true}
            onChange={handleChange}
            onBlur={formik.handleBlur}
        />
    )

    return (
        <FormGroup>
            <FormControlLabel
                control={$switch}
                label={label}
            />
        </FormGroup>
    )

    return (
        <TextField
            {...rest}
            id={id}
            name={id}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // helperText={touched && errors}
            // error={formik.touched[id] && Boolean(formik.errors[id])}
        />
    )
}
