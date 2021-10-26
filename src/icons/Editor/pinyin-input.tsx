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
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M17.934 3.036l1.732 1L18.531 6H21v2h-2v4h2v2h-2v7h-2v-7h-3.084c-.325 2.862-1.564 5.394-3.37 7.193l-1.562-1.27c1.52-1.438 2.596-3.522 2.917-5.922L10 14v-2l2-.001V8h-2V6h2.467l-1.133-1.964 1.732-1L14.777 6h1.444l1.713-2.964zM5 13.803l-2 .536v-2.071l2-.536V8H3V6h2V3h2v3h2v2H7v3.197l2-.536v2.07l-2 .536V18.5A2.5 2.5 0 0 1 4.5 21H3v-2h1.5a.5.5 0 0 0 .492-.41L5 18.5v-4.697zM17 8h-3v4h3V8z" />
        </svg>
    )
})
