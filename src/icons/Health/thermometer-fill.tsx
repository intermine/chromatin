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
                <path d="M20.556 3.444c1.562 1.562 1.562 4.094 0 5.657l-8.2 8.2c-.642.642-1.484 1.047-2.387 1.147l-3.378.374-2.298 2.3c-.39.39-1.024.39-1.414 0-.39-.391-.39-1.024 0-1.415l2.298-2.299.375-3.377c.1-.903.505-1.745 1.147-2.387l8.2-8.2c1.563-1.562 4.095-1.562 5.657 0zm-9.192 9.192L9.95 14.05l2.121 2.122 1.414-1.415-2.121-2.121zm2.828-2.828l-1.414 1.414 2.121 2.121 1.415-1.414-2.122-2.121zm2.829-2.829l-1.414 1.414 2.12 2.122L19.143 9.1l-2.121-2.122z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
