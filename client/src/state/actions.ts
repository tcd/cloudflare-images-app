import { FeatureKeys } from "@app/lib"
import {
    CoreActions,
    ImagesActions,
    NotificationsActions,
    VariantsActions,
} from "../features"

export interface AppActions {
    [FeatureKeys.Core]: typeof CoreActions
    [FeatureKeys.Images]: typeof ImagesActions
    [FeatureKeys.Notifications]: typeof NotificationsActions
    [FeatureKeys.Variants]: typeof VariantsActions
}

export const Actions: AppActions = {
    Core: CoreActions,
    Images: ImagesActions,
    Notifications: NotificationsActions,
    Variants: VariantsActions,
}
