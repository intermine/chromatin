import { forwardRef } from 'react'
import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    isThemeColorName,
    ThemeCSSStyles
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { LABEL } from '../constants/component-ids'

export interface LabelProps
    extends Omit<React.HTMLProps<HTMLLabelElement>, 'as' | 'ref' | 'label'> {
    color?: string
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
    }
}

const LabelRoot = createStyledComponent<'label', LabelProps>(
    'label',
    (theme, props) => {
        const { csx = {}, color, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            palette,
            typography: { body }
        } = themePropsForThemeVarFn

        const getColor = (): string | undefined => {
            if (!color) return palette.neutral[90]
            if (isThemeColorName(color)) return palette[color].main
            return color
        }

        return {
            color: getColor(),
            fill: color,
            ...body,
            ...(isExtendStyleFromThemeVars &&
                themeVars.label(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme)
        }
    }
)

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    (props, ref): JSX.Element => {
        const { className, classes = {}, children, ...rest } = props
        return (
            <LabelRoot
                ref={ref}
                className={cx(className, classes.root)}
                {...rest}
            >
                {children}
            </LabelRoot>
        )
    }
)

attachSignatureToComponent(Label, LABEL)
