import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from ".";

interface State<D> {
    stat: "idle" | "loading" | "error" | "success";
    data: D | null;
    error: Error | null;
}

const defaultInitialState = {
    stat: "idle",
    data: null,
    error: null,
}

const defaultConfig = {
    throwOnError: false,
};


const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [mountedRef, dispatch])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {
        ...defaultConfig,
        ...initialConfig,
    }

    const [state, dispatch] = useReducer((state: State<D>, actions: Partial<State<D>>) => ({ ...state, ...actions }), {
        ...defaultInitialState,
        ...initialState,
    } as State<D>)

    const safeDispatch = useSafeDispatch(dispatch)

    const [retry, setRetry] = useState(() => () => { })

    const setData = useCallback((data: D) => {
        safeDispatch({
            data,
            stat: "success",
            error: null,
        })
    }, [safeDispatch])

    const setError = useCallback((error: Error) => {
        safeDispatch({
            error,
            stat: "error",
            data: null,
        });
    }, [safeDispatch])

    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error("请传入 Promise 类型数据");
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        safeDispatch({ stat: "loading" });
        return promise.then((data: D) => {
            setData(data)
            return data
        }).catch((error: Error) => {
            setError(error)
            if (config.throwOnError) return Promise.reject(error);
            return error;
        })
    }
        , [config.throwOnError, safeDispatch, setData, setError])

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        retry,
        setData,
        setError,
        ...state,
    };
}