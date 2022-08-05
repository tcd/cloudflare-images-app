import { AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator, Dispatch } from "@reduxjs/toolkit"
import type { FallbackIfUnknown, IsAny, IsUnknown } from "./tsHelpers"

// =============================================================================
//
// ## Notes & References
//
// - [JSDoc & Generic types. Typescript](https://medium.com/@antonkrinitsyn/jsdoc-generic-types-typescript-db213cf48640)
//
// =============================================================================

/**
 * See:
 *
 * - [`createAsyncThunk` docs](https://redux-toolkit.js.org/api/createAsyncThunk)
 */
export interface IAsyncThunkConfig {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}


/**
 * See:
 *
 * - [`payloadCreator` docs](https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator)
 */
export type CreateAsyncThunkTypePayload = {
    /**
     */
    Returned: any
    /**
     */
    ThunkArg: any
    ThunkApiConfig: IAsyncThunkConfig
}

export interface ThunkAPI {

}

declare class RejectWithValue<Payload, RejectedMeta> {
    readonly payload: Payload
    readonly meta: RejectedMeta
    private readonly _type
    constructor(payload: Payload, meta: RejectedMeta);
}
declare class FulfillWithMeta<Payload, FulfilledMeta> {
    readonly payload: Payload
    readonly meta: FulfilledMeta
    private readonly _type
    constructor(payload: Payload, meta: FulfilledMeta);
}

/**
 * See:
 *
 * - [`payloadCreator` docs](https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator)
 */
export declare type BaseThunkAPI<
    TState,
    TExtra,
    TDispatch extends Dispatch = Dispatch,
    RejectedValue = undefined,
    RejectedMeta = unknown,
    FulfilledMeta = unknown
> = {
    /**
     * The Redux store `dispatch` method.
     */
    dispatch: TDispatch;
    /**
     * The Redux store `getState` method.
     */
    getState: () => TState;
    /**
     * The "extra argument" given to the thunk middleware on setup, if available.
     */
    extra: TExtra;
    /**
     * A unique string ID value that was automatically generated to identify this request sequence.
     */
    requestId: string;
    /**
     * An [`AbortController.signal` object](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal)
     * that may be used to see if another part of the app logic has marked this request as needing cancelation.
     */
    signal: AbortSignal;
    /**
     * `rejectWithValue` is a utility function that you can `return` (or `throw`) in your action creator
     * to return a rejected response with a defined payload and meta.
     *
     * It will pass whatever value you give it and return it in the payload of the rejected action.
     *
     * If you also pass in a `meta`, it will be merged with the existing `rejectedAction.meta`.
     */
    rejectWithValue: IsUnknown<RejectedMeta, (value: RejectedValue) => RejectWithValue<RejectedValue, RejectedMeta>, (value: RejectedValue, meta: RejectedMeta) => RejectWithValue<RejectedValue, RejectedMeta>>;
    /**
     * fulfillWithValue is a utility function that you can `return` in your action creator
     * to `fulfill` with a value while having the ability of adding to `fulfilledAction.meta`.
     */
    fulfillWithValue: IsUnknown<FulfilledMeta, <FulfilledValue>(value: FulfilledValue) => FulfillWithMeta<FulfilledValue, FulfilledMeta>, <FulfilledValue>(value: FulfilledValue, meta: FulfilledMeta) => FulfillWithMeta<FulfilledValue, FulfilledMeta>>;
};

export interface SerializedError {
    name?: string;
    message?: string;
    stack?: string;
    code?: string;
}

/**
 * @template Returned
 * @template ThunkArg
 *
 * @param typePrefix
 * @param payloadCreator
 * @param options
 *
 * @public
 */
export declare function createAsyncThunk<
    Returned,
    ThunkArg = void
>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {}>,
    options?: AsyncThunkOptions<ThunkArg, {}>
): AsyncThunk<Returned, ThunkArg, {}>;

/**
 *
 * @template Returned
 * @template ThunkArg
 * @template ThunkApiConfig
 *
 * @param typePrefix
 * @param payloadCreator
 * @param options
 */
export declare function createAsyncThunk<
    Returned,
    ThunkArg,
    ThunkApiConfig extends IAsyncThunkConfig
>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
    options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
