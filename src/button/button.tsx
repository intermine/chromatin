import { CSSObject } from 'styled-components'
import { ButtonBase, ButtonBaseProps } from '../button-base/button-base'
import { createStyledComponent } from '../styles'

import type { ReactElement } from '../styles'

export type ButtonProps<T> = ButtonBaseProps<T> & {
    size?: 'small' | 'regular' | 'large'
    hasFullWidth?: boolean
    RightIcon?: ReactElement
    LeftIcon?: ReactElement
}

type IconContainerProps = {
    isRight?: boolean
    /**
     * same as button sizes
     */
    size?: 'small' | 'regular' | 'large'
    children: ReactElement
}

const IconContainer = createStyledComponent<'span', IconContainerProps>(
    'span',
    (_, props) => {
        const { isRight, size = 'regular', children } = props

        const getIconProperties = (): CSSObject => {
            let dim = '1rem'
            if (size === 'regular' || size === 'large')
                return { height: dim, width: dim }

            dim = '0.75rem'
            return { height: dim, width: dim }
        }

        if (!children) {
            return {
                display: 'none',
            }
        }

        return {
            '& svg': getIconProperties(),
            boxSizing: 'border-box',
            display: 'inline-flex',
            marginLeft: isRight ? undefined : '0.5rem',
            marginRight: isRight ? '0.5rem' : undefined,
            transition: '0.130s',
        }
    }
)

const ButtonRoot = createStyledComponent<
    typeof ButtonBase,
    ButtonProps<'button'>
>(ButtonBase, (theme, props) => {
    const { size = 'regular', hasFullWidth = false } = props
    const { themeVars, ...themePropsForThemeVarFn } = theme
    const { body, bodySm } = themePropsForThemeVarFn.typography

    const getPadding = (): string => {
        if (size === 'regular') return '0.7rem 1.4rem'
        if (size === 'small') return '0.4rem 1.2rem'
        return '1rem 2rem'
    }

    return {
        borderRadius: '0.25rem',
        padding: getPadding(),
        width: (hasFullWidth && '100%') || undefined,
        transition: '0.130s',
        ...(size === 'small' ? bodySm : body),
        ...themeVars.button(themePropsForThemeVarFn, props),
    }
})

export const Button = <T,>(props: ButtonProps<T>): JSX.Element => {
    const {
        children,
        RightIcon: RightIconProps,
        LeftIcon: LeftIconProps,
        size,
        ...rest
    } = props

    const styleProps = {
        size,
    }

    return (
        <ButtonRoot {...styleProps} {...rest}>
            <IconContainer isRight {...styleProps}>
                {LeftIconProps}
            </IconContainer>
            {children}
            <IconContainer {...styleProps}>{RightIconProps}</IconContainer>
        </ButtonRoot>
    )
}
