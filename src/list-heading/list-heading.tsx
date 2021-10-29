import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    getNeutralBasicColorForComponent
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { LIST_HEADING } from '../constants/component-ids'

export interface ListHeadingProps
    extends Omit<React.HTMLProps<HTMLLIElement>, 'as' | 'ref'> {
    /**
     * @default true
     */
    hasPadding?: boolean
    /**
     * To have dense padding
     */
    isDense?: boolean
    /**
     * To specify heading is sticky or normal
     * @default true
     */
    isSticky?: boolean
    /**
     * To specify font size
     * @default 'sub'
     */
    headingType?: 'main' | 'sub'
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

const ListHeadingRoot = createStyledComponent<'li', ListHeadingProps>(
    'li',
    (theme, props) => {
        const {
            csx = {},
            headingType = 'sub',
            hasPadding = true,
            isDense = false,
            isSticky = true,
            isExtendStyleFromThemeVars = true
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            typography: { title, caption }
        } = themePropsForThemeVarFn

        const _neutral = getNeutralBasicColorForComponent({
            theme,
            isOpposite: true
        })

        const getPadding = (): string | undefined => {
            if (!hasPadding) return
            if (isDense) return '0.4rem 1.2rem'
            return '0.7rem 1.4rem'
        }

        return {
            background: 'inherit',
            color: _neutral[70],
            padding: getPadding(),
            position: isSticky ? 'sticky' : 'relative',
            top: 0,
            zIndex: 1,
            ...(headingType === 'sub' ? caption : title),
            ...(isExtendStyleFromThemeVars &&
                themeVars.listHeading(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const ListHeading = forwardRef<HTMLLIElement, ListHeadingProps>(
    (props, ref): JSX.Element => {
        const { children, className, classes = {}, ...rest } = props

        return (
            <ListHeadingRoot
                ref={ref}
                className={cx(className, classes.root)}
                {...rest}
            >
                {children}
            </ListHeadingRoot>
        )
    }
)

attachSignatureToComponent(ListHeading, LIST_HEADING)
