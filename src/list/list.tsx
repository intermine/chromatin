import { Children, cloneElement, forwardRef } from 'react'
import cx from 'clsx'
import { CSSObject } from 'styled-components'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    themeTernaryOperator as tto
} from '../styles'
import { attachSignatureToComponent, getChromatinElementId } from '../utils'
import { LIST, LIST_HEADING, LIST_ITEM } from '../constants/component-ids'

import type { ListHeadingProps } from '../list-heading'
import type { ListItemProps } from '../list-item'

export interface ListProps
    extends Omit<
        React.HTMLProps<HTMLOListElement | HTMLUListElement>,
        'as' | 'ref'
    > {
    Component?: 'ul' | 'ol'
    /**
     * @default 'none'
     */
    listStyle?: CSSObject['listStyle']
    /**
     * To pass the props to the list items
     */
    listItemProps?: ListItemProps
    /**
     * To pass the props to the list headers
     */
    listHeadingProps?: ListHeadingProps
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

const ListRoot = createStyledComponent<'ul', ListProps>(
    'ul',
    (theme, props) => {
        const {
            csx = {},
            listStyle = 'none',
            isExtendStyleFromThemeVars = true
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            themeType,
            palette: {
                themeBackground: { light, dark }
            }
        } = themePropsForThemeVarFn

        return {
            background: tto(themeType, light.hex, dark.hex),
            boxSizing: 'border-box',
            borderRadius: '0',
            listStyle,
            margin: 0,
            padding: 0,
            position: 'relative',
            ...(isExtendStyleFromThemeVars &&
                themeVars.list(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
    (props, ref): JSX.Element => {
        const {
            children: childrenProps,
            className,
            classes = {},
            listItemProps = {},
            listHeadingProps = {},
            ...rest
        } = props

        const children = Children.map(childrenProps, (child: any) => {
            const id = getChromatinElementId(child)
            if (id === LIST_ITEM) {
                return cloneElement(child, {
                    ...listItemProps,
                    ...child.props
                })
            }

            if (id === LIST_HEADING) {
                return cloneElement(child, {
                    ...listHeadingProps,
                    ...child.props
                })
            }

            return child
        })
        return (
            <ListRoot
                ref={ref}
                className={cx(className, classes.root)}
                {...rest}
            >
                {children}
            </ListRoot>
        )
    }
)

attachSignatureToComponent(List, LIST)
