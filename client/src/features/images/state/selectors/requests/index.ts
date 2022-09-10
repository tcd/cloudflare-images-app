import { CreateBulkSelectors } from "./CreateBulkSelectors"
import { CreateSelectors } from "./CreateSelectors"
import { DeleteSelectors } from "./DeleteSelectors"
import { FetchAllSelectors } from "./FetchAllSelectors"
import { FetchOnePageSelectors } from "./FetchOnePageSelectors"
import { FetchOneSelectors } from "./FetchOneSelectors"
import { UpdateSelectors } from "./UpdateSelectors"

export const RequestsSelectors = {
    create: CreateSelectors,
    createBulk: CreateBulkSelectors,
    delete: DeleteSelectors,
    fetchAll: FetchAllSelectors,
    fetchOne: FetchOneSelectors,
    fetchOnePage: FetchOnePageSelectors,
    update: UpdateSelectors,
}
