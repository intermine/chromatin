import cx from 'clsx'
import { CSSObject } from 'styled-components'
import {
    createStyle,
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
    themeTernaryOperator as tto,
} from '../styles'
import { ButtonBase } from '../button-base'
import { attachSignatureToComponent } from '../utils'
import { TOGGLE } from '../constants/component-ids'

import type { Ref } from '../utils'
import { InputBase } from '..'

export interface ToggleProps
    extends Omit<
        React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>,
        'as' | 'ref' | 'color' | 'size' | 'label'
    > {
    /**
     * Toggle state.
     * @default 'off'
     */
    state?: 'on' | 'off'
    /**
     * @default 'neutral'
     */
    color?: string
    /**
     * @default 'regular'
     */
    size?: 'regular' | 'small' | 'large'
    isDense?: boolean
    /**
     * To activate hover style
     */
    isHovered?: boolean
    /**
     * To activate focus style
     */
    isFocused?: boolean
    /**
     * To activate active style
     */
    isActive?: boolean
    /**
     * Ref to toggle svg component
     */
    toggleSVGRef?: Ref
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component.
         * Root component is a button-base
         */
        root?: string
        /**
         * Applied to toggle component
         */
        toggleSVG?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component.
         * Root component is a button-base
         */
        root?: ThemeCSSStyles
        /**
         * Apply to toggle
         */
        toggleSVG?: ThemeCSSStyles
    }
}

export type ToggleSVGProps = {
    state: 'on' | 'off'
    disabled?: boolean
    innerRef?: Ref
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to toggle component
         */
        toggleSVG?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Apply to toggle
         */
        toggleSVG?: ThemeCSSStyles
    }
}

const useStyles = createStyle((theme) => ({
    svg: (props: ToggleProps) => ({
        transition: '0.23s',
        ...getThemeCSSObject(props.csx && props.csx.toggleSVG, theme),
    }),
    svgCircle: (props: ToggleProps) => ({
        transition: '0.23s',
        fill: tto(
            theme.themeType,
            theme.palette.common.white,
            theme.palette.common.black
        ),
        transform: props.state === 'on' ? 'translateX(16px)' : undefined,
    }),
}))

const ContainerRoot = createStyledComponent<typeof ButtonBase, ToggleProps>(
    ButtonBase,
    (theme, props) => {
        const { csx = {}, size = 'regular', isDense = false } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        const getPadding = (): string => {
            if (size === 'regular') {
                if (isDense) return '0.25rem'
                return '0.4rem'
            }

            if (size === 'small') {
                if (isDense) return '0.15rem'
                return '0.35rem'
            }

            if (isDense) return '0.3rem'
            return '0.5rem'
        }

        const getDimension = (): CSSObject => {
            if (size === 'regular') {
                return {
                    height: '1.125rem',
                    width: '2.25rem',
                }
            }
            if (size === 'small') {
                return {
                    height: '0.875',
                    width: '1.75rem',
                }
            }

            return {
                height: '1.5rem',
                width: '3rem',
            }
        }

        return {
            borderRadius: '10rem',
            boxSizing: 'content-box',
            padding: getPadding(),
            ...getDimension(),
            ...themeVars.toggle(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

const ToggleSVG = (props: ToggleSVGProps) => {
    const classes = useStyles(props)
    const { innerRef, classes: classesProps = {} } = props

    return (
        <svg
            ref={innerRef}
            viewBox="0 0 32 16"
            xmlns="http://www.w3.org/2000/svg"
            className={cx(classes.svg, classesProps.toggleSVG)}
        >
            <rect width="32" height="16" rx="8" />
            <circle className={classes.svgCircle} cx="8" cy="8" r="5" />
        </svg>
    )
}

export const Toggle = (props: ToggleProps): JSX.Element => {
    const {
        className,
        classes = {},
        color = 'primary',
        size,
        state = 'off',
        csx = {},
        toggleSVGRef,
        disabled,
        isDense,
        isHovered,
        isActive,
        isFocused,
        ...inputProps
    } = props

    return (
        <ContainerRoot
            hasElevation={false}
            color={state === 'off' ? 'neutral' : color}
            variant="ghost"
            className={cx(className, classes.root)}
            csx={{ root: csx.root }}
            disabled={disabled}
            size={size}
            Component="label"
            isDense={isDense}
            isHovered={isHovered}
            isActive={isActive}
            isFocused={isFocused}
        >
            <InputBase
                isHidden
                type="checkbox"
                checked={state === 'off' ? false : true}
                disabled={disabled}
                {...inputProps}
            />
            <ToggleSVG
                innerRef={toggleSVGRef}
                disabled={disabled}
                state={state}
                classes={{ toggleSVG: classes.toggleSVG }}
            />
        </ContainerRoot>
    )
}

attachSignatureToComponent(Toggle, TOGGLE)
