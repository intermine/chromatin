import { createStyledComponent } from '../styles'

export interface BoxProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    innerRef?: React.RefObject<any>
}

const BoxRoot = createStyledComponent('div', () => {
    return {}
})

export const Box = (props: BoxProps): JSX.Element => {
    const { children, innerRef, ...rest } = props
    return (
        <BoxRoot ref={innerRef} {...rest}>
            {children}
        </BoxRoot>
    )
}
