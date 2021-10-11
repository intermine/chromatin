import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { CARD_ACTION } from '../constants/component-ids'

import type { Ref } from '../utils'

export interface CardActionProps
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

const CardActionRoot = createStyledComponent<'div', CardActionProps>(
    'div',
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { body },
        } = themePropsForThemeVarFn

        return {
            padding: '1rem 0.5rem',
            ...body,
            ...(isExtendStyleFromThemeVars &&
                themeVars.cardAction(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const CardAction = (props: CardActionProps): JSX.Element => {
    const { children, className, classes = {}, innerRef, ...rest } = props

    return (
        <CardActionRoot
            className={cx(className, classes.root)}
            ref={innerRef}
            {...rest}
        >
            {children}
        </CardActionRoot>
    )
}

attachSignatureToComponent(CardAction, CARD_ACTION)
