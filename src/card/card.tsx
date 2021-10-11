import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    themeTernaryOperator as tto,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { CARD } from '../constants/component-ids'

import type { Ref } from '../utils'
import { CSSObject } from 'styled-components'

export interface CardProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    innerRef?: Ref
    /**
     * @default 'shadow'
     */
    variant?: 'outlined' | 'shadow' | 'none'
    /**
     * default value is based on variant. If variant is outlined then
     * it is outlined other wise shadow.
     */
    hoverVariant?: 'outlined' | 'shadow' | 'none'
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

const CardRoot = createStyledComponent<'div', CardProps>(
    'div',
    (theme, props) => {
        const {
            csx = {},
            variant = 'shadow',
            hoverVariant = variant,
            isExtendStyleFromThemeVars = true,
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body },
            elevation,
            themeType,
            palette: {
                neutral,
                common: { white },
            },
        } = themePropsForThemeVarFn

        const getBoxShadow = (): string | undefined => {
            if (variant === 'none') {
                return
            }
            if (variant === 'shadow') {
                return elevation.low
            }
            return `inset 0 0 0 1px ${neutral[60]}`
        }

        const getHoverProperties = (): CSSObject => {
            if (hoverVariant === 'none') return {}
            if (hoverVariant === 'shadow') {
                return {
                    boxShadow: elevation.medium,
                }
            }

            return {
                boxShadow: `inset 0 0 0 2px ${neutral[60]}`,
            }
        }

        return {
            background: tto(themeType, white, neutral[40]),
            borderRadius: '0.25rem',
            boxShadow: getBoxShadow(),
            display: 'flex',
            flexDirection: 'column',
            '&:hover': getHoverProperties(),
            ...body,
            ...(isExtendStyleFromThemeVars &&
                themeVars.card(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const Card = (props: CardProps): JSX.Element => {
    const { children, className, classes = {}, innerRef, ...rest } = props

    return (
        <CardRoot
            className={cx(className, classes.root)}
            ref={innerRef}
            {...rest}
        >
            {children}
        </CardRoot>
    )
}

attachSignatureToComponent(Card, CARD)
