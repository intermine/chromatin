import cx from 'clsx'
import { CSSObject } from 'styled-components'

import {
    createStyle,
    createStyledComponent,
    getThemeCSSObject,
    themeTernaryOperator as tto,
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { TOGGLE } from '../constants/component-ids'

import { Checkbox, CheckboxProps } from '../checkbox'

export type ToggleProps = CheckboxProps

export type ToggleIconProps = {
    checked: boolean
}

const useStyles = createStyle((theme) => ({
    svg: (props: ToggleProps) => ({
        transition: '0.23s',
        ...getThemeCSSObject(props.csx && props.csx.root, theme),
    }),
    svgCircle: (props: ToggleProps) => ({
        transition: '0.23s',
        fill: tto(
            theme.themeType,
            theme.palette.common.white,
            theme.palette.common.black
        ),
        transform: props.checked ? 'translateX(16px)' : undefined,
    }),
}))

const ToggleSVG = (props: ToggleIconProps) => {
    const classes = useStyles(props)

    return (
        <svg
            viewBox="0 0 32 16"
            xmlns="http://www.w3.org/2000/svg"
            className={cx(classes.svg)}
        >
            <rect width="32" height="16" rx="8" />
            <circle className={classes.svgCircle} cx="8" cy="8" r="5" />
        </svg>
    )
}

const CheckboxRoot = createStyledComponent(Checkbox, (theme, props) => {
    const { themeVars, ...themePropsForThemeVarFn } = theme

    return {
        ...themeVars.toggle(themePropsForThemeVarFn, props),
    }
})

export const Toggle = (props: ToggleProps): JSX.Element => {
    const {
        checked = false,
        size = 'regular',
        csx = {},
        color = 'primary',
        borderStyle = 'circle',

        ...inputProps
    } = props

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
    return (
        <CheckboxRoot
            type="checkbox"
            borderStyle={borderStyle}
            color={checked ? color : 'neutral'}
            CheckedIcon={<ToggleSVG checked={checked} />}
            UncheckedIcon={<ToggleSVG checked={checked} />}
            csx={{
                root: (theme) => ({
                    ...getDimension(),
                    ...getThemeCSSObject(csx.root, theme),
                }),
            }}
            {...inputProps}
        />
    )
}

attachSignatureToComponent(Toggle, TOGGLE)
