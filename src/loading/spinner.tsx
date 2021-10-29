import { forwardRef } from 'react'
import cx from 'clsx'

import { CSSObject } from 'styled-components'
import {
    createStyledComponent,
    createStyle,
    ThemeCSSStyles,
    getThemeCSSObject
} from '../styles'
import { attachSignatureToComponent, getColorForComponent } from '../utils'
import { SPINNER } from '../constants/component-ids'

export interface SpinnerProps
    extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'size'> {
    /**
     * Size of the container. Based on the container size
     * the size of the dots are calculated.
     * If a number is given then it should be equivalent to px.
     */
    size?: 'small' | 'regular' | 'large' | number
    /**
     * color of dots.
     */
    color?: string
    /**
     * Size of a dot. Value is equivalent to px.
     */
    dotSize?: number
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to dots
         */
        dots?: string
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
         * Applied to dots
         */
        dots?: ThemeCSSStyles
    }
}

const mapSizeToRemValue = (
    size: SpinnerProps['size'],
    baseFontSize: number
): number => {
    if (!size) return 0
    if (size === 'regular') return 1
    if (size === 'small') return 0.8
    if (size === 'large') return 1.25

    return size / baseFontSize
}

const useStyle = createStyle((theme) => ({
    '@keyframes rotation': {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '70%': {
            transform: 'rotate(360deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    },
    dots: (props: SpinnerProps) => {
        const { size = 'regular', color, dotSize, csx = {} } = props
        const {
            typography: {
                meta: { documentFontSize }
            }
        } = theme

        const rem = mapSizeToRemValue(size, documentFontSize)

        const getTransformOrigin = (): string => {
            const origin = `${rem / 2}rem`
            return `0px ${origin}`
        }

        const getDimension = (): CSSObject => {
            const dim =
                dotSize !== undefined
                    ? `${dotSize / documentFontSize}rem`
                    : `${rem * 0.14}rem`

            return {
                height: dim,
                width: dim
            }
        }

        return {
            fill: getColorForComponent({ theme, color }),
            left: '50%',
            transformOrigin: getTransformOrigin(),
            transform: `translateX(-${rem / 20})`,
            ...getDimension(),
            ...getThemeCSSObject(csx.dots, theme)
        }
    },

    animation: {
        '& $dots': {
            position: 'absolute',
            animation: '$rotation 2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
            borderRadius: '50%'
        },

        '& $dots:nth-child(2)': {
            animationDelay: '0.1s'
        },
        '& $dots:nth-child(3)': {
            animationDelay: '0.2s'
        },
        '& $dots:nth-child(4)': {
            animationDelay: '0.3s'
        },
        '& $dots:nth-child(5)': {
            animationDelay: '0.4s'
        },
        '& $dots:nth-child(6)': {
            animationDelay: '0.5s'
        },
        '& $dots:nth-child(7)': {
            animationDelay: '0.6s'
        }
    }
}))

const SpinnerContainer = createStyledComponent<'div', SpinnerProps>(
    'div',
    (theme, props) => {
        const { size = 'regular', csx = {}, isExtendStyleFromThemeVars } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { documentFontSize } = themePropsForThemeVarFn.typography.meta

        const getDimension = (): CSSObject => {
            const dimension = `${mapSizeToRemValue(size, documentFontSize)}rem`

            return {
                height: dimension,
                width: dimension
            }
        }
        return {
            display: 'inline-block',
            position: 'relative',
            transform: 'rotate(90deg)',
            ...getDimension(),
            ...(isExtendStyleFromThemeVars &&
                themeVars.spinner(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

const Dots = ({ className = '' }): JSX.Element => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="12" r="12" />
    </svg>
)

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
    (props, ref): JSX.Element => {
        const classes = useStyle(props)
        const { className, classes: classesProps = {}, ...rest } = props
        const dotsClassName = cx(classes.dots, classesProps.dots)

        return (
            <SpinnerContainer
                ref={ref}
                className={cx(classes.animation, className, classesProps.root)}
                {...rest}
            >
                <Dots className={dotsClassName} />
                <Dots className={dotsClassName} />
                <Dots className={dotsClassName} />
                <Dots className={dotsClassName} />
                <Dots className={dotsClassName} />
                <Dots className={dotsClassName} />
                <Dots className={dotsClassName} />
            </SpinnerContainer>
        )
    }
)

attachSignatureToComponent(Spinner, SPINNER)
