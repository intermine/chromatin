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
                <path d="M12 2l4.292 4.292 1.061-1.06L16.121 4H20v3.879l-1.233-1.233-1.06 1.061L22 12l-4.292 4.293 1.059 1.059L20 16.121V20h-3.88l1.232-1.233-1.059-1.06L12 22l-4.293-4.293-1.061 1.06L7.879 20H4v-3.88l1.231 1.232 1.061-1.06L2 12l4.293-4.293-1.062-1.061L4 7.879V4h3.879L6.646 5.23l1.062 1.062L12 2zm0 11.413l-2.88 2.879 2.88 2.88 2.879-2.88L12 13.412zM7.707 9.12L4.828 12l2.878 2.878 2.88-2.88-2.879-2.877zm8.585 0l-2.877 2.878 2.878 2.879L19.172 12l-2.88-2.879zM12 4.828L9.122 7.707l2.879 2.878 2.877-2.879L12 4.828z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
