import { CSSObject } from 'styled-components'

import {
    createStyledComponent,
    getThemeCSSObject,
    isThemeColorName,
    themeTernaryOperator as tto,
    Theme,
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
    containerProps?: Omit<CollapsibleProps, 'isOpen'>
}

const InlineAlertRoot = createStyledComponent<typeof Alert, InlineAlertProps>(
    Alert,
    (theme, props) => {
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { palette } = themePropsForThemeVarFn
        const {
            csx = {},
            hasFullWidth = true,
            type = 'neutral',
            isExtendStyleFromThemeVars,
        } = props

        /**
         * Currently background is calculated assuming variant is
         * ghost. Need to add outline and filled variant.
         * TODO: In next release add more variants
         */
        const getBackgroundColor = (): CSSObject => {
            if (type === 'other') return {}

            let color = ''
            if (type === 'neutral') color = palette.neutral[80]
            else {
                color = isThemeColorName(type) ? palette[type].main : type
            }

            return getHoverProperties({
                color,
                isDisabled: false,
                variant: 'ghost',
                theme,
                mainColor: color,
            })
        }

        return {
            bottom: 'unset',
            boxShadow: 'unset',
            left: 'unset',
            maxWidth: 'unset',
            padding: '1rem',
            position: 'relative',
            right: 'unset',
            top: 'unset',
            width: hasFullWidth ? '100%' : 'auto',
            ...getBackgroundColor(),
            ...(isExtendStyleFromThemeVars &&
                themeVars.inlineAlert(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    },
    {
        isExtendStyleFromThemeVars: false,
    }
)

export const InlineAlert = (props: InlineAlertProps): JSX.Element => {
    const {
        hasAnimation = false,
        type = 'neutral',
        csx = {},
        containerProps = {},
        isOpen = false,
        ...rest
    } = props

    const getColor = (theme: Theme): string => {
        const { palette, themeType } = theme
        if (!isThemeColorName(type)) {
            const {
                common: { black, white },
            } = palette
            return tto(themeType, black, white)
        }

        if (type === 'neutral') return palette.neutral[90]

        return palette[type].main
    }

    return (
        <Collapsible isOpen={isOpen} {...containerProps}>
            <InlineAlertRoot
                isOpen
                type={type}
                hasAnimation={hasAnimation}
                csx={{
                    ...csx,
                    title: (theme) => ({
                        color: getColor(theme),
                        ...getThemeCSSObject(csx.title, theme),
                    }),
                    message: (theme) => ({
                        color: getColor(theme),
                        ...getThemeCSSObject(csx.message, theme),
                    }),
                }}
                portalProps={{ hasUseReactPortal: false }}
                {...rest}
            />
        </Collapsible>
    )
}

attachSignatureToComponent(InlineAlert, INLINE_ALERT)
