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
                <path d="M12 13c1.657 0 3 1.343 3 3 0 .85-.353 1.616-.92 2.162L12.17 20H15v2H9v-1.724l3.693-3.555c.19-.183.307-.438.307-.721 0-.552-.448-1-1-1s-1 .448-1 1H9c0-1.657 1.343-3 3-3zm6 0v4h2v-4h2v9h-2v-3h-4v-6h2zM4 12c0 2.527 1.171 4.78 3 6.246v2.416C4.011 18.933 2 15.702 2 12h2zm8-10c5.185 0 9.449 3.947 9.95 9h-2.012C19.446 7.054 16.08 4 12 4 9.25 4 6.824 5.387 5.385 7.5H8v2H2v-6h2V6c1.824-2.43 4.729-4 8-4z" />
            </g>
        </svg>
    )
})
