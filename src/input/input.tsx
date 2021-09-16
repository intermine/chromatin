import { CSSObject } from 'styled-components'

import { InputBase, InputBaseProps } from '../input-base'
import { createStyledComponent } from '../styles'

export interface InputProps extends InputBaseProps {
    /**
     * @default false
     */
    hasFullWidth?: boolean
    /**
     * @default regular
     */
    size?: 'small' | 'regular' | 'large'
}

interface ContainerProps {
    hasFullWidth?: InputProps['hasFullWidth']
}

interface IconContainerProps {
    isRight?: boolean
    color?: string
}

const InputRoot = createStyledComponent<typeof InputBase, InputProps>(
    InputBase,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { size = 'regular' } = props
        const { body, bodySm, h3 } = themePropsForThemeVarFn.typography

        const getPadding = (): string => {
            if (size === 'regular') return '0.4rem 0.625rem'
            if (size === 'small') return '0.3rem 0.4rem'

            return '0.5rem 0.8rem'
        }

        const getTypographyProperties = (): CSSObject => {
            if (size === 'regular') return body
            if (size === 'small') return bodySm
            return { ...h3, fontWeight: 500 }
        }

        return {
            borderRadius: '0.25rem',
            flex: 1,
            padding: getPadding(),
            ...getTypographyProperties(),
            ...themeVars.input(themePropsForThemeVarFn, props),
        }
    }
)

const Container = createStyledComponent<'div', ContainerProps>(
    'div',
    (_, props) => {
        const { hasFullWidth = false } = props

        return {
            boxSizing: 'border-box',
            display: 'inline-flex',
            width: (hasFullWidth && '100%') || undefined,
        }
    }
)

// const IconContainer = createStyledComponent<'span', IconContainerProps>(
//     'span',
//     (theme, props) => {

//     }
// )

export const Input = (props: InputProps): JSX.Element => {
    const { hasFullWidth, ...rest } = props

    return (
        <Container hasFullWidth={hasFullWidth}>
            <InputRoot {...rest} />
        </Container>
    )
}
