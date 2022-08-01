import type { ZIndex as MuiZIndex } from "@mui/material/styles/zIndex"

declare module "@mui/material/styles" {
    interface ZIndex extends MuiZIndex {
        mainContent: number
        layoutSideNav: number
        layoutAppBar: number
        // mobileStepper: number
        // fab: number
        // speedDial: number
        // appBar: number
        // drawer: number
        // modal: number
        // snackbar: number
        // tooltip: number
        notificationContainer: number
        notificationItem: number
        overlay: number
    }

    type ZIndexOptions = Partial<ZIndex>;
}
