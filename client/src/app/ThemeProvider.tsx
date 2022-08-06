import { ReactNode } from "react"
import { useSelector } from "react-redux"
import {
    ThemeProvider as MuiThemeProvider,
} from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"

import { Selectors } from "@app/state"
import { CloudflareThemes } from "@app/lib"

export interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children = null }: ThemeProviderProps): JSX.Element => {

    // const [systemDefault, setSystemDefault] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

    const themeMode = useSelector(Selectors.Core.themeMode)
    // const themeMode = _themeMode == "system" ? systemDefault : _themeMode
    const theme = CloudflareThemes[themeMode]

    // const handleMediaUpdate = useCallback((event: MediaQueryListEvent) => {
    //     if (event?.matches) {
    //         setSystemDefault("dark")
    //     } else {
    //         setSystemDefault("light")
    //     }
    // }, [])

    // useEffect(() => {
    //     window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleMediaUpdate)
    //     return () => {
    //         window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleMediaUpdate)
    //     }
    // }, [handleMediaUpdate])

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children && children}
        </MuiThemeProvider>
    )
}
