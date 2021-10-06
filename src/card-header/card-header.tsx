import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { CARD_HEADER } from '../constants/component-ids'

import type { Ref } from '../utils'

export interface CardHeaderProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    innerRef?: Ref
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
        const { csx = {} } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { h4 },
            palette: { neutral },
        } = themePropsForThemeVarFn

        return {
            alignItems: 'center',
            color: neutral[90],
            display: 'flex',
            padding: '1rem 1.2rem',
            ...h4,
            ...themeVars.cardHeader(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const CardHeader = (props: CardHeaderProps): JSX.Element => {
    const { children, className, classes = {}, innerRef, ...rest } = props

    return (
        <CardHeaderRoot
            className={cx(className, classes.root)}
            ref={innerRef}
            {...rest}
        >
            {children}
        </CardHeaderRoot>
    )
}

attachSignatureToComponent(CardHeader, CARD_HEADER)
