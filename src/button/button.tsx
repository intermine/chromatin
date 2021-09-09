import { ButtonBase, ButtonBaseProps } from '../button-base/button-base'
import { createStyle } from '../styles/theme/create/create-style'

export type ButtonProps<T> = ButtonBaseProps<T> & {
    size?: 'small' | 'regular' | 'large'
}

const ButtonRoot = createStyle<typeof ButtonBase, ButtonProps<'button'>>(
    ButtonBase,
    (theme, props) => {
        const { size = 'regular' } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { body, bodySm } = themePropsForThemeVarFn.typography

        const getPadding = (): string => {
            if (size === 'regular') return '0.7rem 1.4rem'
            if (size === 'small') return '0.4rem 1.2rem'
            return '1rem 2rem'
        }

        return {
            borderRadius: 4,
            padding: getPadding(),
            transition: '0.230s',
            ...(size === 'small' ? bodySm : body),
            ...themeVars.button(themePropsForThemeVarFn, props),
        }
    }
)

export const Button = <T,>(props: ButtonProps<T>): JSX.Element => {
    return <ButtonRoot {...props}>Test Button</ButtonRoot>
}
