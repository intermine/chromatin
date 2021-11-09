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
                <path d="M21 3c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h18zm-4.208 2.621c-1.011 0-1.864.676-2.133 1.6h-1.998l-2.46 4.185H8.763c-.268-.925-1.121-1.6-2.133-1.6-1.226 0-2.221.994-2.221 2.22 0 1.228.995 2.222 2.221 2.222 1.012 0 1.865-.676 2.133-1.6h1.471l2.417 4.133h2.018c.268.925 1.121 1.6 2.132 1.6 1.227 0 2.222-.994 2.222-2.221s-.995-2.222-2.222-2.222c-1.01 0-1.864.676-2.132 1.6h-1.317l-2.056-3.536 2.053-3.538h1.31c.27.925 1.122 1.6 2.133 1.6 1.227 0 2.222-.994 2.222-2.221s-.995-2.222-2.222-2.222zm.011 9.427c.644 0 1.168.524 1.168 1.168 0 .644-.524 1.167-1.168 1.167-.566 0-1.038-.405-1.144-.94 0 0-.031-.227 0-.454.106-.535.578-.94 1.144-.94zm-10.152-4.21c.644 0 1.168.524 1.168 1.168 0 .643-.524 1.167-1.168 1.167-.644 0-1.167-.524-1.167-1.167 0-.644.523-1.167 1.167-1.167zm10.15-4.209c.644 0 1.168.523 1.168 1.167s-.524 1.168-1.168 1.168c-.565 0-1.038-.406-1.144-.941-.026-.206 0-.446 0-.446.106-.543.579-.948 1.144-.948z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
