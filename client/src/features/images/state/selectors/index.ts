export * from "./select-slice"

import { RequestsSelectors } from "./requests"
import { MiscSelectors } from "./MiscSelectors"

// =============================================================================

export const ImagesSelectors = {
    ...MiscSelectors,
    requests: RequestsSelectors,
}
