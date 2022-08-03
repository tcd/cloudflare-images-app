import { CreateSelectors } from "./CreateSelectors"
import { DeleteSelectors } from "./DeleteSelectors"
import { FetchAllSelectors } from "./FetchAllSelectors"
import { FetchOnePageSelectors } from "./FetchOnePageSelectors"

export const RequestsSelectors = {
    fetchAll: FetchAllSelectors,
    fetchOnePage: FetchOnePageSelectors,
    create: CreateSelectors,
    delete: DeleteSelectors,
}
