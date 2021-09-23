import cx from 'clsx'

import { CSSObject } from 'styled-components'
import { createStyledComponent, createStyle, isThemeColorName } from '../styles'

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
     * Size of a dot. Include the unit as well.
     * @example '1rem'
     */
    dotSize?: string
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
            transform: 'rotate(0deg)',
        },
        '70%': {
            transform: 'rotate(360deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
    dots: (props: SpinnerProps) => {
        const { size = 'regular', color, dotSize } = props
        const {
            typography: {
                meta: { documentFontSize },
            },
            palette,
        } = theme

        const rem = mapSizeToRemValue(size, documentFontSize)

        const getBackground = (): string | undefined => {
            if (!color) return undefined
            if (isThemeColorName(color)) return palette[color].main
            return color
        }

        const getTransformOrigin = (): string => {
            const origin = `${rem / 2}rem`
            return `0px ${origin}`
        }

        const getDimension = (): CSSObject => {
            const dim =
                dotSize !== undefined && dotSize !== ''
                    ? dotSize
                    : `${rem * 0.14}rem`

            return {
                height: dim,
                width: dim,
            }
        }

        return {
            fill: getBackground(),
            left: '50%',
            transformOrigin: getTransformOrigin(),
            transform: `translateX(-${rem / 20})`,
            ...getDimension(),
        }
    },

    animation: {
        '& $dots': {
            position: 'absolute',
            animation: '$rotation 2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
            borderRadius: '50%',
        },

        '& $dots:nth-child(2)': {
            animationDelay: '0.1s',
        },
        '& $dots:nth-child(3)': {
            animationDelay: '0.2s',
        },
        '& $dots:nth-child(4)': {
            animationDelay: '0.3s',
        },
        '& $dots:nth-child(5)': {
            animationDelay: '0.4s',
        },
        '& $dots:nth-child(6)': {
            animationDelay: '0.5s',
        },
        '& $dots:nth-child(7)': {
            animationDelay: '0.6s',
        },
    },
}))

const SpinnerContainer = createStyledComponent<'div', SpinnerProps>(
    'div',
    (theme, props) => {
        const { size = 'regular' } = props
        const { documentFontSize } = theme.typography.meta

        const getDimension = (): CSSObject => {
            const dimension = `${mapSizeToRemValue(size, documentFontSize)}rem`

            return {
                height: dimension,
                width: dimension,
            }
        }
        return {
            display: 'inline-block',
            position: 'relative',
            transform: 'rotate(90deg)',
            ...getDimension(),
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

export const Spinner = (props: SpinnerProps): JSX.Element => {
    const classes = useStyle(props)
    const { className, ...rest } = props

    return (
        <SpinnerContainer
            className={cx(classes.animation, className)}
            {...rest}
        >
            <Dots className={classes.dots} />
            <Dots className={classes.dots} />
            <Dots className={classes.dots} />
            <Dots className={classes.dots} />
            <Dots className={classes.dots} />
            <Dots className={classes.dots} />
            <Dots className={classes.dots} />
        </SpinnerContainer>
    )
}
