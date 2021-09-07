import React from 'react'
import styled, {
    StyledComponent,
    ThemedStyledProps,
    StyledComponentPropsWithRef,
    CSSObject,
} from 'styled-components'

import type { Theme } from './create'
import { useTheme } from '../use-theme'

export type CreateStyleObject = CSSObject
export type IsStyleComponent<T> = T extends
    | React.JSXElementConstructor<any>
    | keyof JSX.IntrinsicElements
    ? T
    : 'div'

export type CreateStyleFunctionProps<T, U> = ThemedStyledProps<
    StyledComponentPropsWithRef<IsStyleComponent<T>> & U,
    any
>

export type CreateStyleFunction<T, U> = (
    theme: Theme,
    props: CreateStyleFunctionProps<T, U>
) => CSSObject

export type CreateStyleObjectOrFunction<T, U> =
    | CreateStyleObject
    | CreateStyleFunction<T, U>

export const createStyle = <T, U>(
    component: IsStyleComponent<T>,
    objOrFn: CreateStyleObjectOrFunction<T, U>
): StyledComponent<IsStyleComponent<T>, any> => {
    const themeStyledFunction = (
        props: CreateStyleFunctionProps<T, U>
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
    return styled(component)((props: any) => themeStyledFunction(props))
}
