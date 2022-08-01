import { useState, useCallback } from "react"
import debounce from "lodash/debounce"
import TextField from "@mui/material/TextField"
import { TextFieldProps } from "@mui/material"

const DEBOUNCE_DURATION = 500

export type DebouncedTextField = TextFieldProps & { debounceDuration?: number }

const defaultProps: Partial<DebouncedTextField> = {
    debounceDuration: DEBOUNCE_DURATION,
    value: "",
    variant: "standard",
    onChange: (_event) => { return null },
}

export const DebouncedTextField = (props: DebouncedTextField): JSX.Element => {

    const {
        debounceDuration,
        value,
        onChange,
        ...otherProps
    } = { ...defaultProps, ...props }

    const [_value, setValue] = useState(value)

    const debouncedOnChange = useCallback(
        debounce((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            onChange(event)
        }, debounceDuration),
        [],
    )

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const value = event.target.value
        setValue(value)
        debouncedOnChange(event)
    }

    return (
        <TextField
            value={_value}
            onChange={handleChange}
            {...otherProps}
        />
    )
}
