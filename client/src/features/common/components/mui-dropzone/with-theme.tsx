import type { ComponentType } from "react"
import type { Theme } from "@mui/material"
import { useTheme } from "@mui/material"
import { forwardRef } from "react"

export const withTheme = <P extends { theme?: Theme }>(Component: ComponentType<P>) => {
    return forwardRef(function ComponentWithTheme(
        props: Omit<P, "theme">,
        ref: any,
    ) {
        const theme = useTheme()
        const combinedProps = { ...props, theme } as P

        return <Component ref={ref} {...combinedProps} />
    })
}
