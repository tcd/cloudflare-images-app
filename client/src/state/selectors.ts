import { FeatureKeys } from "@app/lib"
import {
    CoreSelectors,
    ImagesSelectors,
    NotificationsSelectors,
    VariantsSelectors,
} from "../features"

export interface AppSelectors {
    [FeatureKeys.Core]: typeof CoreSelectors
    [FeatureKeys.Images]: typeof ImagesSelectors
    [FeatureKeys.Notifications]: typeof NotificationsSelectors
    [FeatureKeys.Variants]: typeof VariantsSelectors
}

export const Selectors: AppSelectors = {
    Core: CoreSelectors,
    Images: ImagesSelectors,
    Notifications: NotificationsSelectors,
    Variants: VariantsSelectors,
}
