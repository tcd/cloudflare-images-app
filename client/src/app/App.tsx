import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "@app/state"
import { ThemeProvider } from "./ThemeProvider"
import { Routes } from "./Routes"

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <Router>
                        <Routes />
                    </Router>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}
