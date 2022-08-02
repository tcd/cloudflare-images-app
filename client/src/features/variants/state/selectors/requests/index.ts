import { CreateSelectors } from "./CreateSelectors"
import { DeleteSelectors } from "./DeleteSelectors"
import { FetchAllSelectors } from "./FetchAllSelectors"

export const RequestsSelectors = {
    fetchAll: FetchAllSelectors,
    delete: DeleteSelectors,
    create: CreateSelectors,
}
