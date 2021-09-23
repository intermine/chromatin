import { CSSObject } from 'styled-components'
import {
    createStyledComponent,
    isThemeColorName,
    isThemeFontVariant,
    ThemeTypographyVariant,
    themeTernaryOperator as tto,
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
}

const TypographyRoot = createStyledComponent<'span', TypographyProps<'span'>>(
    'span',
    (theme, props) => {
        const { typography, palette, themeType } = theme
        const {
            variant = 'body',
            color = tto(themeType, palette.common.black, palette.common.white),
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
        }
    }
)

export const Typography = <T,>(props: TypographyProps<T>): JSX.Element => {
    const { children, innerRef, variant, Component, ...rest } = props

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
            {...rest}
        >
            {children}
        </TypographyRoot>
    )
}
