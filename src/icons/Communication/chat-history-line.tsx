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
                <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.702 0-3.305-.425-4.708-1.175L2 22l1.176-5.29C2.426 15.306 2 13.703 2 12 2 6.477 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8 0 1.335.326 2.618.94 3.766l.35.654-.656 2.946 2.948-.654.653.349c1.148.614 2.43.939 3.765.939 4.418 0 8-3.582 8-8s-3.582-8-8-8zm1 3v5h4v2h-6V7h2z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
