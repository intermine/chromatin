import { ButtonBase, ButtonBaseProps } from '../button-base/button-base'
import { createStyledComponent } from '../styles'

import type { ReactElement } from '../styles'

export type IconButtonProps<T> = ButtonBaseProps<T> & {
    size?: 'small' | 'regular' | 'large'
    Icon?: ReactElement
    /**
     * @default 'squircle'
     */
    borderStyle?: 'circle' | 'squircle' | 'square-circle'
    /**
     * @default false
     */
    isDense?: boolean
}

const ButtonRoot = createStyledComponent<
    typeof ButtonBase,
    IconButtonProps<'button'>
>(ButtonBase, (theme, props) => {
    const {
        size = 'regular',
        borderStyle = 'squircle',
        isDense = false,
    } = props
    const { themeVars, ...themePropsForThemeVarFn } = theme

    const getBorderRadius = (): string => {
        if (borderStyle === 'squircle' || borderStyle === 'square-circle') {
            return '0.5rem'
        }
        return '10rem'
    }

    const getPadding = (): string => {
        if (size === 'regular') {
            if (isDense) return '0.4rem'
            return '0.75rem'
        }

        if (size === 'small') {
            if (isDense) return '0.2rem'
            return '0.4rem'
        }

        if (isDense) return '0.4rem'
        return '1rem'
    }

    const getDimensions = (): string => {
        if (size === 'regular') {
            if (isDense) return '1.8rem'
            return '2.5rem'
        }
        if (size === 'small') {
            if (isDense) return '1.1rem'
            return '1.5rem'
        }

        if (isDense) return '2.3rem'
        return '3.5rem'
    }

    const dim = getDimensions()
    return {
        borderRadius: getBorderRadius(),
        height: dim,
        padding: getPadding(),
        transition: '0.130s',
        width: dim,
        ...themeVars.iconButton(themePropsForThemeVarFn, props),
    }
})

export const IconButton = <T,>(props: IconButtonProps<T>): JSX.Element => {
    const { Icon, variant = 'ghost', ...rest } = props
    return (
        <ButtonRoot variant={variant} {...rest}>
            {Icon}
        </ButtonRoot>
    )
}
