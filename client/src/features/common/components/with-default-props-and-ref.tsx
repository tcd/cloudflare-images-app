import type {
    ForwardRefRenderFunction as RenderFunc,
} from "react"
import { forwardRef, Component } from "react"
import merge from "lodash/merge"

// function logProps(WrappedComponent) {
//     class LogProps extends Component {
//         // ...
//     }
//
//     function _forwardRef(props, ref) {
//         return <LogProps {...props} forwardedRef={ref} />
//     }
//
//     // Give this component a more helpful display name in DevTools.
//     // e.g. "ForwardRef(logProps(MyComponent))"
//     const name = WrappedComponent.displayName || WrappedComponent.name
//     _forwardRef.displayName = `logProps(${name})`
//
//     return forwardRef(_forwardRef)
// }

/**
 * ## Reference:
 *
 * - [Lodash Docs: `_.merge`](https://lodash.com/docs/4.17.15#merge)
 * - [React Docs: Forwarding Refs](https://reactjs.org/docs/forwarding-refs.html)
 * - [React Docs: Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#keys)
 */
export const withDefaultPropsAndRef = <TRef, TProps>(name: string, defaultProps: Partial<TProps>, renderFunc: RenderFunc<TRef, TProps>) => {
    const component = forwardRef<TRef, TProps>((props, ref) => {
        const mergedProps = merge({}, defaultProps, props)
        return renderFunc(mergedProps, ref)
    })
    component.displayName = name
    return component
}

export const forwardRefWithDefaultProps = <TRef, TProps>(name: string, defaultProps: Partial<TProps>, renderFunc: RenderFunc<TRef, TProps>) => {
    const component = forwardRef<TRef, TProps>((props, ref) => {
        const mergedProps = merge({}, defaultProps, props)
        return renderFunc(mergedProps, ref)
    })
    component.displayName = name
    return component
}
