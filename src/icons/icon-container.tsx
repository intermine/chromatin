import { createStyle, ReactElement } from '../styles'

export type IconContainerProps = {
    children?: ReactElement
}

const Span = createStyle('span', (theme, props) => {
    return {
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
    }
})

export const IconContainer = (props: IconContainerProps) => {
    return <Span>{props.children}</Span>
}
