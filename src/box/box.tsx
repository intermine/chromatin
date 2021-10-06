import cx from 'clsx'
import { CSSObject } from 'styled-components'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { BOX } from '../constants/component-ids'

import type { Ref } from '../utils'

export interface BoxProps<T>
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    innerRef?: Ref<T>
    Component?:
        | React.ElementType
        | React.ComponentType<T>
        | React.ForwardRefExoticComponent<T>

    /**
     * To keep content at center
     * @default false
     */
    isContentCenter?: boolean
    /**
     * To align content center
     * @default false
     */
    isContentAlignCenter?: boolean
    /**
     * To justify content center
     * @default false
     */
    isContentJustifyCenter?: boolean
    /**
     * @default false
     */
    hasFullWidth?: boolean
    display?: string
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
    }
}

const BoxRoot = createStyledComponent<'div', BoxProps<'div'>>(
    'div',
    (theme, props) => {
        const {
            csx = {},
            hasFullWidth,
            isContentAlignCenter,
            isContentJustifyCenter,
            isContentCenter,
            display,
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body },
        } = themePropsForThemeVarFn

        const getContentProperties = (): CSSObject => {
            const contentProps: CSSObject = {}

            if (
                isContentAlignCenter ||
                isContentCenter ||
                isContentJustifyCenter
            ) {
                contentProps.display = 'flex'
            } else {
                return {}
            }

            if (isContentCenter || isContentJustifyCenter)
                contentProps.justifyContent = 'center'
            if (isContentCenter || isContentAlignCenter)
                contentProps.alignItems = 'center'

            return contentProps
        }

        return {
            display,
            width: hasFullWidth ? '100%' : undefined,
            ...body,
            ...getContentProperties(),
            ...themeVars.box(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const Box = <T,>(props: BoxProps<T>): JSX.Element => {
    const {
        children,
        className,
        classes = {},
        innerRef,
        Component = 'div',
        ...rest
    } = props

    return (
        <BoxRoot
            className={cx(className, classes.root)}
            as={Component}
            ref={innerRef}
            {...rest}
        >
            {children}
        </BoxRoot>
    )
}

attachSignatureToComponent(Box, BOX)
