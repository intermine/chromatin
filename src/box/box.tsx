import { createStyledComponent } from '../styles'

export interface BoxProps<T>
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    innerRef?: React.RefObject<any>
    Component?:
        | React.ElementType
        | React.ComponentType<T>
        | React.ForwardRefExoticComponent<T>
}

const BoxRoot = createStyledComponent('div', () => {
    return {}
})

export const Box = <T,>(props: BoxProps<T>): JSX.Element => {
    const { children, innerRef, Component = 'div', ...rest } = props
    return (
        <BoxRoot as={Component} ref={innerRef} {...rest}>
            {children}
        </BoxRoot>
    )
}
