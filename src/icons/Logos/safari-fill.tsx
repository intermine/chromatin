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
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16.7 6.8l-6.114 3.786L6.8 16.7l-.104-.104-1.415 1.414.708.708 1.414-1.415L7.3 17.2l6.114-3.785L17.2 7.3l.104.104 1.415-1.414-.708-.708-1.414 1.415.104.104zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.5-19v2h1V3h-1zm0 16v2h1v-2h-1zM8.094 3.876l.765 1.848.924-.382-.765-1.848-.924.382zm6.123 14.782l.765 1.848.924-.382-.765-1.848-.924.382zm.765-15.164l-.765 1.848.924.382.765-1.848-.924-.382zM8.86 18.276l-.765 1.848.924.382.765-1.848-.924-.382zM21 11.5h-2v1h2v-1zm-16 0H3v1h2v-1zm15.458 3.615l-1.835-.794-.397.918 1.835.794.397-.918zM5.774 8.761L3.94 7.967l-.397.918 1.835.794.397-.918zm14.35-.667l-1.848.765.382.924 1.848-.765-.382-.924zM5.342 14.217l-1.848.765.382.924 1.848-.765-.382-.924zm13.376 3.793l-1.415-1.414-.707.707 1.414 1.415.708-.708zM7.404 6.697L5.99 5.282l-.708.708 1.415 1.414.707-.707zm3.908 4.615l3.611-2.235-2.235 3.61-1.376-1.375z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
