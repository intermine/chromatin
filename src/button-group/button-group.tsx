import React, { HTMLProps } from 'react'
import { ButtonBaseCommonProps } from '..'
import { createStyle } from '../styles'

export interface ButtonGroupProps
    extends Omit<HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'size'> {
    variant?: ButtonBaseCommonProps['variant']
    size?: 'small' | 'regular' | 'large'
    innerRef?: React.RefObject<any>
}

const ButtonGroupRoot = createStyle<'div', ButtonGroupProps>('div', () => {
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
    }
})

export const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {
    const { children: childrenProps, ...rest } = props
    const children = React.Children.map(childrenProps, (child: any) => {
        return React.cloneElement(child, {
            elevation: false,
            noHighlightOnFocus: true,
            ...rest,
            ...child.props,
            className: 'bg-child ' + (child.props.className ?? ''),
        })
    })

    return <ButtonGroupRoot {...rest}>{children}</ButtonGroupRoot>
}
