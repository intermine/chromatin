import { forwardRef } from 'react'
import cx from 'clsx'

import { createStyle, getThemeCSSObject } from '../../styles'
import type { ChromatinIcon } from '../types'

const useStyles = createStyle((theme) => ({
    root: (props: ChromatinIcon) => ({
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
                <path d="M4 13v5h16v-5H4zm1.618-2h12.764a1 1 0 0 0 .894-1.447L18 7H6L4.724 9.553A1 1 0 0 0 5.618 11zM22 13.5V21a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7.5l-1.243-.31A1 1 0 0 1 0 12.22v-.72a.5.5 0 0 1 .5-.5H2l2.447-4.894A2 2 0 0 1 6.237 5H8V3h3v2h2V3h3v2h1.764a2 2 0 0 1 1.789 1.106L22 11h1.5a.5.5 0 0 1 .5.5v.72a1 1 0 0 1-.757.97L22 13.5zM5 14c2.317 0 3.879.755 4.686 2.264a.5.5 0 0 1-.441.736H6a1 1 0 0 1-1-1v-2zm14 0v2a1 1 0 0 1-1 1h-3.245a.5.5 0 0 1-.44-.736C15.12 14.754 16.682 14 19 14z" />
            </g>
        </svg>
    )
})
