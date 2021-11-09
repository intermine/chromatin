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
                <path
                    fill-rule="nonzero"
                    d="M8.71 6.365c-1.108 1.305-1.823 3.236-1.873 5.4v.47c.051 2.165.766 4.093 1.872 5.4 1.434 1.862 3.566 3.044 5.95 3.044a7.208 7.208 0 0 0 4.005-1.226 9.94 9.94 0 0 1-7.139 2.535A9.998 9.998 0 0 1 2 12C2 6.476 6.478 2 12 2h.037a9.97 9.97 0 0 1 6.628 2.546 7.239 7.239 0 0 0-4.008-1.226c-2.382 0-4.514 1.183-5.95 3.045h.002zM22 12a9.969 9.969 0 0 1-3.335 7.454c-2.565 1.25-4.955.376-5.747-.17 2.52-.554 4.423-3.6 4.423-7.284 0-3.685-1.903-6.73-4.423-7.283.791-.545 3.182-1.42 5.747-.171A9.967 9.967 0 0 1 22 12z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
