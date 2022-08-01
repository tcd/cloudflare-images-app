import { ReactNode } from "react"

export interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children = null }: LayoutProps): JSX.Element => {
    return (
        <>{children && children}</>
    )
}
