import { useLayoutEffect, useRef } from 'react'

import {
    createPopper,
    Instance as PopperInstance,
    Placement,
    Modifier,
    PositioningStrategy,
    State as PopperState,
} from '@popperjs/core'

import { Box, BoxProps } from '../box'
import { isValidAnchorElement, useForkRef } from '../utils'
import { Portal } from '../portal'
import { attachSignatureToComponent } from '../utils'
import { POPPER } from '../constants/component-ids'

export interface PopperProp extends BoxProps<'div'> {
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
    anchorElement?: Element
    /**
     * @default true
     */
    isRenderNullIfNoAnchorElement?: boolean
    /**
     * @default false
     */
    isOpen?: boolean
}

export const Popper = (props: PopperProp): JSX.Element => {
    const {
        anchorElement,
        children,
        innerRef,
        placement = 'auto',
        modifiers = [],
        strategy = 'absolute',
        onFirstUpdate = () => ({}),
        isOpen = false,
        isRenderNullIfNoAnchorElement = true,
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
    }, [
        anchorElement,
        placement,
        isOpen,
        isRenderNullIfNoAnchorElement,
        modifiers,
        strategy,
        onFirstUpdate,
    ])

    if ((!anchorElement && isRenderNullIfNoAnchorElement) || !isOpen)
        return <></>

    return (
        <Portal>
            <Box innerRef={popperContainerRef} {...rest}>
                {children}
            </Box>
        </Portal>
    )
}

attachSignatureToComponent(Popper, POPPER)
