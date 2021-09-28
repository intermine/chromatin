import cx from 'clsx'

import { IconButton } from '../icon-button'
import { InputBase } from '../input-base'
import { Label } from '../label'

import DefaultCheckedIcon from '../icons/System/checkbox-fill'
import DefaultUncheckedIcon from '../icons/System/checkbox-blank-line'
// eslint-disable-next-line max-len
import DefaultIndeterminateIcon from '../icons/System/checkbox-indeterminate-fill'

import {
    createStyledComponent,
    getThemeCSSObject,
    ReactElement,
    ThemeCSSStyles,
} from '../styles'
import { CHECKBOX } from '../constants/component-ids'

import { attachSignatureToComponent } from '../utils'
import { CSSObject } from 'styled-components'

export interface CheckboxProps
    extends Omit<
        React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>,
        'as' | 'ref' | 'color' | 'size' | 'label'
    > {
    /**
     * Checkbox checked state.
     *
     * @default false
     */
    checked?: boolean
    /**
     * Whether checkbox is in indeterminate state
     * or not. If true then it will override checked
     * state and render indeterminate state. Also,
     * indeterminate means checkbox is not checked.
     */
    isIndeterminate?: boolean
    label?: ReactElement
    /**
     * @default 'right'
     */
    labelPlacement?: 'top' | 'bottom' | 'left' | 'right'
    /**
     * Color applied to icon. This will not set the color
     * of the label.
     * @default 'primary'
     */
    color?: string
    type?: 'checkbox' | 'radio'
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to icon button
         */
        iconButton?: string
    }
    CheckedIcon?: ReactElement
    UncheckedIcon?: ReactElement
    IndeterminateIcon?: ReactElement
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
        /**
         * Applied to icon button
         */
        iconButton?: ThemeCSSStyles
    }
}

const Container = createStyledComponent<typeof Label, CheckboxProps>(
    Label,
    (theme, props) => {
        const { csx = {}, labelPlacement = 'right' } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        const getFlexDirection = (): CSSObject['flexDirection'] => {
            if (labelPlacement === 'right') return 'row'
            if (labelPlacement === 'left') return 'row-reverse'
            if (labelPlacement === 'top') return 'column-reverse'
            if (labelPlacement === 'bottom') return 'column'

            return 'row'
        }

        return {
            alignItems: 'center',
            display: 'flex',
            flexDirection: getFlexDirection(),
            ...themeVars.checkbox(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const Checkbox = (props: CheckboxProps): JSX.Element => {
    const {
        classes = {},
        className,
        csx = {},
        checked = false,
        isIndeterminate = false,
        CheckedIcon = <DefaultCheckedIcon />,
        UncheckedIcon = <DefaultUncheckedIcon />,
        IndeterminateIcon = <DefaultIndeterminateIcon />,
        onChange,
        children: _,
        label,
        labelPlacement = 'right',
        type = 'checkbox',
        color = 'primary',
        ...rest
    } = props

    const getIconToRender = (): ReactElement => {
        if (isIndeterminate) return IndeterminateIcon
        if (checked) return CheckedIcon
        return UncheckedIcon
    }

    return (
        <Container
            labelPlacement={labelPlacement}
            csx={csx}
            className={cx(className, classes.root)}
        >
            <InputBase
                onChange={onChange}
                type={type}
                checked={isIndeterminate ? false : checked}
                isHidden={true}
                {...rest}
            />
            <IconButton
                size="regular"
                className={cx(classes.root)}
                csx={{
                    root: (theme) => ({
                        marginRight:
                            labelPlacement === 'right'
                                ? theme.spacing(1)
                                : undefined,
                        marginLeft:
                            labelPlacement === 'left'
                                ? theme.spacing(1)
                                : undefined,
                        marginTop:
                            labelPlacement === 'top'
                                ? theme.spacing(1)
                                : undefined,
                        marginBottom:
                            labelPlacement === 'bottom'
                                ? theme.spacing(1)
                                : undefined,

                        ...getThemeCSSObject(csx.iconButton, theme),
                    }),
                }}
                Component="span"
                color={color}
                Icon={getIconToRender()}
            />
            {label}
        </Container>
    )
}

attachSignatureToComponent(Checkbox, CHECKBOX)
