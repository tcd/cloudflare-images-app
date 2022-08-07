export * from "./select-slice"

import { RequestsSelectors } from "./requests"
import { MiscSelectors } from "./MiscSelectors"
import { UpdateSelectors } from "./UpdateSelectors"
import { BulkUploadSelectors } from "./BulkUploadSelectors"

// =============================================================================

export const ImagesSelectors = {
    ...MiscSelectors,
    update: UpdateSelectors,
    bulkUpload: BulkUploadSelectors,
    requests: RequestsSelectors,
}
