import { useEffect, useState } from 'react'

import { getElementUsingEvent } from '../get'

type ReturnType = boolean | undefined

export type UseOutsideClickOptions = {
    /**
     * Target element
     */
    anchorElement?: Node | HTMLElement | null
    /**
     * Listen to keyboard event
     * @default false
     */
    triggerOnKeyboardEvent?: boolean
    /**
     * Listen to click event
     * @default true
     */
    triggerOnClickEvent?: boolean
    /**
     * Not listening to any event.
     *
     * @default false
     */
    isDisabled?: boolean
    /**
     * If you want to use custom click event listener.
     * It will override default event listener.
     *
     * Note: Make sure triggerOnClickEvent is true.
     * Also, it has to return a boolean value which state
     * that the event takes place outside or inside,
     * true means event takes place outside, undefined means
     * nothing happened yet.
     */
    clickEventListener?: (event: MouseEvent) => boolean | undefined
    /**
     * If you want to use custom keyboard event listener.
     * It will override default event listener.
     *
     * Note: Make sure triggerOnKeyboardEvent is true.
     * Also, it has to return a boolean value which state
     * that the event takes place outside or inside,
     * true means event takes place outside, undefined means
     * nothing happened yet.
     */
    keyboardEventListener?: (event: KeyboardEvent) => boolean | undefined
    /**
     * Triggered when clicked outside
     */
    onClickedOutside?: (event: Event) => void
    /**
     * Triggered when clicked inside
     */
    onClickedInside?: (event: Event) => void
}

/**
 * Hook to check whether the click/keyup happen on
 * the target element or outside target element.
 */
export const useOutsideClick = (
    options: UseOutsideClickOptions
): ReturnType => {
    const {
        anchorElement,
        triggerOnClickEvent = true,
        triggerOnKeyboardEvent = false,
        isDisabled = false,
        clickEventListener: _clickEventListener,
        keyboardEventListener: _keyboardEventListener,
        onClickedInside,
        onClickedOutside,
    } = options

    const [isClickedOutside, setIsClickedOutside] = useState<
        boolean | undefined
    >()

    const isEventOccurredOutside = (
        event: MouseEvent | KeyboardEvent
    ): ReturnType => {
        if (!anchorElement) return

        const clickedElement = getElementUsingEvent(event)

        return !anchorElement.contains(clickedElement as HTMLElement)
    }

    const clickEventListener = (event: MouseEvent) => {
        if (typeof _clickEventListener === 'function') {
            setIsClickedOutside(_clickEventListener(event))
            return
        }

        if (!anchorElement) {
            setIsClickedOutside(false)
            return
        }

        const _isClickedOutside = isEventOccurredOutside(event)
        if (_isClickedOutside && typeof onClickedOutside === 'function')
            onClickedOutside(event)
        else if (!isClickedOutside && typeof onClickedInside === 'function')
            onClickedInside(event)

        setIsClickedOutside(_isClickedOutside)
    }

    const keyboardEventListener = (event: KeyboardEvent) => {
        if (typeof _keyboardEventListener === 'function') {
            setIsClickedOutside(_keyboardEventListener(event))
            return
        }

        if (!anchorElement) {
            setIsClickedOutside(false)
            return
        }

        const _isClickedOutside = isEventOccurredOutside(event)
        if (_isClickedOutside && typeof onClickedOutside === 'function')
            onClickedOutside(event)
        else if (!isClickedOutside && typeof onClickedInside === 'function')
            onClickedInside(event)

        setIsClickedOutside(_isClickedOutside)
    }

    useEffect(() => {
        if (!isDisabled) {
            if (triggerOnClickEvent) {
                document.addEventListener('click', clickEventListener)
            }
            if (triggerOnKeyboardEvent) {
                document.addEventListener('keyup', keyboardEventListener)
            }
        }

        return () => {
            if (!isDisabled) {
                if (triggerOnClickEvent) {
                    document.removeEventListener('click', clickEventListener)
                }
                if (triggerOnKeyboardEvent) {
                    document.removeEventListener('keyup', keyboardEventListener)
                }
            }
        }
    }, [anchorElement, isDisabled, triggerOnClickEvent, triggerOnKeyboardEvent])

    return isClickedOutside
}
