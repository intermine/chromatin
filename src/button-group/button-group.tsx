import React, { HTMLProps } from 'react'
import cx from 'clsx'

import { ButtonBaseCommonProps } from '..'
import { createStyledComponent } from '../styles'

export interface ButtonGroupProps
    extends Omit<HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'size'> {
    variant?: ButtonBaseCommonProps['variant']
    size?: 'small' | 'regular' | 'large'
    innerRef?: React.RefObject<any>
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        buttonGroupRoot?: string
        /**
         * Applied to child component
         */
        buttonGroupChild?: string
    }
}

const ButtonGroupRoot = createStyledComponent<'div', ButtonGroupProps>(
    'div',
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
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
        }
    }
)

export const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {
    const {
        children: childrenProps,
        innerRef,
        className,
        classes = {},
        ...rest
    } = props

    const { buttonGroupChild, buttonGroupRoot } = classes

    const children = React.Children.map(childrenProps, (child: any) => {
        return React.cloneElement(child, {
            elevation: false,
            ...rest,
            ...child.props,
            className: cx('bg-child', child.props.className, buttonGroupChild),
        })
    })

    return (
        <ButtonGroupRoot
            className={cx(className, buttonGroupRoot)}
            ref={innerRef}
            {...rest}
        >
            {children}
        </ButtonGroupRoot>
    )
}
