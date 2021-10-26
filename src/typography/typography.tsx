import { forwardRef } from 'react'
import { CSSObject } from 'styled-components'
import cx from 'clsx'

import {
    createStyledComponent,
    isThemeColorName,
    isThemeFontVariant,
    ThemeTypographyVariant,
    ThemeCSSStyles,
    getThemeCSSObject
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { TYPOGRAPHY } from '../constants/component-ids'

export interface TypographyBaseProps
    extends Omit<
        React.HTMLProps<
            | HTMLHeadingElement
            | HTMLParagraphElement
            | HTMLSpanElement
            | HTMLDivElement
        >,
        'as' | 'ref'
    > {
    variant?: ThemeTypographyVariant
    color?: string
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

export type TypographyProps<T> = TypographyBaseProps & {
    Component?:
        | React.ElementType
        | React.ComponentType<T>
        | React.ForwardRefExoticComponent<T>
} & T

const TypographyRoot = createStyledComponent<'div', TypographyProps<'div'>>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { typography, palette } = themePropsForThemeVarFn
        const {
            variant = 'body',
            color,
            csx = {},
            isExtendStyleFromThemeVars = true
        } = props

        const getColor = (): string | undefined => {
            if (!color) return palette.neutral[90]
            if (isThemeColorName(color)) return palette[color].main
            return color
        }

        const getFontProperties = (): CSSObject => {
            if (!isThemeFontVariant(variant)) {
                return typography.body
            }
            return typography[variant]
        }

        return {
            color: getColor(),
            ...getFontProperties(),
            ...(isExtendStyleFromThemeVars &&
                themeVars.typography(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const Typography = forwardRef(
    <T,>(props: TypographyProps<T>, ref: any): JSX.Element => {
        const {
            children,
            variant,
            className,
            classes = {},
            Component,
            ...rest
        } = props

        const getComponent = (): React.ElementType => {
            if (Component) return Component
            switch (variant) {
                case 'body':
                case 'bodyLg':
                case 'bodySm':
                case 'title':
                case 'small':
                case 'caption':
                    return 'div'
                default:
                    if (variant) return variant
                    return 'div'
            }
        }

        return (
            <TypographyRoot
                as={getComponent()}
                ref={ref}
                variant={variant}
                className={cx(className, classes.root)}
                {...rest}
            >
                {children}
            </TypographyRoot>
        )
    }
) as <T>(props: TypographyProps<T> & { ref?: any }) => JSX.Element

attachSignatureToComponent(Typography, TYPOGRAPHY)
