import cx from 'clsx'

import { createStyledComponent, getThemeCSSObject } from '../styles'
import { attachSignatureToComponent, Ref } from '../utils'
import { MENU_HEADING } from '../constants/component-ids'
import { ListHeading, ListHeadingProps } from '../list-heading'

export interface MenuHeadingProps extends ListHeadingProps {
    hoverable?: boolean
}

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
            ...getThemeCSSObject(csx.root, theme),
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const MenuHeading = (props: MenuHeadingProps): JSX.Element => {
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
            {...rest}
        >
            {children}
        </MenuHeadingRoot>
    )
}

attachSignatureToComponent(MenuHeading, MENU_HEADING)
