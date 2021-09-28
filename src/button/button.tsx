import { CSSObject } from 'styled-components'
import cx from 'clsx'

import { ButtonBase, ButtonBaseProps } from '../button-base/button-base'
import {
    createStyledComponent,
    createStyle,
    ThemeCSSStyles,
    getThemeCSSObject,
} from '../styles'

import type { ReactElement } from '../styles'

import { Spinner } from '../loading'
import { attachSignatureToComponent } from '../utils'
import { BUTTON } from '../constants/component-ids'

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
        /**
         * Applied to button children container. It is not applied to
         * the component containing spinner
         */
        buttonChildrenContainer?: string
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
        /**
         * Applied to button children container. It is not applied to
         * the component containing spinner
         */
        buttonChildrenContainer?: ThemeCSSStyles
    }
}

type IconContainerProps = {
    isRight?: boolean
    /**
     * same as button sizes
     */
    size?: 'small' | 'regular' | 'large'
    children: ReactElement
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
        const { isRight, size = 'regular', children, csx = {} } = props

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
            ...getThemeCSSObject(csx.iconContainer, theme),
            ...(isRight && getThemeCSSObject(csx.iconContainerRight, theme)),
            ...(!isRight && getThemeCSSObject(csx.iconContainerLeft, theme)),
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
    } = props
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
        ...getThemeCSSObject(csx.root, theme),
    }
})

const useStyle = createStyle({
    buttonChildrenContainer: <T,>(props: ButtonProps<T>) => ({
        visibility: props.isLoading ? 'hidden' : 'visible',
        ...getThemeCSSObject(props.csx?.buttonSpinnerContainer),
    }),
    buttonSpinnerContainer: <T,>(props: ButtonProps<T>) => ({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        ...getThemeCSSObject(props.csx?.buttonSpinnerContainer),
    }),
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
        className,
        csx,
        classes: classesProps = {},
        ...rest
    } = props

    const styleProps = {
        size,
        isDense,
        csx,
    }

    const classes = useStyle(props)
    const { buttonChildrenContainer, buttonSpinnerContainer } = classes
    const {
        buttonChildrenContainer: buttonChildrenContainerProps,
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
            disabled={isLoading || disabled}
            classes={classesForBase}
            {...styleProps}
            {...rest}
        >
            <div
                className={cx(
                    buttonChildrenContainer,
                    buttonChildrenContainerProps
                )}
            >
                <IconContainer
                    className={cx(iconContainerProps, iconContainerLeftProps)}
                    isRight
                    {...styleProps}
                >
                    {LeftIconProps}
                </IconContainer>
                {children}
                <IconContainer
                    className={cx(iconContainerProps, iconContainerRightProps)}
                    {...styleProps}
                >
                    {RightIconProps}
                </IconContainer>
            </div>
            {isLoading && (
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
            )}
        </ButtonRoot>
    )
}

attachSignatureToComponent(Button, BUTTON)
