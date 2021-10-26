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
                <path fill="none" d="M0 0H24V24H0z" />
                <path d="M12 2c2.21 0 4 1.79 4 4v9h1c.55 0 1-.45 1-1V8c0-.552.448-1 1-1s1 .448 1 1v6c0 1.657-1.343 3-3 3h-1v3h2v2H6v-2h2v-6H7c-1.657 0-3-1.343-3-3V9c0-.552.448-1 1-1s1 .448 1 1v2c0 .55.45 1 1 1h1V6c0-2.21 1.79-4 4-4z" />
            </g>
        </svg>
    )
})
