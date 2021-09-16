import React from 'react'
import styled, {
    StyledComponent,
    ThemedStyledProps,
    StyledComponentPropsWithRef,
    CSSObject,
} from 'styled-components'

import type { Theme, ReactElement } from './create'
import { useTheme } from '../use-theme'

export type CreateStyledComponentObject = CSSObject
export type Component<T> = T extends
    | React.JSXElementConstructor<any>
    | keyof JSX.IntrinsicElements
    ? T
    : 'div'

export type CreateStyledComponentFunctionProps<T, U> = ThemedStyledProps<
    StyledComponentPropsWithRef<Component<T>> & U,
    any
>

export type CreateStyledComponentFunction<T, U> = (
    theme: Theme,
    props: CreateStyledComponentFunctionProps<T, U>
) => CSSObject

export type CreateStyledComponentObjectOrFunction<T, U> =
    | CreateStyledComponentObject
    | CreateStyledComponentFunction<T, U>

type AddAdditionProps<U> = U extends string
    ? { children?: ReactElement }
    : U & { children?: ReactElement }

export const createStyledComponent = <T, U>(
    component: Component<T>,
    objOrFn: CreateStyledComponentObjectOrFunction<T, U>
): StyledComponent<Component<T>, any, AddAdditionProps<U>, never> => {
    const themeStyledFunction = (
        props: CreateStyledComponentFunctionProps<T, U>
    ): CSSObject => {
        const theme = useTheme()
        if (typeof objOrFn === 'object') return objOrFn
        return objOrFn(theme, props)
    }

    /**
     * Currently, there is no way to add type which supports extension
     * of current props, therefore type of props is 'any' here.
     *
     * TODO: Need to fix type of props.
     */
    return (styled(component)((props: any) =>
        themeStyledFunction(props)
    ) as unknown) as any
}
