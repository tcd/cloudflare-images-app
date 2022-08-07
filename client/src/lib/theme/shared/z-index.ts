import { ZIndex } from "@mui/material/styles/zIndex"

// https://mui.com/material-ui/customization/z-index/
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/zIndex.js
const _muiZIndexDefaults: Partial<ZIndex> = {
    mobileStepper: 1_000,
    fab:           1_050,
    speedDial:     1_050,
    appBar:        1_100,
    drawer:        1_200,
    modal:         1_300,
    snackbar:      1_400,
    tooltip:       1_500,
}

export const zIndexOptions: ZIndex = {
    mainContent:           1_000,
    layoutSideNav:         2_100,
    layoutAppBar:          2_200,
    mobileStepper:         3_000,
    fab:                   3_050,
    speedDial:             3_050,
    drawer:                3_100,
    appBar:                3_200,
    modal:                 3_300,
    snackbar:              3_400,
    tooltip:               3_500,
    notificationContainer: 4_100,
    notificationItem:      4_200,
    overlay:               5_000,
}
