import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { Page, CrumbProps } from "@feature/common"
import { Selectors } from "@app/state"
import { VariantCreateForm } from "."

const crumbs: CrumbProps[] = [
    { title: "Variants", to: "/variants", last: false },
    { title: "Create", to: "/variants/create", last: true },
]

export const VariantCreatePage = (_props: unknown): JSX.Element => {

    const navigate = useNavigate()

    const submitting = useSelector(Selectors.Variants.requests.create.submitting)
    const completed = useSelector(Selectors.Variants.requests.create.completed)

    useEffect(() => {
        if (completed) {
            navigate("/variants")
        }
    }, [navigate, completed])

    return (
        <Page title="New Variant" loading={submitting} crumbs={crumbs}>
            <VariantCreateForm />
        </Page>
    )
}
