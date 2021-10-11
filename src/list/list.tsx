import { Children, cloneElement } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    themeTernaryOperator as tto,
} from '../styles'
import { attachSignatureToComponent, getChromatinElementId } from '../utils'
import { LIST, LIST_HEADING, LIST_ITEM } from '../constants/component-ids'
import { CSSObject } from 'styled-components'

import type { Ref } from '../utils'
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
    innerRef?: Ref
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
            isExtendStyleFromThemeVars = true,
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            themeType,
            palette: { recommendedThemeBackground: bg },
        } = themePropsForThemeVarFn

        return {
            background: tto(themeType, bg.light, bg.dark),
            boxSizing: 'border-box',
            listStyle,
            padding: 0,
            position: 'relative',
            margin: 0,
            ...(isExtendStyleFromThemeVars &&
                themeVars.list(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const List = (props: ListProps): JSX.Element => {
    const {
        children: childrenProps,
        className,
        classes = {},
        innerRef,
        listItemProps = {},
        listHeadingProps = {},
        ...rest
    } = props

    const children = Children.map(childrenProps, (child: any) => {
        const id = getChromatinElementId(child)
        if (id === LIST_ITEM) {
            return cloneElement(child, {
                ...listItemProps,
                ...child.props,
            })
        }

        if (id === LIST_HEADING) {
            return cloneElement(child, {
                ...listHeadingProps,
                ...child.props,
            })
        }

        return child
    })
    return (
        <ListRoot
            ref={innerRef}
            className={cx(className, classes.root)}
            {...rest}
        >
            {children}
        </ListRoot>
    )
}

attachSignatureToComponent(List, LIST)
