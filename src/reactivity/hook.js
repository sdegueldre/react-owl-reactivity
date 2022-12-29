import { useCallback, useRef, useState } from "react";
import { reactive } from "./reactivity";

/**
 * Creates a reactive version of an object on first render and returns it on
 * every subsequent rerender. Modifying keys of this object will cause a
 * rerender if those keys have been read since the previous render.
 *
 * @template T
 * @param {T} obj the object to make reactive
 * @returns {T} reactive version of the object
 */
export function useReactive(obj) {
    const [, setRenderCount] = useState(0);
    const reactiveObj = useRef(obj);
    const rerender = useCallback(() => setRenderCount(prev => prev + 1), []);
    return reactive(reactiveObj.current, rerender);
}