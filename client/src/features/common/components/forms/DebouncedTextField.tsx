import  debounce  from "lodash/debounce"
import { useState, useCallback, useRef, useEffect } from "react"
import TextField, { TextFieldProps } from "@mui/material/TextField"

const DEBOUNCE_DURATION = 500

export type DebouncedTextFieldProps = Omit<TextFieldProps, "onChange"> & {
    /** @default 500 */
    debounceDuration?: number
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const defaultProps: Partial<DebouncedTextFieldProps> = {
    debounceDuration: DEBOUNCE_DURATION,
    value: "",
    variant: "standard",
    onChange: (_event) => { return null },
}

export const DebouncedTextField = (props: DebouncedTextFieldProps): JSX.Element => {

    const {
        debounceDuration,
        value,
        onChange,
        ...otherProps
    } = { ...defaultProps, ...props }

    const timerRef = useRef(null)
    const [_value, setValue] = useState(value)
    const [cooledDown, _setCooledDown] = useState(true)
    const componentMounted = useRef(true)

    const setCooledDown = (value: boolean) => {
        _setCooledDown(value)
    }

    const coolDown = () => {
        if (componentMounted?.current == true) {
            setCooledDown(true)
        }
    }

    const debouncedOnChange = useCallback(
        debounce((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            onChange(event)
        }, debounceDuration),
        [],
    )
    const debouncedCoolDown = useCallback(
        debounce(() => {
            coolDown()
        }, debounceDuration + 1500),
        [],
    )

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const value = event.target.value
        setValue(value)
        setCooledDown(false)
        debouncedOnChange(event)
        timerRef.current = setTimeout(
            debouncedCoolDown,
            (debounceDuration + 1_000),
        )
    }

    useEffect(() => {
        if (cooledDown) {
            setValue(value)
        }
        return () => {
            clearTimeout(timerRef?.current)
            componentMounted.current = false
        }
    }, [cooledDown, value])

    return (
        <TextField
            value={_value}
            variant="standard"
            onChange={handleChange}
            {...otherProps}
        />
    )
}

