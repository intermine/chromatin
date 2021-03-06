import React from 'react'
import styled, {
    StyledComponent,
    ThemedStyledProps,
    StyledComponentPropsWithRef,
    CSSObject,
} from 'styled-components'

import { createUseStyles } from 'react-jss'
import type { Classes, Styles } from 'jss'

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
> & {
    isExtendStyleFromThemeVars?: boolean
}

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

/**
 * To create new styled component
 */
export const createStyledComponent = <T, U>(
    component: Component<T>,
    objOrFn: CreateStyledComponentObjectOrFunction<T, U>,
    attrs = {} as { isExtendStyleFromThemeVars?: boolean }
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
    return (styled(component).attrs(attrs as any)((props: any) =>
        themeStyledFunction(props)
    ) as unknown) as any
}

/**
 * To create new styles. It will return the classnames after
 * creating new styles.
 */
export const createStyle = <C extends string = string, Props = unknown>(
    styles:
        | Styles<C, Props, Theme>
        | ((theme: Theme) => Styles<C, Props, undefined>)
): ((props?: Props) => Classes<C>) => {
    if (typeof styles === 'object') {
        return createUseStyles(styles)
    }

    const fn = createUseStyles(styles)

    return (props = {} as Props) => {
        const theme = useTheme()
        return fn({ ...props, theme })
    }
}
