import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    themeTernaryOperator as tto,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { LIST_HEADING } from '../constants/component-ids'

import { Ref } from '../utils'

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
    innerRef?: Ref
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
            isExtendStyleFromThemeVars = true,
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            themeType,
            palette: { recommendedThemeBackground: bg, neutral },
            typography: { title, caption },
        } = themePropsForThemeVarFn

        const getPadding = (): string | undefined => {
            if (!hasPadding) return
            if (isDense) return '0.4rem 1.2rem'
            return '0.7rem 1.4rem'
        }

        return {
            background: tto(themeType, bg.light, bg.dark),
            color: neutral[70],
            padding: getPadding(),
            position: isSticky ? 'sticky' : 'relative',
            top: 0,
            zIndex: 1,
            ...(headingType === 'sub' ? caption : title),
            ...(isExtendStyleFromThemeVars &&
                themeVars.listHeading(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const ListHeading = (props: ListHeadingProps): JSX.Element => {
    const { children, innerRef, className, classes = {}, ...rest } = props

    return (
        <ListHeadingRoot
            ref={innerRef}
            className={cx(className, classes.root)}
            {...rest}
        >
            {children}
        </ListHeadingRoot>
    )
}

attachSignatureToComponent(ListHeading, LIST_HEADING)
