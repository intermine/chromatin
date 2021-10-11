import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { CARD_CONTENT } from '../constants/component-ids'

import type { Ref } from '../utils'

export interface CardContentProps
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

const CardContentRoot = createStyledComponent<'div', CardContentProps>(
    'div',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body },
            palette: { neutral },
        } = themePropsForThemeVarFn

        return {
            color: neutral[70],
            flex: '1',
            padding: '1.2rem',
            ...body,
            lineHeight: 1.5,
            ...(isExtendStyleFromThemeVars &&
                themeVars.cardContent(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const CardContent = (props: CardContentProps): JSX.Element => {
    const { children, className, classes = {}, innerRef, ...rest } = props

    return (
        <CardContentRoot
            className={cx(className, classes.root)}
            ref={innerRef}
            {...rest}
        >
            {children}
        </CardContentRoot>
    )
}

attachSignatureToComponent(CardContent, CARD_CONTENT)
