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
} 