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
                <path d="M17.654 1.7l-2.782 2.533a9.137 9.137 0 0 1 3.49 1.973c3.512 3.2 3.512 8.388 0 11.588-2.592 2.36-6.598 3.862-12.016 4.506l2.782-2.533a9.137 9.137 0 0 1-3.49-1.973c-3.512-3.2-3.533-8.369 0-11.588C8.23 3.846 12.237 2.344 17.655 1.7zM12 6c-3.866 0-7 2.686-7 6s3.134 6 7 6 7-2.686 7-6-3.134-6-7-6zm0 2.3c2.21 0 4 1.657 4 3.7s-1.79 3.7-4 3.7-4-1.657-4-3.7 1.79-3.7 4-3.7zm0 2c-1.138 0-2 .797-2 1.7 0 .903.862 1.7 2 1.7s2-.797 2-1.7c0-.903-.862-1.7-2-1.7z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
