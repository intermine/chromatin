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
                <path fill="none" d="M0 0H24V24H0z" />
                <path d="M17.993 3.004c2.433 0 4.005 1.512 4.005 4.496 0 1.72-.998 3.94-1.832 5.235-2.789 4.333-6.233 8.74-9.643 8.74-3.706 0-4.67-6.831-5.092-8.432-.422-1.601-.533-2.21-1.17-3.233-.317.22-.76.529-1.33.93-.224.157-.533.105-.693-.117L.925 8.807C.789 8.62.8 8.363.952 8.187 3.779 4.915 6.128 3.278 8 3.278c2.392 0 3.124 2.816 3.324 4.223.3 2.117.69 4.738 1.244 5.872.557-.792 2.18-2.888 1.967-3.99-.094-.486-1.317.183-1.887.078-.425-.08-.806-.402-.806-1.026 0-1.31 1.852-5.43 6.151-5.43zm.007 2c-2.195 0-3.251 1.533-3.653 2.208 1.25.046 1.97.818 2.133 1.803.389 2.33-1.916 4.92-2.339 5.565-.396.603-3.061 3.328-4.25-3.36-.112-.629-.367-2.163-.665-4.186-.17-1.151-.873-1.763-1.23-1.763-.842 0-1.92.65-3.855 2.515 1.905-.115 2.545 2.276 2.916 3.633.816 2.984 1.571 8.056 3.62 8.056 1.727 0 4.439-2.646 7.37-7.04.209-.311 1.966-3.024 1.966-5.036 0-2.395-1.469-2.395-2.013-2.395z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
