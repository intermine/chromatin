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
                <path d="M4.929 21.485l5.846-5.846a2 2 0 1 0-1.414-1.414l-5.846 5.846-1.06-1.06c2.827-3.3 3.888-6.954 5.302-13.082l6.364-.707 5.657 5.657-.707 6.364c-6.128 1.414-9.782 2.475-13.081 5.303l-1.061-1.06zM16.596 2.04l6.347 6.346a.5.5 0 0 1-.277.848l-1.474.23-5.656-5.656.212-1.485a.5.5 0 0 1 .848-.283z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
