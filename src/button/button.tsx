import { forwardRef } from 'react'

import { CSSObject } from 'styled-components'
import cx from 'clsx'

import {
    ButtonBase,
    ButtonBaseProps,
    ButtonBaseCommonProps
} from '../button-base/button-base'
import {
    createStyledComponent,
    createStyle,
    ThemeCSSStyles,
    getThemeCSSObject
} from '../styles'

import { Spinner } from '../loading'
import { attachSignatureToComponent } from '../utils'
import { BUTTON } from '../constants/component-ids'

import type { ReactElement } from '../styles'

export interface ButtonCommonProps extends ButtonBaseCommonProps {
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
    /**
     * @default true
     */
    isTextUppercase?: boolean
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to right icon container
         */
        iconContainerRight?: string
        /**
         * Applied to left icon container
         */
        iconContainerLeft?: string
        /**
         * Applied to both icon container
         */
        iconContainer?: string
        /**
         * Applied to button's spinner container
         */
        buttonSpinnerContainer?: string
        /**
         * Applied to spinner
         */
        buttonSpinner?: string
    }

    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
        /**
         * Applied to right icon container
         */
        iconContainerRight?: ThemeCSSStyles
        /**
         * Applied to left icon container
         */
        iconContainerLeft?: ThemeCSSStyles
        /**
         * Applied to both icon container
         */
        iconContainer?: ThemeCSSStyles
        /**
         * Applied to button's spinner container
         */
        buttonSpinnerContainer?: ThemeCSSStyles
        /**
         * Applied to spinner
         */
        buttonSpinner?: ThemeCSSStyles
    }
}

export type ButtonProps<T> = ButtonCommonProps & ButtonBaseProps<T>

type IconContainerProps = {
    isRight?: boolean
    /**
     * same as button sizes
     */
    size?: 'small' | 'regular' | 'large'
    children: ReactElement
    isLoading?: boolean
    csx?: {
        /**
         * Applied to right icon container
         */
        iconContainerRight?: ThemeCSSStyles
        /**
         * Applied to left icon container
         */
        iconContainerLeft?: ThemeCSSStyles
        /**
         * Applied to both icon container
         */
        iconContainer?: ThemeCSSStyles
    }
}

const IconContainer = createStyledComponent<'span', IconContainerProps>(
    'span',
    (theme, props) => {
        const {
            isRight,
            size = 'regular',
            children,
            csx = {},
            isLoading
        } = props

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
                display: 'none'
            }
        }

        return {
            boxSizing: 'border-box',
            display: 'inline-flex',
            /**
             * This is only used to set fill transparent if isLoading
             * is true. It is not here to handle actual fill property,
             * button-base is responsible for this.
             * */
            fill: isLoading ? 'transparent' : undefined,
            marginLeft: isRight ? '0.5rem' : undefined,
            marginRight: isRight ? undefined : '0.5rem',
            transition: '0.130s',
            ...getDimProperties(),
            ...getThemeCSSObject(csx.iconContainer, theme),
            ...(isRight && getThemeCSSObject(csx.iconContainerRight, theme)),
            ...(!isRight && getThemeCSSObject(csx.iconContainerLeft, theme))
        }
    }
)

const ButtonRoot = createStyledComponent<
    typeof ButtonBase,
    ButtonProps<'button'>
>(ButtonBase, (theme, props) => {
    const {
        size = 'regular',
        hasFullWidth = false,
        isDense = false,
        csx = {},
        isLoading,
        isTextUppercase = true,
        isExtendStyleFromThemeVars = true
    } = props
    const { themeVars, ...themePropsForThemeVarFn } = theme
    const { body, bodySm, bodyLg } = themePropsForThemeVarFn.typography

    const getPadding = (): string => {
        if (size === 'regular') {
            if (isDense) return '0.6rem 0.875rem'
            return '1rem 2rem'
        }

        if (size === 'small') {
            if (isDense) return '0.4rem 0.875rem'
            return '0.6rem 1.3rem'
        }

        if (isDense) return '0.6rem 0.875rem'
        return '1rem 2rem'
    }

    const getFontProperties = (): CSSObject => {
        if (size === 'regular') return { ...body, fontSize: '0.875rem' }
        if (size === 'small') return bodySm
        return bodyLg
    }

    /**
     * This is only used to set color transparent if isLoading
     * is true. It is not here to handle actual color,
     * button-base is responsible for handle color.
     */
    const getColor = (): CSSObject => {
        if (!isLoading) return {}

        return {
            color: 'transparent'
        }
    }

    return {
        borderRadius: '0.25rem',
        padding: getPadding(),
        width: (hasFullWidth && '100%') || undefined,
        transition: '0.130s',
        ...getColor(),
        ...getFontProperties(),
        lineHeight: 1,
        fontWeight: 700,
        textAlign: 'center',
        textTransform: isTextUppercase ? 'uppercase' : undefined,
        ...(isExtendStyleFromThemeVars &&
            themeVars.button(themePropsForThemeVarFn, props)),
        ...getThemeCSSObject(csx.root, theme)
    }
})

const useStyle = createStyle({
    buttonSpinnerContainer: <T,>(props: ButtonProps<T>) => ({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        visibility: props.isLoading ? 'visible' : 'hidden',
        ...getThemeCSSObject(props.csx?.buttonSpinnerContainer)
    })
})

export const Button = forwardRef(
    <T,>(props: ButtonProps<T>, ref: any): JSX.Element => {
        const {
            children,
            RightIcon: RightIconProps,
            LeftIcon: LeftIconProps,
            size,
            isDense,
            isLoading = false,
            isDisabled = false,
            className,
            csx,
            classes: classesProps = {},
            ...rest
        } = props

        const styleProps = {
            size,
            isDense,
            csx,
            isLoading
        }

        const classes = useStyle(props)
        const { buttonSpinnerContainer } = classes
        const {
            root: rootProps,
            buttonSpinner: buttonSpinnerProps,
            buttonSpinnerContainer: buttonSpinnerContainerProps,
            iconContainer: iconContainerProps,
            iconContainerLeft: iconContainerLeftProps,
            iconContainerRight: iconContainerRightProps,
            ...classesForBase
        } = classesProps

        return (
            <ButtonRoot
                className={cx(className, rootProps)}
                isDisabled={isLoading || isDisabled}
                classes={classesForBase}
                ref={ref}
                {...styleProps}
                {...rest}
            >
                <IconContainer
                    className={cx(iconContainerProps, iconContainerLeftProps)}
                    isRight={false}
                    {...styleProps}
                >
                    {LeftIconProps}
                </IconContainer>
                {children}
                <IconContainer
                    isRight={true}
                    className={cx(iconContainerProps, iconContainerRightProps)}
                    {...styleProps}
                >
                    {RightIconProps}
                </IconContainer>
                <div
                    className={cx(
                        buttonSpinnerContainer,
                        buttonSpinnerContainerProps
                    )}
                >
                    <Spinner
                        className={cx(buttonSpinnerProps)}
                        csx={{ root: csx?.buttonSpinner }}
                        color="inherit"
                        size={size}
                    />
                </div>
            </ButtonRoot>
        )
    }
) as <T>(props: ButtonProps<T> & { ref?: any }) => JSX.Element

attachSignatureToComponent(Button, BUTTON)
