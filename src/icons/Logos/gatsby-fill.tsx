import { forwardRef } from 'react'
import cx from 'clsx'

import { createStyle, getThemeCSSObject } from '../../styles'
import type { ChromatinIcon } from '../types'

const useStyles = createStyle((theme) => ({
    root: (props: ChromatinIcon) => ({
        height: props.height ?? '100%',
        width: props.width ?? '100%',
        ...getThemeCSSObject(props?.csx?.root, theme),
    }),
}))

export default forwardRef<any, ChromatinIcon>((props, ref): JSX.Element => {
    const {
        className,
        classes: _classes = {},
        csx = {},
        height,
        width,
        ...rest
    } = props
    const classes = useStyles({
        className,
        classes: _classes,
        csx,
        height,
        width,
        ...rest,
    })

    return (
        <svg
            className={cx(classes.root, _classes.root, className)}
            ref={ref}
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                    fill-rule="nonzero"
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM6.429 17.571c-1.5-1.5-2.286-3.5-2.286-5.428l7.786 7.714c-2-.071-4-.786-5.5-2.286zm7.285 2.072l-9.357-9.357c.786-3.5 3.929-6.143 7.643-6.143 2.643 0 4.929 1.286 6.357 3.214l-1.071.929C16.07 6.643 14.143 5.57 12 5.57c-2.786 0-5.143 1.786-6.071 4.286l8.214 8.214c2.071-.714 3.643-2.5 4.143-4.642h-3.429V12h5c0 3.714-2.643 6.857-6.143 7.643z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
