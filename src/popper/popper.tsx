import { useLayoutEffect, useRef } from 'react'

import {
    createPopper,
    Instance as PopperInstance,
    Placement,
    Modifier,
    PositioningStrategy,
    State as PopperState,
} from '@popperjs/core'

import { createStyledComponent, getThemeCSSObject } from '../styles'
import { Box, BoxProps } from '../box'
import { isValidAnchorElement, useForkRef } from '../utils'
import { Portal } from '../portal'
import { attachSignatureToComponent } from '../utils'
import { POPPER } from '../constants/component-ids'

export interface PopperProps extends Omit<BoxProps<'div'>, 'Component'> {
    /**
     * @default 'auto'
     */
    placement?: Placement
    /**
     * @default []
     */
    modifiers?: Partial<Modifier<any, any>>[]
    /**
     * @default 'absolute'
     */
    strategy?: PositioningStrategy
    onFirstUpdate?: ((arg0: Partial<PopperState>) => void) | undefined
    anchorElement?: Element | null
}

const PopperRoot = createStyledComponent<typeof Box, PopperProps>(
    Box,
    (theme, props) => {
        const { csx = {}, isExtendStyleFromThemeVars = true } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme

        return {
            ...(isExtendStyleFromThemeVars &&
                themeVars.popper(themePropsForThemeVarFn, props)),
            ...getThemeCSSObject(csx.root, theme),
        }
    }
)

export const Popper = (props: PopperProps): JSX.Element => {
    const {
        anchorElement,
        children,
        innerRef,
        placement = 'auto',
        modifiers = [],
        strategy = 'absolute',
        onFirstUpdate = () => ({}),
        ...rest
    } = props

    const ref = useRef(null)
    const popperContainerRef = useForkRef(innerRef, ref)

    useLayoutEffect(() => {
        let popper: PopperInstance | null = null
        if (isValidAnchorElement(anchorElement) && ref.current) {
            popper = createPopper(anchorElement, ref.current, {
                placement,
                modifiers,
                strategy,
                onFirstUpdate,
            })
        }

        return () => {
            if (popper) {
                popper.destroy()
            }
        }
    }, [anchorElement, placement, modifiers, strategy, onFirstUpdate])

    return (
        <Portal>
            <PopperRoot innerRef={popperContainerRef} {...rest}>
                {children}
            </PopperRoot>
        </Portal>
    )
}

attachSignatureToComponent(Popper, POPPER)
