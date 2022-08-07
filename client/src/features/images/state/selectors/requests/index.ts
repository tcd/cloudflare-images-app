import { CreateBulkSelectors } from "./CreateBulkSelectors"
import { CreateSelectors } from "./CreateSelectors"
import { DeleteSelectors } from "./DeleteSelectors"
import { FetchAllSelectors } from "./FetchAllSelectors"
import { FetchOnePageSelectors } from "./FetchOnePageSelectors"
import { FetchOneSelectors } from "./FetchOneSelectors"

export const RequestsSelectors = {
    fetchAll: FetchAllSelectors,
    fetchOne: FetchOneSelectors,
    fetchOnePage: FetchOnePageSelectors,
    create: CreateSelectors,
    delete: DeleteSelectors,
    createBulk: CreateBulkSelectors,
}
