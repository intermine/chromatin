import cx from 'clsx'

import { forwardRef } from 'react'
import {
    ButtonBase,
    ButtonBaseProps,
    ButtonBaseCommonProps
} from '../button-base/button-base'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles
} from '../styles'

import { Spinner } from '../loading'

import { attachSignatureToComponent } from '../utils'
import { ICON_BUTTON } from '../constants/component-ids'

import type { ReactElement } from '../styles'

export interface IconButtonCommonProps extends ButtonBaseCommonProps {
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
         * Applied to spinner
         */
        spinner?: string
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
         * Applied to spinner
         */
        spinner?: ThemeCSSStyles
    }
}
export type IconButtonProps<T> = IconButtonCommonProps & ButtonBaseProps<T>

const IconButtonRoot = createStyledComponent<
    typeof ButtonBase,
    IconButtonProps<'button'>
>(
    ButtonBase,
    (theme, props) => {
        const {
            size = 'regular',
            borderStyle = 'squircle',
            isDense = false,
            csx = {},
            isExtendStyleFromThemeVars = true
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
                if (isDense) return '0.3125rem'
                return '0.625rem'
            }

            if (size === 'small') {
                if (isDense) return '0.25rem'
                return '0.4375rem'
            }

            if (isDense) return '0.3125rem'
            return '0.625rem'
        }

        const getDimensions = (): string => {
            if (size === 'regular') {
                return '1.125rem'
            }
            if (size === 'small') {
                return '0.875rem'
            }

            return '1.5rem'
        }

        const dim = getDimensions()
        return {
            borderRadius: getBorderRadius(),
            boxSizing: 'content-box',
            height: dim,
            padding: getPadding(),
            transition: '0.130s',
            width: dim,
            ...(isExtendStyleFromThemeVars &&
                themeVars.iconButton(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    { isExtendStyleFromThemeVars: false }
)

export const IconButton = forwardRef(
    <T,>(props: IconButtonProps<T>, ref: unknown): JSX.Element => {
        const {
            Icon,
            variant = 'ghost',
            className,
            isLoading = false,
            classes = {},
            csx = {},
            isDisabled = false,
            size = 'regular',
            children,
            ...rest
        } = props
        const { root, spinner, ...classesForBase } = classes
        return (
            <IconButtonRoot
                className={cx(className, root)}
                variant={variant}
                classes={classesForBase}
                size={size}
                csx={csx}
                isDisabled={isLoading || isDisabled}
                ref={ref}
                {...rest}
            >
                {!isLoading && Icon}
                {isLoading && (
                    <Spinner
                        className={cx(spinner)}
                        csx={{ root: csx.spinner }}
                        size={size}
                        color="inherit"
                    />
                )}
                {children}
            </IconButtonRoot>
        )
    }
) as <T>(props: IconButtonProps<T> & { ref?: any }) => JSX.Element

attachSignatureToComponent(IconButton, ICON_BUTTON)
