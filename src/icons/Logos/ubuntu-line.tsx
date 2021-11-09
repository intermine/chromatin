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
    const { className, classes: _classes = {}, csx = {}, ...rest } = props
    const classes = useStyles({ className, classes: _classes, csx, ...rest })

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
                <path d="M8.667 19.273l1.006-1.742a6.001 6.001 0 0 0 8.282-4.781h2.012A7.97 7.97 0 0 1 18.928 16a8 8 0 0 1-1.452 1.835 2.493 2.493 0 0 0-1.976.227 2.493 2.493 0 0 0-1.184 1.596 7.979 7.979 0 0 1-5.65-.385zm-1.3-.75a7.979 7.979 0 0 1-3.156-4.7C4.696 13.367 5 12.72 5 12c0-.72-.304-1.369-.791-1.825A8 8 0 0 1 5.072 8a7.97 7.97 0 0 1 2.295-2.524l1.006 1.742a6.001 6.001 0 0 0 0 9.563l-1.005 1.742zm1.3-13.796a8.007 8.007 0 0 1 5.648-.387c.152.65.562 1.238 1.185 1.598.623.36 1.337.42 1.976.227a8.007 8.007 0 0 1 2.49 5.085h-2.013A5.99 5.99 0 0 0 15 6.804a5.99 5.99 0 0 0-5.327-.335L8.667 4.727zM16 5.072a1.5 1.5 0 1 1 1.5-2.598A1.5 1.5 0 0 1 16 5.072zM4 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm12 6.928a1.5 1.5 0 1 1 1.5 2.598 1.5 1.5 0 0 1-1.5-2.598z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
