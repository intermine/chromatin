export type CallableRef<T = any> = (instance?: T | null) => void
export type Ref<T = any> = CallableRef<T> | React.MutableRefObject<T> | null
