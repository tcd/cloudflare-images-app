import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import Grid from "@mui/material/Grid"

import { Actions, Selectors } from "@app/state"
import { isBlank } from "@app/lib"

export const ImageDetails = (_props: unknown): JSX.Element => {

    // const dispatch = useDispatch()

    const active = useSelector(Selectors.Images.active.entity)
    const src = useSelector(Selectors.Images.active.src)

    if (isBlank(active)) {
        return null
    }

    const details = [
        { title: "Id", description: active?.id },
        { title: "File Name", description: active?.filename },
        { title: "Require Signed URLs", description: (active?.requireSignedURLs == true).toString() },
        { title: "Uploaded", description: active?.uploaded },
        { title: "Metadata", description: JSON.stringify(active?.metadata) ?? "none" },
    ]

    const $details = details.map(({ title, description }) => {
        return (
            <Fragment key={title}>
                <dt>{title}</dt>
                <dd>{description}</dd>
            </Fragment>
        )
    })

    return (
        <Grid container direction="row" columns={2}>
            <Grid item xs={2} sm={1}>
                <dl>
                    {$details}
                </dl>
            </Grid>
            <Grid item xs={2} sm={1}>
                <img src={src} alt={active?.filename} />
            </Grid>
        </Grid>
    )
}
