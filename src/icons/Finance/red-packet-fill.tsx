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
                <path d="M21 5.937A11.985 11.985 0 0 1 14.194 9.8a2.5 2.5 0 0 0-4.388 0A11.985 11.985 0 0 1 3 5.937V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.937zm0 2.787V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.724A13.944 13.944 0 0 0 9.63 11.8a2.501 2.501 0 0 0 4.74 0A13.944 13.944 0 0 0 21 8.724z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
