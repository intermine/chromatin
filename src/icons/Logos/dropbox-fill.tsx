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
                <path d="M17.285 10.668l5.215 3.323-5.252 3.346L12 13.993l-5.248 3.344L1.5 13.99l5.215-3.323L1.5 7.346 6.752 4 12 7.343 17.248 4 22.5 7.346l-5.215 3.322zm-.074 0L12 7.348l-5.211 3.32L12 13.988l5.211-3.32zM6.786 18.446l5.252-3.346 5.252 3.346-5.252 3.346-5.252-3.346z" />
            </g>
        </svg>
    )
})
