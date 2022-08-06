import type { SxProps } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import TextField, { TextFieldProps } from "@mui/material/TextField"

const defaultCustomSelectStyles: SxProps = {
    width: "250px",
}

export interface CustomSelectOption<T = string> {
    value: T
    label: string
}

export interface CustomSelectProps<T = string> {
    options: CustomSelectOption<T>[]
    onChange: (value: T) => void
    TextFieldProps?: TextFieldProps
}

const defaultProps: Partial<CustomSelectProps> = {
    TextFieldProps: {
        select: true,
        size: "small",
        variant: "standard",
        margin: "normal",
        sx: defaultCustomSelectStyles,
    },
}

// Extending unknown is the only way to write this in a JSX file.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const CustomSelect = <T extends unknown = string>(props: CustomSelectProps<T>): JSX.Element => {

    props = { ...defaultProps, ...props }

    const {
        options,
        onChange,
    } = props

    // @ts-ignore: next-line
    const TextFieldProps = mergeTextFieldProps(defaultProps, props)

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): any => {
        onChange(event.target.value as unknown as T)
    }

    return (
        <TextField
            select={true}
            onChange={handleChange}
            {...TextFieldProps}
        >
            {options.map(({ label, value }) => (
                // @ts-ignore: next-line
                <MenuItem key={value} value={value}>
                    {label}
                </MenuItem>
            ))}
        </TextField>
    )
}

const mergeTextFieldProps = <T,>(defaultProps: Partial<CustomSelectProps<T>>, props: CustomSelectProps<T>): TextFieldProps => {
    // @ts-ignore: next-line
    const sx: SxProps = {
        ...defaultProps.TextFieldProps.sx,
        ...(props?.TextFieldProps?.sx ?? {}),
    }
    const result: TextFieldProps = {
        ...defaultProps.TextFieldProps,
        ...(props?.TextFieldProps ?? {}),
        select: true,
        sx: sx,
    }
    return result
}
