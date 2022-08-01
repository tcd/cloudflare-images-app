import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import { Actions } from "@app/state"

export const RouterHelper = (_props: unknown): JSX.Element => {

    const dispatch = useDispatch()
    const params = useParams()
    const location = useLocation()

    useEffect(() => {
        dispatch(Actions.Core.locationChange({
            pathParams: params,
            location,
        }))
    }, [])

    return (
        <></>
    )
}
