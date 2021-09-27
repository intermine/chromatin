import React, { HTMLProps } from 'react'
import cx from 'clsx'

import { ButtonBaseCommonProps } from '..'
import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'

import type { Ref } from '../utils'

export interface ButtonGroupProps
    extends Omit<HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'size'> {
    variant?: ButtonBaseCommonProps['variant']
    size?: 'small' | 'regular' | 'large'
    innerRef?: Ref
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to child component
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
         * Applied to child component
         */
        buttonGroupChild?: ThemeCSSStyles
    }
}

const ButtonGroupRoot = createStyledComponent<'div', ButtonGroupProps>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { csx = {} } = props

        return {
            boxSizing: 'border-box',
            display: 'inline-flex',
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
            ...themeVars.buttonGroup(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {
    const {
        children: childrenProps,
        innerRef,
        className,
        classes = {},
        csx = {},
        ...rest
    } = props

    const { buttonGroupChild, root } = classes

    const children = React.Children.map(childrenProps, (child: any) => {
        return React.cloneElement(child, {
            elevation: false,
            ...rest,
            ...child.props,
            className: cx('bg-child', child.props.className, buttonGroupChild),
            csx: { root: csx.buttonGroupChild },
        })
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
