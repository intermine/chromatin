import React, { HTMLProps } from 'react'
import cx from 'clsx'

import { ButtonBaseCommonProps } from '../button-base'
import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'
import { attachSignatureToComponent, getChromatinElementId } from '../utils'
import {
    BUTTON_GROUP,
    BUTTON,
    ICON_BUTTON,
    BUTTON_BASE,
} from '../constants/component-ids'

import type { Ref } from '../utils'

import { ButtonProps } from '../button'
import { IconButtonProps } from '../icon-button'
import { CSSObject } from 'styled-components'

export interface ButtonGroupProps<T>
    extends Omit<HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'size'> {
    variant?: ButtonBaseCommonProps['variant']
    size?: 'small' | 'regular' | 'large'
    innerRef?: Ref
    /**
     * Only applied to button, button-base or icon-button
     */
    buttonProps?: ButtonProps<T> | IconButtonProps<T>
    /**
     * @default 'inline-flex'
     */
    display?: CSSObject['display']
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Only applied to button, button-base or icon-button
         */
        buttonGroupChild?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
        /**
         * Only applied to button, button-base or icon-button
         */
        buttonGroupChild?: ThemeCSSStyles
    }
}

const ButtonGroupRoot = createStyledComponent<
    'div',
    ButtonGroupProps<'button'>
>('div', (theme, props) => {
    const { themeVars, ...themePropsForThemeVarFn } = theme
    const {
        csx = {},
        display = 'inline-flex',
        isExtendStyleFromThemeVars = true,
    } = props

    return {
        boxSizing: 'border-box',
        display,
        '& .bg-child': {
            borderRadius: 0,
            borderRightWidth: 0,
            marginRight: '0.0625rem',
            marginLeft: '0.0625rem',
            position: 'relative',
        },

        '& .bg-child:first-child': {
            borderBottomLeftRadius: '0.25rem',
            borderTopLeftRadius: '0.25rem',
            marginLeft: 0,
        },

        '& .bg-child:last-child': {
            borderBottomRightRadius: '0.25rem',
            borderTopRightRadius: '0.25rem',
            marginRight: 0,
        },
        ...(isExtendStyleFromThemeVars &&
            themeVars.buttonGroup(themePropsForThemeVarFn, props)),
        ...getThemeCSSObject(csx.root, theme),
    }
})

export const ButtonGroup = <T,>(props: ButtonGroupProps<T>): JSX.Element => {
    const {
        children: childrenProps,
        innerRef,
        className,
        classes = {},
        csx = {},
        buttonProps = {},
        ...rest
    } = props

    const { buttonGroupChild, root } = classes

    const children = React.Children.map(childrenProps, (child: any) => {
        const id = getChromatinElementId(child)
        if (id === BUTTON || id === ICON_BUTTON || id === BUTTON_BASE) {
            return React.cloneElement(child, {
                ...buttonProps,
                ...child.props,
                className: cx(
                    'bg-child',
                    child.props.className,
                    buttonGroupChild
                ),
            })
        }
        return child
    })

    return (
        <ButtonGroupRoot
            className={cx(className, root)}
            ref={innerRef}
            csx={csx}
            {...rest}
        >
            {children}
        </ButtonGroupRoot>
    )
}

attachSignatureToComponent(ButtonGroup, BUTTON_GROUP)
