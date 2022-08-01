export * from "./select-slice"

import { MiscSelectors } from "./MiscSelectors"
import { RequestsSelectors } from "./requests"

export const CoreSelectors = {
    ...MiscSelectors,
    requests: RequestsSelectors,
}
