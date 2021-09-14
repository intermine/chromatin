import { createStyle } from '../styles'

export type IconContainerProps = {}

const Span = createStyle('span', (theme, props) => {
    return {}
})

export const IconContainer = (props: IconContainerProps) => {
    return <Span>{props.children}</Span>
}
