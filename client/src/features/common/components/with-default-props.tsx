import type { ReactNode } from "react"
import { forwardRef, Component } from "react"
import merge from "lodash/merge"

function logProps(WrappedComponent) {
    class LogProps extends Component {
        // ...
    }

    function _forwardRef(props, ref) {
        return <LogProps {...props} forwardedRef={ref} />
    }

    // Give this component a more helpful display name in DevTools.
    // e.g. "ForwardRef(logProps(MyComponent))"
    const name = WrappedComponent.displayName || WrappedComponent.name
    _forwardRef.displayName = `logProps(${name})`

    return forwardRef(_forwardRef)
}

type RenderFunc<TProps> = (props: TProps) => ReactNode

/**
 * ## Reference:
 *
 * - [Lodash Docs: `_.merge`](https://lodash.com/docs/4.17.15#merge)
 * - [React Docs: Forwarding Refs](https://reactjs.org/docs/forwarding-refs.html)
 */
export const withDefaultProps = <TProps,>(name: string, defaultProps: Partial<TProps>, renderFunc: RenderFunc<TProps>) => {
    const component = (props: TProps) => {
        const mergedProps = merge({}, defaultProps, props)
        return renderFunc(mergedProps)
    }
    component.displayName = name
    return component
}
