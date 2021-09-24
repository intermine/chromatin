import { CSSObject } from 'styled-components'
import cx from 'clsx'

import {
    createStyledComponent,
    isThemeColorName,
    isThemeFontVariant,
    ThemeTypographyVariant,
    themeTernaryOperator as tto,
    ThemeCSSStyles,
    getThemeCSSObject,
} from '../styles'

export interface TypographyProps<T>
    extends Omit<
        React.HTMLProps<
            | HTMLHeadingElement
            | HTMLParagraphElement
            | HTMLSpanElement
            | HTMLDivElement
        >,
        'as' | 'ref'
    > {
    innerRef?: React.RefObject<any>
    Component?:
        | React.ElementType
        | React.ComponentType<T>
        | React.ForwardRefExoticComponent<T>

    variant?: ThemeTypographyVariant
    color?: string
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        typographyRoot?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        typographyRoot?: ThemeCSSStyles
    }
}

const TypographyRoot = createStyledComponent<'div', TypographyProps<'div'>>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { typography, palette, themeType } = themePropsForThemeVarFn
        const {
            variant = 'body',
            color = tto(themeType, palette.common.black, palette.common.white),
            csx = {},
        } = props

        const getColor = (): string | undefined => {
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
            ...themeVars.typography(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.typographyRoot, theme),
        }
    }
)

export const Typography = <T,>(props: TypographyProps<T>): JSX.Element => {
    const {
        children,
        innerRef,
        variant,
        className,
        classes = {},
        Component,
        ...rest
    } = props

    const getComponent = (): TypographyProps<T>['Component'] => {
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
            ref={innerRef}
            variant={variant}
            className={cx(className, classes.typographyRoot)}
            {...rest}
        >
            {children}
        </TypographyRoot>
    )
}
