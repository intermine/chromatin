import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    getNeutralBasicColorForComponent
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { CARD_CONTENT } from '../constants/component-ids'

export interface CardContentProps
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

const CardContentRoot = createStyledComponent<'div', CardContentProps>(
    'div',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body }
        } = themePropsForThemeVarFn

        const _neutral = getNeutralBasicColorForComponent({
            theme,
            isOpposite: true
        })

        return {
            color: _neutral[80],
            flex: '1',
            padding: '1.2rem',
            ...body,
            lineHeight: 1.3,
            ...(isExtendStyleFromThemeVars &&
                themeVars.cardContent(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    (props, ref): JSX.Element => {
        const { children, className, classes = {}, ...rest } = props

        return (
            <CardContentRoot
                className={cx(className, classes.root)}
                ref={ref}
                {...rest}
            >
                {children}
            </CardContentRoot>
        )
    }
)
attachSignatureToComponent(CardContent, CARD_CONTENT)
