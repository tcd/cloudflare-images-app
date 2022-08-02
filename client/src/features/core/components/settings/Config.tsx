import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useConfirm } from "material-ui-confirm"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"

// import { CloudflareConfig } from "@app/lib"
import { Actions, Selectors } from "@app/state"
import { Card } from "@feature/common"

export const Config = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const confirm = useConfirm()

    const initialValues = useSelector(Selectors.Core.config)
    const [formData, setFormData] = useState({ ...initialValues })

    const handleChange = (name, value) => {
        setFormData((x) => { return { ...x, [name]: value }})
    }

    const handleSubmit = () => {
        dispatch(Actions.Core.setConfig(formData))
        dispatch(Actions.Core.fetchUsageStats())
    }

    const inputProps = [
        { name: "apiKey", label: "Cloudflare API Key" },
        { name: "accountId", label: "Cloudflare Account ID" },
        { name: "accountHash", label: "Cloudflare Account Hash" },
    ]

    // const handleClick = () => {
    //     dispatch(Actions.Core.fetchUsageStats())
    // }

    const handleResetClick = () => {
        confirm({
            title: "Confirm",
            description: "Are you sure? This will clear all app data.",
            confirmationButtonProps: { color: "error", variant: "contained" },
            cancellationButtonProps: { color: "info",  variant: "contained" },
        })
            .then(() => {
                dispatch(Actions.Core.resetState())
                setFormData({ ...initialValues })
            })
            .catch((error) => {
                console.debug("reset state not confirmed")
                if (error) {
                    console.error(error)
                }
            })
    }

    const $inputs = inputProps.map(({ name, label }) => {
        return (
            <Grid item key={name}>
                <TextField
                    name={name}
                    label={label}
                    onChange={(event) => handleChange(name, event?.target?.value)}
                    value={formData[name]}
                    fullWidth={true}
                    variant="standard"
                />
            </Grid>
        )
    })

    return (
        <Card title="Configuration" sx={{ my: 4, mt: 6 }}>
            <Grid container direction="column" rowGap={3}>
                {$inputs}
                <Grid item display="flex" justifyContent="space-between">
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handleResetClick}>Log Out</Button>
                </Grid>
            </Grid>
            {/* <Button onClick={handleClick}>Test</Button> */}
        </Card>
    )
}
