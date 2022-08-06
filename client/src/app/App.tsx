import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryParamProvider } from "use-query-params"
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6"
import { parse, stringify } from "query-string"
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
                            <QueryParamProvider
                                adapter={ReactRouter6Adapter}
                                options={{
                                    searchStringToObject: parse,
                                    objectToSearchString: stringify,
                                }}
                            >
                                <Routes />
                            </QueryParamProvider>
                        </Router>
                    </ConfirmProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}
