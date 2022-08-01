import { RouteObject, useRoutes } from "react-router-dom"

import {
    MiniDrawer,
    // HomePage,
    NotFoundPage,
    SettingsPage,
} from "@feature/core"

import {
    ImagesPage,
    ImageDetailPage,
} from "@feature/images"

import {
    VariantsPage,
    VariantCreatePage,
    VariantDetailPage,
} from "@feature/variants"

export const Routes = (_props: unknown): JSX.Element => {
    return useRoutes(routes())
}

const routes = (): RouteObject[] => {
    return [
        {
            path: "/",
            element: <MiniDrawer />,
            children: [
                // -----------------------------------------------------------------
                // Root
                // -----------------------------------------------------------------
                { index: true, element: <ImagesPage /> },
                { path: "settings", element: <SettingsPage /> },
                // -----------------------------------------------------------------
                // Images
                // -----------------------------------------------------------------
                {
                    path: "images",
                    children: [
                        { index: true, element: <ImagesPage /> },
                        { path: ":imageId", element: <ImageDetailPage /> },
                    ],
                },
                // -----------------------------------------------------------------
                // Variants
                // -----------------------------------------------------------------
                {
                    path: "variants",
                    children: [
                        { index: true, element: <VariantsPage /> },
                        { path: "create", element: <VariantCreatePage /> },
                        { path: ":variantId", element: <VariantDetailPage /> },
                    ],
                },
                // -----------------------------------------------------------------
                // Not Found
                // -----------------------------------------------------------------
                { path: "*", element: <NotFoundPage /> },
            ],
        },
    ]
}
