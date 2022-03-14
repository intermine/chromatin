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
                    d="M18.663 10.84a.526.526 0 0 1-.526.525h-1.462v.938h1.462a.525.525 0 1 1 0 1.049H16.15a.526.526 0 0 1-.522-.524V8.852c0-.287.235-.525.525-.525h1.988a.525.525 0 0 1-.003 1.05h-1.462v.938h1.462c.291 0 .526.237.526.525zm-4.098 2.485a.538.538 0 0 1-.166.025.515.515 0 0 1-.425-.208l-2.036-2.764v2.45a.525.525 0 0 1-1.047 0V8.852a.522.522 0 0 1 .52-.523c.162 0 .312.086.412.211l2.052 2.775V8.852c0-.287.235-.525.525-.525.287 0 .525.238.525.525v3.976a.524.524 0 0 1-.36.497zm-4.95.027a.526.526 0 0 1-.523-.524V8.852c0-.287.236-.525.525-.525.289 0 .524.238.524.525v3.976a.527.527 0 0 1-.526.524zm-1.53 0H6.098a.528.528 0 0 1-.525-.524V8.852a.527.527 0 0 1 1.05 0v3.45h1.464a.525.525 0 0 1 0 1.05zM12 2.572c-5.513 0-10 3.643-10 8.118 0 4.01 3.558 7.369 8.363 8.007.325.068.769.215.881.492.1.25.066.638.032.9l-.137.85c-.037.25-.2.988.874.537 1.076-.449 5.764-3.398 7.864-5.812C21.313 14.089 22 12.477 22 10.69c0-4.475-4.488-8.118-10-8.118z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
