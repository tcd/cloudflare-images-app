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

    let $meta: any = "none"
    if (!isBlank(active?.meta)) {
        const items = Object.entries(active.meta).map(([key, value]) => {
            return (
                <Fragment key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                </Fragment>
            )
        })
        $meta = (
            <dl>{items}</dl>
        )
    }

    const details = [
        { title: "Id", description: active?.id },
        { title: "File Name", description: active?.filename },
        { title: "Require Signed URLs", description: (active?.requireSignedURLs == true).toString() },
        { title: "Uploaded", description: active?.uploaded },
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
        <Grid container direction="row" columns={3}>
            <Grid item xs={3} sm={1}>
                <dl>
                    {$details}
                </dl>
            </Grid>
            <Grid item xs={3} sm={1}>
                {$meta}
            </Grid>
            <Grid item xs={3} sm={1}>
                <img src={src} alt={active?.filename} />
            </Grid>
        </Grid>
    )
}
