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
                <path d="M4 18h5.5v1.25a2.75 2.75 0 1 1-5.5 0V18zm4.058-4l.045-.132C8.87 11.762 9 11.37 9 11c0-.75-.203-1.643-.528-2.273C8.23 8.257 8.06 8.12 8 8.12 6.72 8.12 5.5 9.484 5.5 11c0 .959.075 1.773.227 2.758l.038.242h2.293zM8 6.12c2 0 3 2.88 3 4.88 0 1-.5 2-1 3.5L9.5 16H4c0-1-.5-2.5-.5-5S5.498 6.12 8 6.12zm12.054 7.978l-.217 1.231a2.75 2.75 0 0 1-5.417-.955l.218-1.23 5.416.954zm-1.05-4.246c.165-.5.301-.895.303-.9.202-.658.361-1.303.485-2.008.263-1.492-.702-3.047-1.962-3.27-.059-.01-.25.095-.57.515-.43.565-.784 1.41-.915 2.147-.058.33-.049.405.27 2.263.045.256.082.486.116.717l.02.138 2.254.398zm-.826-8.147c2.464.434 4.018 3.124 3.584 5.586-.434 2.463-1.187 3.853-1.36 4.838l-5.417-.955-.232-1.564c-.232-1.564-.55-2.636-.377-3.62.347-1.97 1.832-4.632 3.802-4.285z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
