import { ButtonBase, ButtonBaseProps } from '../button-base/button-base'
import { createStyle } from '../styles'

import type { ReactElement } from '../styles'

export type IconButtonProps<T> = ButtonBaseProps<T> & {
    size?: 'small' | 'regular' | 'large'
    Icon?: ReactElement
}

const ButtonRoot = createStyle<typeof ButtonBase, IconButtonProps<'button'>>(
    ButtonBase,
    (theme, props) => {
        const { size = 'regular' } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        const getPadding = (): string => {
            if (size === 'regular') return '0.75rem'
            if (size === 'small') return '0.4rem'
            return '0.8rem'
        }

        const getDimensions = (): string => {
            if (size === 'regular') return '2.5rem'
            if (size === 'small') return '1.5rem'
            return '3.5rem'
        }

        const dim = getDimensions()
        return {
            borderRadius: '50%',
            height: dim,
            padding: getPadding(),
            transition: '0.130s',
            width: dim,
            ...themeVars.iconButton(themePropsForThemeVarFn, props),
        }
    }
)

export const IconButton = <T,>(props: IconButtonProps<T>): JSX.Element => {
    const { Icon, variant = 'ghost', ...rest } = props
    return (
        <ButtonRoot variant={variant} {...rest}>
            {Icon}
        </ButtonRoot>
    )
}