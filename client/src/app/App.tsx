import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { ConfirmProvider } from "material-ui-confirm"

import { store, persistor } from "@app/state"
import { AppNotifications } from "@feature/notifications"
import { FetchAllHandler } from "src/features/images/components/FetchAllHandler"
import { ThemeProvider } from "./ThemeProvider"
import { Routes } from "./Routes"

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                    <AppNotifications />
                    <FetchAllHandler />
                    <ConfirmProvider>
                        <Router>
                            <Routes />
                        </Router>
                    </ConfirmProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}
