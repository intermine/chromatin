import { CSSObject } from 'styled-components'
import { createStyledComponent, ReactElement } from '../styles'

export type IconContainerProps = {
    children?: ReactElement
    size?: 'small' | 'regular' | 'large'
}

const IconContainerRoot = createStyledComponent<'div', IconContainerProps>(
    'div',
    (_, props) => {
        const { size = 'regular' } = props

        const getDimension = (): CSSObject => {
            if (size === 'regular') {
                return {
                    height: '1rem',
                    width: '1rem',
                }
            }

            if (size === 'large') {
                return {
                    height: '1.5rem',
                    width: '1.5rem',
                }
            }

            return {
                height: '0.5rem',
                width: '0.5rem',
            }
        }

        return {
            alignItems: 'center',
            display: 'inline-flex',
            justifyContent: 'center',
            ...getDimension(),
        }
    }
)

export const IconContainer = (props: IconContainerProps) => {
    const { children, ...rest } = props
    return <IconContainerRoot {...rest}>{props.children}</IconContainerRoot>
}
