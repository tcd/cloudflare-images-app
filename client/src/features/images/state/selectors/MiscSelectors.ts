import { isBlank, ImageWithoutVariantsWithSrc } from "@app/lib"
import { RootState } from "@app/state"
import { CoreSelectors } from "@feature/core"
import { EntitySelectors } from "./EntitySelectors"
import { selectSlice } from "."

const selectActiveId = (rootState: RootState): string => selectSlice(rootState)?.activeId
const selectSearchFilter = (rootState: RootState): string => selectSlice(rootState)?.searchFilter?.toLocaleLowerCase()

const selectAll = (rootState: RootState) => {
    return EntitySelectors.selectAll(rootState) ?? []
}

const selectAllWithSrc = (rootState: RootState): ImageWithoutVariantsWithSrc[] => {
    const hash = CoreSelectors.accountHash(rootState)
    if (isBlank(hash)) {
        return []
    }
    return selectAll(rootState).map(x => ({
        ...x,
        src: `https://imagedelivery.net/${hash}/${x.id}/public`,
    }))
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

const selectFilteredWithSrc = (rootState: RootState): ImageWithoutVariantsWithSrc[] => {
    const hash = CoreSelectors.accountHash(rootState)
    if (isBlank(hash)) {
        return []
    }
    return selectFiltered(rootState).map(x => ({
        ...x,
        src: `https://imagedelivery.net/${hash}/${x.id}/public`,
    }))
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
    searchFilter: selectSearchFilter,
    all: {
        all: selectAll,
        withSrc: selectAllWithSrc,
        filtered: selectFiltered,
        filteredWithSrc: selectFilteredWithSrc,
    },
    active: {
        id: selectActiveId,
        entity: selectActiveEntity,
        src: selectActiveSrc,
    },
}
