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
                <path d="M17 4c2.761 0 5 2.239 5 5s-2.239 5-5 5c-.304 0-.603-.027-.892-.08l-2.651 1.989c.028.193.043.39.043.591 0 2.21-1.79 4-4 4s-4-1.79-4-4c0-.177.012-.352.034-.524L1.708 14.43l.75-1.854 3.826 1.545C7.013 13.138 8.182 12.5 9.5 12.5c.163 0 .323.01.48.029l2.042-3.061C12.007 9.314 12 9.158 12 9c0-2.761 2.239-5 5-5zM9.5 14.5c-.464 0-.892.158-1.231.424l1.606.649c.512.207.76.79.552 1.302-.207.512-.79.76-1.302.552L7.52 16.78c.136.972.971 1.721 1.981 1.721 1.105 0 2-.895 2-2s-.895-2-2-2zm3.364-2.69l-.983 1.476c.284.21.54.458.758.735l1.36-1.02c-.44-.332-.825-.735-1.135-1.191zM17 6c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 1c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2z" />
            </g>
        </svg>
    )
})
