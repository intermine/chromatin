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
                <path
                    fill-rule="nonzero"
                    d="M14.766 19.51a8.003 8.003 0 0 0 0-15.02C16.71 5.977 18 8.935 18 12s-1.289 6.024-3.234 7.51zM9.234 4.49a8.003 8.003 0 0 0 0 15.02C7.29 18.023 6 15.065 6 12s1.289-6.024 3.234-7.51zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-3.5c2 0 4-3.033 4-6.5s-2-6.5-4-6.5S8 8.533 8 12s2 6.5 4 6.5z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
