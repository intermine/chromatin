import cx from 'clsx'

import {
    createStyledComponent,
    getThemeCSSObject,
    ThemeCSSStyles,
} from '../styles'

export interface LabelProps
    extends Omit<React.HTMLProps<HTMLLabelElement>, 'as' | 'ref'> {
    innerRef?: React.RefObject<any>
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
        const { csx = {} } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            ...themeVars.label(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const Label = (props: LabelProps): JSX.Element => {
    const { className, classes = {}, children, innerRef, ...rest } = props
    return (
        <LabelRoot
            ref={innerRef}
            className={cx(className, classes.root)}
            {...rest}
        >
            {children}
        </LabelRoot>
    )
}
