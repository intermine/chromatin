import { forwardRef } from 'react'
import { CSSObject } from 'styled-components'

import {
    createStyledComponent,
    getThemeCSSObject,
    themeTernaryOperator as tto,
    Theme,
    getColorForComponent
} from '../styles'

import { Alert, AlertProps } from '../alert'
import { Collapsible, CollapsibleProps } from '../collapsible'

import { attachSignatureToComponent } from '../utils'
import { INLINE_ALERT } from '../constants/component-ids'
import { getHoverProperties } from '../button-base/utils'

export interface InlineAlertProps extends Omit<AlertProps, 'portalProps'> {
    /**
     * To occupy full space
     */
    hasFullWidth?: boolean
    isDense?: boolean
    containerProps?: Omit<CollapsibleProps, 'isOpen'>
}

const InlineAlertRoot = createStyledComponent<typeof Alert, InlineAlertProps>(
    Alert,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            csx = {},
            hasFullWidth = true,
            isDense = false,
            type,
            isExtendStyleFromThemeVars
        } = props

        /**
         * Currently background is calculated assuming variant is
         * ghost. Need to add outline and filled variant.
         * TODO: In next release add more variants
         */
        const getBackgroundColor = (): CSSObject => {
            if (type === 'other') return {}

            return getHoverProperties({
                color: type,
                isDisabled: false,
                variant: 'ghost',
                theme
            })
        }

        return {
            bottom: 'unset',
            boxShadow: 'unset',
            left: 'unset',
            maxWidth: 'unset',
            padding: isDense ? '0.5rem' : '1rem',
            position: 'relative',
            right: 'unset',
            top: 'unset',
            width: hasFullWidth ? '100%' : 'auto',
            ...getBackgroundColor(),
            ...(isExtendStyleFromThemeVars &&
                themeVars.inlineAlert(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    },
    {
        isExtendStyleFromThemeVars: false
    }
)

export const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
    (props, ref): JSX.Element => {
        const {
            hasAnimation = false,
            type,
            csx = {},
            containerProps = {},
            isOpen = false,
            ...rest
        } = props

        const getColor = (theme: Theme): string => {
            const _color = getColorForComponent({
                theme,
                color: type,
                isReturnDefaultColor: false
            })

            if (_color) return _color

            const {
                palette: {
                    themeType,
                    common: { white, black }
                }
            } = theme

            return tto(themeType, black, white)
        }

        return (
            <Collapsible in={isOpen} {...containerProps}>
                <InlineAlertRoot
                    isOpen
                    type={type}
                    hasAnimation={hasAnimation}
                    csx={{
                        ...csx,
                        title: (theme) => ({
                            color: getColor(theme),
                            ...getThemeCSSObject(csx.title, theme)
                        }),
                        message: (theme) => ({
                            color: getColor(theme),
                            ...getThemeCSSObject(csx.message, theme)
                        })
                    }}
                    portalProps={{ hasUseReactPortal: false }}
                    ref={ref}
                    {...rest}
                />
            </Collapsible>
        )
    }
)

attachSignatureToComponent(InlineAlert, INLINE_ALERT)
