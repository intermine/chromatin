import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { CARD_ACTION } from '../constants/component-ids'

export interface CardActionProps
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

const CardActionRoot = createStyledComponent<'div', CardActionProps>(
    'div',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body }
        } = themePropsForThemeVarFn

        return {
            padding: '1rem 0.5rem',
            ...body,
            lineHeight: 1.3,

            ...(isExtendStyleFromThemeVars &&
                themeVars.cardAction(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
    (props, ref): JSX.Element => {
        const { children, className, classes = {}, ...rest } = props

        return (
            <CardActionRoot
                className={cx(className, classes.root)}
                ref={ref}
                {...rest}
            >
                {children}
            </CardActionRoot>
        )
    }
)

attachSignatureToComponent(CardAction, CARD_ACTION)
