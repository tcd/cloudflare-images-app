import { RouteObject, useRoutes } from "react-router-dom"

import {
    Layout,
    MiniDrawer,
    // HomePage,
    NotFoundPage,
    SettingsPage,
    TestPage,
} from "@feature/core"
import {
    ImagesPage,
    ImageDetailPage,
    UploadImagePage,
    BulkUploadPage,
} from "@feature/images"
import {
    VariantsPage,
    VariantCreatePage,
    VariantDetailPage,
} from "@feature/variants"

// =============================================================================

export const Routes = (_props: unknown): JSX.Element => {
    return useRoutes(routes())
}

const routes = (): RouteObject[] => {
    return [
        {
            path: "/",
            element: <Layout />,
            children: [
                // -----------------------------------------------------------------
                // Root
                // -----------------------------------------------------------------
                { index: true,      element: <ImagesPage />   },
                { path: "settings", element: <SettingsPage /> },
                { path: "test",     element: <TestPage /> },
                // -----------------------------------------------------------------
                // Images
                // -----------------------------------------------------------------
                {
                    path: "images",
                    children: [
                        { index: true,         element: <ImagesPage />      },
                        { path: "bulk-upload", element: <BulkUploadPage />  },
                        { path: "create",      element: <UploadImagePage /> },
                        { path: ":imageId",    element: <ImageDetailPage /> },
                    ],
                },
                // -----------------------------------------------------------------
                // Variants
                // -----------------------------------------------------------------
                {
                    path: "variants",
                    children: [
                        { index: true,        element: <VariantsPage />      },
                        { path: "create",     element: <VariantCreatePage /> },
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
