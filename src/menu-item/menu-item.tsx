import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    isThemeColorName,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent, Ref } from '../utils'
import { MENU_ITEM } from '../constants/component-ids'
import { CSSObject } from 'styled-components'
import { getHoverProperties } from '../button-base/utils'
import { ListItem, ListItemProps } from '../list-item'

export interface MenuItemProps extends ListItemProps {
    hoverable?: boolean
}

const MenuItemRoot = createStyledComponent<typeof ListItem, MenuItemProps>(
    ListItem,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {}, isExtendStyleFromThemeVars } = props
        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.menuItem(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const MenuItem = (props: MenuItemProps): JSX.Element => {
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
            {...rest}
        >
            {children}
        </MenuItemRoot>
    )
}

attachSignatureToComponent(MenuItem, MENU_ITEM)
