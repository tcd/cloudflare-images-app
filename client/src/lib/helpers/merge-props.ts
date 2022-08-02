import merge from "lodash/merge"

export const mergeProps = <T>(defaultProps: Partial<T>, passedProps: T): T => {
    return merge(defaultProps, passedProps)
}
