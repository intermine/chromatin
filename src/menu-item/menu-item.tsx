import { forwardRef } from 'react'
import cx from 'clsx'

import { createStyledComponent, getThemeCSSObject } from '../styles'
import { attachSignatureToComponent } from '../utils'
import { MENU_ITEM } from '../constants/component-ids'
import { ListItem, ListItemProps } from '../list-item'

export type MenuItemProps = ListItemProps

const MenuItemRoot = createStyledComponent<typeof ListItem, MenuItemProps>(
    ListItem,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {}, isExtendStyleFromThemeVars } = props
        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.menuItem(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const MenuItem = forwardRef<any, MenuItemProps>(
    (props, ref): JSX.Element => {
        const {
            children,
            className,
            classes = {},
            isButtonLike = true,
            ...rest
        } = props

        return (
            <MenuItemRoot
                className={cx(className, classes.root)}
                isButtonLike={isButtonLike}
                ref={ref}
                {...rest}
            >
                {children}
            </MenuItemRoot>
        )
    }
)

attachSignatureToComponent(MenuItem, MENU_ITEM)
