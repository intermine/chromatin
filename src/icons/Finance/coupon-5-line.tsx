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
                <path d="M21 14v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a2 2 0 1 0 0-4V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 1 0 0 4zm-2 1.465A3.998 3.998 0 0 1 17 12c0-1.48.804-2.773 2-3.465V4H5v4.535C6.196 9.227 7 10.52 7 12c0 1.48-.804 2.773-2 3.465V20h14v-4.535zM9 6h6v2H9V6zm0 10h6v2H9v-2z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
