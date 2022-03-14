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
                <path d="M2.808 1.393l18.384 18.385-1.414 1.414-3.747-3.747L12 21.485 3.52 12.993c-2.04-2.284-2.028-5.753.034-8.023L1.393 2.808l1.415-1.415zm2.172 10.23L12 18.654l2.617-2.623-9.645-9.645c-1.294 1.497-1.3 3.735.008 5.237zm15.263-6.866c2.262 2.268 2.34 5.88.236 8.236l-1.635 1.636-1.414-1.414 1.59-1.592c1.374-1.576 1.299-3.958-.193-5.453-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-.35-.314-.741-.555-1.155-.723l-2.25-2.25c1.668-.206 3.407.289 4.74 1.484 2.349-2.109 5.979-2.039 8.242.228z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
