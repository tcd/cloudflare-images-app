import { useDispatch, useSelector } from "react-redux"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Switch from "@mui/material/Switch"

import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness"

import { Actions, Selectors } from "@app/state"
import { Card } from "@feature/common"

export const Options = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()

    const darkModeEnabled = useSelector(Selectors.Core.darkModeEnabled)

    const handleToggleDarkMode = () => {
        dispatch(Actions.Core.toggleThemeMode())
    }

    return (
        <Card title="Preferences" sx={{ my: 0 }}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <SettingsBrightnessIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-dark-mode" primary="Dark Mode" />
                    <Switch
                        edge="end"
                        onChange={handleToggleDarkMode}
                        checked={darkModeEnabled}
                        inputProps={{
                            "aria-labelledby": "switch-list-label-dark-mode",
                        }}
                    />
                </ListItem>
            </List>
        </Card>
    )
}
