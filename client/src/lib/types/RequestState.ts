import { RequestStatus } from "@app/lib"

export interface RequestState<T> {
    status: RequestStatus
    responseStatusCode?: number
    response?: T
    error?: any
    /**
     * An ISO 8601-compliant timestamp string.
     */
    updatedAt: string
}
