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
                <path fill="none" d="M0 0H24V24H0z" />
                <path d="M21 3c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H6.455L2 22.5V4c0-.552.448-1 1-1h18zm-1 2H4v13.385L5.763 17H20V5zm-9.485 2.412l.447.688c-1.668.903-1.639 2.352-1.639 2.664.155-.02.318-.024.48-.009.902.084 1.613.825 1.613 1.745 0 .966-.784 1.75-1.75 1.75-.537 0-1.05-.245-1.374-.59-.515-.546-.792-1.16-.792-2.155 0-1.75 1.228-3.318 3.015-4.093zm5 0l.447.688c-1.668.903-1.639 2.352-1.639 2.664.155-.02.318-.024.48-.009.902.084 1.613.825 1.613 1.745 0 .966-.784 1.75-1.75 1.75-.537 0-1.05-.245-1.374-.59-.515-.546-.792-1.16-.792-2.155 0-1.75 1.228-3.318 3.015-4.093z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
