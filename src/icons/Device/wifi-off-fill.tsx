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
                <path d="M12 18c.714 0 1.37.25 1.886.666L12 21l-1.886-2.334A2.987 2.987 0 0 1 12 18zM2.808 1.393l17.677 17.678-1.414 1.414-3.682-3.68-.247.306A4.98 4.98 0 0 0 12 16a4.98 4.98 0 0 0-3.141 1.11l-1.885-2.334a7.963 7.963 0 0 1 4.622-1.766l-1.773-1.772a9.963 9.963 0 0 0-4.106 1.982L3.83 10.887A12.984 12.984 0 0 1 7.416 8.83L5.885 7.3a15 15 0 0 0-3.31 2.031L.689 6.997c.915-.74 1.903-1.391 2.952-1.942L1.393 2.808l1.415-1.415zM16.084 11.87l-3.868-3.867L12 8c3.095 0 5.937 1.081 8.17 2.887l-1.886 2.334a10 10 0 0 0-2.2-1.352zM12 3c4.285 0 8.22 1.497 11.31 3.997L21.426 9.33A14.937 14.937 0 0 0 12 6c-.572 0-1.136.032-1.69.094L7.723 3.511C9.094 3.177 10.527 3 12 3z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
