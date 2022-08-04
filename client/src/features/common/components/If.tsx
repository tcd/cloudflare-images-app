import { ReactNode } from "react"

import { ErrorBoundary } from "@feature/common"

export interface IfProps {
    test: boolean
    children: ReactNode
}

export const If = ({ test, children }: IfProps): JSX.Element => {

    if (!test) {
        return null
    }

    return (
        <ErrorBoundary fallbackComponent={null} silence={true}>
            <>{children && children}</>
        </ErrorBoundary>
    )
}
