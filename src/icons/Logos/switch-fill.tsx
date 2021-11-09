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
                <path
                    fill-rule="nonzero"
                    d="M13.619 21c-.085 0-.141-.057-.127-.127V3.127c0-.056.042-.113.113-.113h2.785A4.61 4.61 0 0 1 21 7.624v8.766A4.61 4.61 0 0 1 16.39 21H13.62zm3.422-9.926c-1.004 0-1.824.82-1.824 1.824s.82 1.824 1.824 1.824 1.824-.82 1.824-1.824-.82-1.824-1.824-1.824zM5.8 8.4c0-.933.763-1.696 1.696-1.696.934 0 1.697.763 1.697 1.696 0 .934-.763 1.697-1.697 1.697A1.702 1.702 0 0 1 5.8 8.401zM11.54 3c.085 0 .142.057.128.127V20.86c0 .07-.057.127-.128.127H7.61A4.61 4.61 0 0 1 3 16.376V7.61A4.61 4.61 0 0 1 7.61 3h3.93zm-1.315 16.544V4.442H7.61c-.849 0-1.64.34-2.235.933a3.088 3.088 0 0 0-.933 2.235v8.766c0 .849.34 1.64.933 2.234a3.088 3.088 0 0 0 2.235.934h2.615z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
