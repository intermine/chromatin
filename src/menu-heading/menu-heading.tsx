import { forwardRef } from 'react'
import cx from 'clsx'

import { createStyledComponent, getThemeCSSObject } from '../styles'
import { attachSignatureToComponent } from '../utils'
import { MENU_HEADING } from '../constants/component-ids'
import { ListHeading, ListHeadingProps } from '../list-heading'

export type MenuHeadingProps = ListHeadingProps

const MenuHeadingRoot = createStyledComponent<
    typeof ListHeading,
    MenuHeadingProps
>(
    ListHeading,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {}, isExtendStyleFromThemeVars } = props
        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.menuHeading(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const MenuHeading = forwardRef<any, MenuHeadingProps>(
    (props, ref): JSX.Element => {
        const {
            children,
            className,
            classes = {},
            isSticky = false,
            ...rest
        } = props

        return (
            <MenuHeadingRoot
                isSticky={isSticky}
                className={cx(className, classes.root)}
                ref={ref}
                {...rest}
            >
                {children}
            </MenuHeadingRoot>
        )
    }
)

attachSignatureToComponent(MenuHeading, MENU_HEADING)
