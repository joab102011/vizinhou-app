import 'react';

declare module 'react' {
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  export type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);

  export type Key = string | number;

  export interface Component<P = {}, S = {}> {
    props: P;
    state: S;
    setState(state: S | ((prevState: S, props: P) => S), callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactElement<any, any> | null;
  }

  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;

  export interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
  }
  
  export const useState: <T>(initialState: T | (() => T)) => [T, (newState: T) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: ReadonlyArray<any>) => void;
  export const useMemo: <T>(factory: () => T, deps: ReadonlyArray<any> | undefined) => T;
  export const useCallback: <T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>) => T;
  export const useContext: <T>(context: Context<T>) => T;
  export const useRef: <T>(initialValue: T) => { current: T };
  export const useLayoutEffect: (effect: () => void | (() => void), deps?: ReadonlyArray<any>) => void;
  export const useReducer: <R extends Reducer<any, any>, I>(
    reducer: R,
    initialArg: I,
    init?: (arg: I) => ReducerState<R>
  ) => [ReducerState<R>, Dispatch<ReducerAction<R>>];
} 