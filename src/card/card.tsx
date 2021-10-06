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

export interface CardProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    innerRef?: Ref
    /**
     * @default 'shadow'
     */
    variant?: 'outlined' | 'shadow'
    /**
     * default value is based on variant. If variant is outlined then
     * it is outlined other wise shadow.
     */
    hoverVariant?: 'outlined' | 'shadow'
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
        const { csx = {}, variant = 'shadow', hoverVariant = variant } = props
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

        return {
            background: tto(themeType, white, neutral[40]),
            borderRadius: '0.25rem',
            boxShadow:
                variant === 'shadow'
                    ? elevation.low
                    : `inset 0 0 0 1px ${neutral[60]}`,
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
                boxShadow:
                    hoverVariant === 'shadow'
                        ? elevation.medium
                        : `inset 0 0 0 2px ${neutral[60]}`,
            },
            ...body,
            ...themeVars.card(themePropsForThemeVarFn, props),
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
