import { CSSObject } from 'styled-components'

import { ButtonBase, ButtonBaseProps } from '../button-base/button-base'
import { createStyledComponent, createStyle } from '../styles'

import type { ReactElement } from '../styles'

import { Spinner } from '../loading'

export type ButtonProps<T> = ButtonBaseProps<T> & {
    size?: 'small' | 'regular' | 'large'
    hasFullWidth?: boolean
    RightIcon?: ReactElement
    LeftIcon?: ReactElement
    /**
     * @default false
     */
    isDense?: boolean
    /**
     * @default false
     */
    isLoading?: boolean
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

        const getDimProperties = (): CSSObject => {
            let dim = '1rem'
            if (size === 'regular') return { height: dim, width: dim }

            dim = '0.75rem'
            if (size === 'small') return { height: dim, width: dim }

            dim = '1.5rem'
            return { height: dim, width: dim }
        }

        if (!children) {
            return {
                display: 'none',
            }
        }

        return {
            boxSizing: 'border-box',
            display: 'inline-flex',
            marginLeft: isRight ? undefined : '0.5rem',
            marginRight: isRight ? '0.5rem' : undefined,
            transition: '0.130s',
            ...getDimProperties(),
        }
    }
)

const ButtonRoot = createStyledComponent<
    typeof ButtonBase,
    ButtonProps<'button'>
>(ButtonBase, (theme, props) => {
    const { size = 'regular', hasFullWidth = false, isDense = false } = props
    const { themeVars, ...themePropsForThemeVarFn } = theme
    const { body, bodySm, bodyLg } = themePropsForThemeVarFn.typography

    const getPadding = (): string => {
        if (size === 'regular') {
            if (isDense) return '0.4rem 1.2rem'
            return '0.7rem 1.4rem'
        }

        if (size === 'small') {
            if (isDense) return '0.2rem 0.6rem'
            return '0.4rem 1.2rem'
        }

        if (isDense) return '0.5rem 1rem'
        return '1rem 2rem'
    }

    const getFontProperties = (): CSSObject => {
        if (size === 'regular') return body
        if (size === 'small') return bodySm
        return bodyLg
    }

    return {
        borderRadius: '0.25rem',
        padding: getPadding(),
        width: (hasFullWidth && '100%') || undefined,
        transition: '0.130s',
        ...getFontProperties(),
        ...themeVars.button(themePropsForThemeVarFn, props),
    }
})

const useStyle = createStyle({
    buttonDefaultChildren: <T,>(props: ButtonProps<T>) => ({
        visibility: props.isLoading ? 'hidden' : 'visible',
    }),
    buttonSpinnerContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
    },
})

export const Button = <T,>(props: ButtonProps<T>): JSX.Element => {
    const {
        children,
        RightIcon: RightIconProps,
        LeftIcon: LeftIconProps,
        size,
        isDense,
        isLoading = false,
        disabled = false,
        ...rest
    } = props

    const styleProps = {
        size,
        isDense,
    }

    const classes = useStyle(props)

    return (
        <ButtonRoot disabled={isLoading || disabled} {...styleProps} {...rest}>
            <div className={classes.buttonDefaultChildren}>
                <IconContainer isRight {...styleProps}>
                    {LeftIconProps}
                </IconContainer>
                {children}
                <IconContainer {...styleProps}>{RightIconProps}</IconContainer>
            </div>
            {isLoading && (
                <div className={classes.buttonSpinnerContainer}>
                    <Spinner color="inherit" size={size} />
                </div>
            )}
        </ButtonRoot>
    )
}
