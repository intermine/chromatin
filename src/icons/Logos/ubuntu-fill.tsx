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
                <path
                    fill-rule="nonzero"
                    d="M22 12c0 5.522-4.477 10-10 10S2 17.522 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10zM5.2 10.664a1.335 1.335 0 1 0 0 2.67 1.335 1.335 0 0 0 0-2.67zm9.533 6.069a1.334 1.334 0 1 0 1.334 2.31 1.334 1.334 0 0 0-1.334-2.31zM8.1 12c0-1.32.656-2.485 1.659-3.19l-.976-1.636a5.813 5.813 0 0 0-2.399 3.371 1.875 1.875 0 0 1 0 2.91 5.813 5.813 0 0 0 2.398 3.371l.977-1.636A3.892 3.892 0 0 1 8.1 12zM12 8.1a3.9 3.9 0 0 1 3.884 3.554l1.903-.028a5.781 5.781 0 0 0-1.723-3.762A1.872 1.872 0 0 1 13.55 6.41a5.829 5.829 0 0 0-4.12.39l.927 1.663A3.885 3.885 0 0 1 12 8.1zm0 7.8c-.587 0-1.143-.13-1.643-.363l-.927 1.662a5.774 5.774 0 0 0 4.12.39 1.872 1.872 0 0 1 2.514-1.454 5.782 5.782 0 0 0 1.723-3.762l-1.903-.027A3.898 3.898 0 0 1 12 15.9zm2.732-8.633a1.335 1.335 0 1 0 1.335-2.312 1.335 1.335 0 0 0-1.335 2.312z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
