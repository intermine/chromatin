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
                    d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0-2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm4.49 9.04l-.006.014c-.42.898-1.516 2.66-1.516 2.66l-.005-.012-.32.558h1.543l-2.948 3.919.67-2.666h-1.215l.422-1.763c-.341.082-.745.195-1.223.349 0 0-.646.378-1.862-.729 0 0-.82-.722-.344-.902.202-.077.981-.175 1.594-.257.83-.112 1.339-.172 1.339-.172s-2.555.038-3.161-.057c-.606-.095-1.375-1.107-1.539-1.996 0 0-.253-.488.545-.257.798.231 4.101.9 4.101.9S8.27 9.312 7.983 8.99c-.286-.32-.841-1.754-.769-2.634 0 0 .031-.22.257-.16 0 0 3.176 1.45 5.347 2.245 2.172.795 4.06 1.199 3.816 2.228-.02.087-.072.216-.144.37z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
