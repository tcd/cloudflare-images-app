import { useDispatch } from "react-redux"

import { Actions } from "@app/state"
import { Page } from "@feature/common"

export const TestPage = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(Actions.Notifications.addNotification({
            message: "testing",
            variant: "info",
        }))
    }

    return (
        <Page title="Test">
            <button onClick={handleClick}>Add Notification</button>
        </Page>
    )
}
