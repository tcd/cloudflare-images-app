import get from "lodash/get"
import { useFormik } from "formik"
import { TextFieldProps } from "@mui/material/TextField"

import { CustomSelect, CustomSelectOption } from "@feature/common"

export type FormikSelectProps = TextFieldProps & {
    id: string
    formik: ReturnType<typeof useFormik>
    options: CustomSelectOption[]
}

export const FormikSelect = (props: FormikSelectProps): JSX.Element => {
    const {
        id,
        formik,
        options,
        ...rest
    } = props

    const valuePath   = ["values", id].join(".")
    const touchedPath = ["touched", id].join(".")
    const errorsPath  = ["errors", id].join(".")

    const value   = get(formik, valuePath)
    const touched = get(formik, touchedPath)
    const errors  = get(formik, errorsPath)

    const hasError = formik.touched[id] && Boolean(formik.errors[id])

    const handleChange = (value: string) => {
        formik.setFieldValue(id, value)
    }

    return (
        <CustomSelect
            options={options}
            onChange={handleChange}
            TextFieldProps={{
                ...rest,
                id: id,
                name: id,
                value: value,
                onBlur: formik.handleBlur,
                helperText: touched && errors,
                error: hasError,
            }}
        />
    )
}
