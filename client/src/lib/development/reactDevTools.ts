// https://github.com/facebook/react/blob/main/packages/react-devtools-shared/src/types.js
/**
 * See:
 *
 * - react-devtools-shared
 *   - [constants](https://github.com/facebook/react/blob/main/packages/react-devtools-shared/src/constants.js)
 *   - [types](https://github.com/facebook/react/blob/main/packages/react-devtools-shared/src/types.js)
 *   - [utils](https://github.com/facebook/react/blob/main/packages/react-devtools-shared/src/utils.js)
 * - react-devtools-core
 *   - https://github.com/facebook/react/blob/033fe52b48338aec2522f1918408296cbec523d6/packages/react-devtools-core/src/standalone.js
 */
const _notes = false

// =============================================================================

/**
 * The values below are referenced by `ComponentFilters` (which are saved via localStorage).
 */
export const TElementTypes = {
    Class: 1,
    Context: 2,
    Function: 5,
    ForwardRef: 6,
    HostComponent: 7,
    Memo: 8,
    OtherOrUnknown: 9,
    Profiler: 10,
    Root: 11,
    Suspense: 12,
    SuspenseList: 13,
    TracingMarker: 14,
} as const

export type TElementTypesKey = keyof typeof TElementTypes
export type TElementType = typeof TElementTypes[TElementTypesKey]

// =============================================================================

/**
 * The values below are referenced by ComponentFilters (which are saved via localStorage).
 */
export const TComponentFilters = {
    ElementType: 1,
    DisplayName: 2,
    Location: 3,
    HOC: 4,
} as const

export type TComponentFiltersKey = keyof typeof TComponentFilters
export type TComponentFilter = typeof TComponentFilters[TComponentFiltersKey]

// =============================================================================

// Hide all elements of types in this Set.
// We hide host components only by default.
export type ElementTypeComponentFilter = {
    isEnabled: boolean,
    type: 1,
    value: TElementType,
};

// __REACT_DEVTOOLS_COMPONENT_FILTERS__

type Stringified<_T> = string

export interface IReactDevToolsGlobals {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: Stringified<{
        renderers: unknown
        $0: unknown
    }>
    __REACT_DEVTOOLS_APPEND_COMPONENT_STACK__: Stringified<boolean>
    __REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__: Stringified<boolean>
    __REACT_DEVTOOLS_COMPONENT_FILTERS__: unknown                // = componentFilters;
    __REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__: Stringified<boolean>
    __REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__: Stringified<boolean>
    // -------------------------------------------------------------------------
    // From looking in dev tools
    // -------------------------------------------------------------------------
    __REACT_DEVTOOLS_: unknown
    __REACT_DEVTOOLS_BROWSER_THEME__: unknown
    __REACT_DEVTOOLS_EXTENSION__: unknown
    __REACT_DEVTOOLS_EXTENSION_COMPOSE__: unknown
}

// function  __REACT_DEVTOOLS_EXTENSION_COMPOSE__() {
//     for (let t = arguments.length, e = new Array(t), r = 0; r < t; r++) {
//         e[r] = arguments[r]
//     }
//     return 0 === e.length ? Ht() : 1 === e.length && "object" === Ft(e[0]) ? qt(e[0]) : qt({}).apply(void 0, zt(e))
// }
