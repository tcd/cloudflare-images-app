import { isBlank } from "@app/lib"
import { RootState } from "@app/state"
import { CoreSelectors } from "@feature/core"
import { EntitySelectors } from "./EntitySelectors"
import { selectSlice } from "."

const selectActiveId = (rootState: RootState): string => selectSlice(rootState)?.activeId
const selectSearchFilter = (rootState: RootState): string => selectSlice(rootState)?.searchFilter?.toLocaleLowerCase()

const selectUpdateInProgress = (rootState: RootState): boolean => {
    return selectSlice(rootState)?.update?.inProgress === true
}

const selectCurrentUpdatePage = (rootState: RootState): Integer => {
    return selectSlice(rootState)?.update?.currentPage
}

const selectUpdateComplete = (rootState: RootState): boolean => {
    return selectCurrentUpdatePage(rootState) > CoreSelectors.apiPageCount(rootState)
}

const selectAll = (rootState: RootState) => {
    return EntitySelectors.selectAll(rootState) ?? []
}

const selectFiltered = (rootState: RootState) => {
    const all = selectAll(rootState)
    const filter = selectSearchFilter(rootState)
    if (isBlank(filter)) {
        return all
    }
    const filtered = all.filter(x => (x.id + x.filename)?.toLocaleLowerCase().includes(filter))
    return filtered
}

const selectActiveEntity = (rootState: RootState) => {
    const id = selectActiveId(rootState)
    if (isBlank(id)) {
        return null
    }
    const all = selectAll(rootState)
    return all.find(x => x.id === id)
}

const selectActiveSrc = (rootState: RootState) => {
    const id = selectActiveId(rootState)
    if (isBlank(id)) {
        return null
    }
    const hash = CoreSelectors.accountHash(rootState)
    if (isBlank(hash)) {
        return null
    }
    return `https://imagedelivery.net/${hash}/${id}/public`

}

// =============================================================================

export const MiscSelectors = {
    allImages: selectAll,
    filteredImages: selectFiltered,
    searchFilter: selectSearchFilter,
    active: {
        id: selectActiveId,
        entity: selectActiveEntity,
        src: selectActiveSrc,
    },
    update: {
        inProgress: selectUpdateInProgress,
        currentPage: selectCurrentUpdatePage,
        complete: selectUpdateComplete,
    },
}
