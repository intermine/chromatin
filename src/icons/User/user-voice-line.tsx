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
                <path d="M1 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H1zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM21.548.784A13.942 13.942 0 0 1 23 7c0 2.233-.523 4.344-1.452 6.216l-1.645-1.196A11.955 11.955 0 0 0 21 7c0-1.792-.393-3.493-1.097-5.02L21.548.784zm-3.302 2.4A9.97 9.97 0 0 1 19 7a9.97 9.97 0 0 1-.754 3.816l-1.677-1.22A7.99 7.99 0 0 0 17 7a7.99 7.99 0 0 0-.43-2.596l1.676-1.22z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
