import { Page } from "@feature/common"
import { useSelector } from "react-redux"

import { Selectors } from "@app/state"
import { Options } from "./Options"
import { Config } from "./Config"

export const SettingsPage = (_props: unknown): JSX.Element => {

    const loading = useSelector(Selectors.Core.requests.fetchUsageStats.fetching)

    return (
        <Page title="Settings" loading={loading}>
            <Options />
            <Config />
        </Page>
    )
}
