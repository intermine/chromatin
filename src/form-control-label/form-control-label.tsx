import { useState, cloneElement } from 'react'
import cx from 'clsx'

import { Label, LabelProps } from '../label'
import { Box } from '../box'

import {
    createStyledComponent,
    getThemeCSSObject,
    ReactElement,
} from '../styles'
import {
    CHECKBOX,
    FORM_CONTROL_LABEL,
    RADIO,
    TOGGLE,
} from '../constants/component-ids'

import {
    attachSignatureToComponent,
    getChromatinElementId,
    isChromatinElement,
} from '../utils'
import { CSSObject } from 'styled-components'

export interface FormControlLabelProps extends LabelProps {
    /**
     * @default 'right'
     */
    labelPlacement?: 'top' | 'bottom' | 'left' | 'right'
    /**
     * The control element
     */
    control?: JSX.Element
    /**
     * The label element
     */
    label?: ReactElement
    /**
     * Spacing between label and control.
     * This will use theme.spacing to calculate spacing.
     * No negative spacing is supported.
     * If childrenSpacing = 'all' then control is
     * at one end and label is at other
     */
    childrenSpacing?: number | 'all'
    /**
     * Spacing from surrounding
     * This will use theme.spacing to calculate spacing.
     * @default {1}
     */
    spacing?: number
}

const Container = createStyledComponent<typeof Label, FormControlLabelProps>(
    Label,
    (theme, props) => {
        const {
            csx = {},
            labelPlacement = 'right',
            spacing: spacingProps = 1,
        } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const { spacing } = themePropsForThemeVarFn
        const getFlexDirection = (): CSSObject['flexDirection'] => {
            if (labelPlacement === 'right') return 'row'
            if (labelPlacement === 'left') return 'row-reverse'
            if (labelPlacement === 'top') return 'column-reverse'
            if (labelPlacement === 'bottom') return 'column'

            return 'row'
        }

        const getMargin = (): string => {
            return `0 ${spacing(spacingProps)} ${spacing(spacingProps)} 0`
        }

        return {
            alignItems: 'center',
            display: 'flex',
            flexDirection: getFlexDirection(),
            margin: getMargin(),
            ...themeVars.formControlLabel(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const FormControlLabel = (props: FormControlLabelProps): JSX.Element => {
    const {
        classes = {},
        className,
        children: _,
        control,
        label,
        labelPlacement = 'right',
        onMouseOver,
        onMouseLeave,
        childrenSpacing = 1,
        ...rest
    } = props

    const [isHovered, setIsHovered] = useState(false)

    // TODO: Fix event
    const handleMouseOver = (event: React.MouseEvent<any>) => {
        setIsHovered(true)
        if (onMouseOver) {
            onMouseOver(event)
        }
    }

    // TODO: Fix event
    const handleMouseLeave = (event: React.MouseEvent<any>) => {
        setIsHovered(false)
        if (onMouseLeave) {
            onMouseLeave(event)
        }
    }

    const getControlElement = (): JSX.Element => {
        if (!control) return <></>
        if (!isChromatinElement(control)) return control

        const id = getChromatinElementId(control)

        if (id === CHECKBOX || id === RADIO || id === TOGGLE) {
            return cloneElement(control, { ...control.props, isHovered })
        }

        return control
    }

    return (
        <Container
            labelPlacement={labelPlacement}
            className={cx(className, classes.root)}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            {...rest}
        >
            {getControlElement()}
            <Box
                csx={{
                    root: ({ spacing }) => ({
                        flex: childrenSpacing === 'all' ? 1 : undefined,
                        ...(childrenSpacing !== 'all' && {
                            width:
                                labelPlacement === 'right' ||
                                labelPlacement === 'left'
                                    ? spacing(childrenSpacing)
                                    : 0,
                            height:
                                labelPlacement === 'top' ||
                                labelPlacement === 'bottom'
                                    ? spacing(childrenSpacing)
                                    : 0,
                        }),
                    }),
                }}
            />
            {label}
        </Container>
    )
}

attachSignatureToComponent(FormControlLabel, FORM_CONTROL_LABEL)