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
                <path d="M10.464 8.596c.265 0 .48 2.106.48 4.704l-.001.351c-.019 2.434-.226 4.353-.479 4.353-.256 0-.465-1.965-.48-4.44v-.352c.005-2.558.218-4.616.48-4.616zm-1.664.96c.259 0 .47 1.8.48 4.054v.34c-.01 2.254-.221 4.054-.48 4.054-.255 0-.464-1.755-.48-3.97v-.34l.002-.34c.025-2.133.23-3.798.478-3.798zm-1.664 0c.255 0 .464 1.755.48 3.97v.34l-.002.34c-.025 2.133-.23 3.798-.478 3.798-.259 0-.47-1.8-.48-4.054v-.34c.01-2.254.221-4.054.48-4.054zm-1.664.576c.265 0 .48 1.762.48 3.936l-.002.335c-.02 2.017-.227 3.601-.478 3.601-.262 0-.474-1.717-.48-3.852v-.168c.006-2.135.218-3.852.48-3.852zM3.808 11.86c.265 0 .48 1.375.48 3.072v.158c-.013 1.623-.223 2.914-.48 2.914-.265 0-.48-1.375-.48-3.072v-.158c.013-1.623.223-2.914.48-2.914zm10.784-4.8c2.58 0 4.72 1.886 5.118 4.354a3.36 3.36 0 1 1 .993 6.589l-.063.001h-8.16a.768.768 0 0 1-.768-.768V7.933a5.16 5.16 0 0 1 2.88-.873zM2.144 11.668c.265 0 .48 1.332.48 2.976v.156c-.014 1.57-.223 2.82-.48 2.82-.26 0-.473-1.29-.48-2.898v-.078c0-1.644.215-2.976.48-2.976zm-1.664.96c.265 0 .48.946.48 2.112v.131c-.016 1.105-.225 1.981-.48 1.981-.265 0-.48-.946-.48-2.112v-.131c.016-1.105.225-1.981.48-1.981z" />
            </g>
        </svg>
    )
})
