import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    themeTernaryOperator as tto
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { CARD_HEADER } from '../constants/component-ids'

export interface CardHeaderProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
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

const CardHeaderRoot = createStyledComponent<'div', CardHeaderProps>(
    'div',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            themeType,
            typography: { h4 },
            palette: {
                common: { black, white }
            }
        } = themePropsForThemeVarFn

        return {
            alignItems: 'center',
            color: tto(themeType, black, white),
            display: 'flex',
            padding: '1rem 1.2rem',
            ...h4,
            lineHeight: 1.5,
            ...(isExtendStyleFromThemeVars &&
                themeVars.cardHeader(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    (props, ref): JSX.Element => {
        const { children, className, classes = {}, ...rest } = props

        return (
            <CardHeaderRoot
                className={cx(className, classes.root)}
                ref={ref}
                {...rest}
            >
                {children}
            </CardHeaderRoot>
        )
    }
)

attachSignatureToComponent(CardHeader, CARD_HEADER)
