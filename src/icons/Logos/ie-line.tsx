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
                    d="M18.159 10A6.002 6.002 0 0 0 6.84 10H18.16zM6.583 13a6.002 6.002 0 0 0 11.08 2.057h3.304A9.003 9.003 0 0 1 8.612 20.12c-2.744 1.491-5.113 1.8-6.422.491-1.344-1.34-.628-4.851 1.313-8.373a23.624 23.624 0 0 1 2.499-3.665c.359-.433.735-.852 1.125-1.252-.275.055-1.88.851-3.412 2.714a9.004 9.004 0 0 1 9.468-7.009c3.095-1.402 5.974-1.726 7.192-.51 1.125 1.123 1.062 2.995.125 5.242-.01.021-.018.043-.027.064A8.96 8.96 0 0 1 21.5 12c0 .338-.019.672-.055 1H6.583zm1.422 6.799a9.03 9.03 0 0 1-3.972-4.742c-1.161 2.282-1.46 4.19-.469 5.18.813.812 2.438.624 4.438-.436l.003-.002zM20.172 7.292a8.19 8.19 0 0 1 .015-.034c.75-1.622.813-2.994.125-3.806-.869-.868-2.54-.75-4.522.168a9.032 9.032 0 0 1 4.382 3.672z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
