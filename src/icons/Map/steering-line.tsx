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
                <path d="M21.8 14.001a10.009 10.009 0 0 1-8.4 7.902v-2.025A8.01 8.01 0 0 0 19.748 14l2.052.001zm-17.548 0a8.01 8.01 0 0 0 6.247 5.858v2.03A10.01 10.01 0 0 1 2.2 14h2.052zM18 11v2h-3a2 2 0 0 0-1.995 1.85L13 15v3h-2v-3a2 2 0 0 0-1.85-1.995L9 13H6v-2h12zm-6-9c5.185 0 9.449 3.947 9.95 9h-2.012a8.001 8.001 0 0 0-15.876 0H2.049C2.551 5.947 6.815 2 12 2z" />
            </g>
        </svg>
    )
})
