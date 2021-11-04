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
                    d="M5.927 12.497c2.063-.443 1.782-2.909 1.72-3.448-.101-.83-1.078-2.282-2.405-2.167-1.67.15-1.913 2.561-1.913 2.561-.226 1.115.54 3.497 2.598 3.054zm2.19 4.288c-.06.173-.195.616-.078 1.002.23.866.982.905.982.905h1.08v-2.64H8.944c-.52.154-.77.559-.827.733zm1.638-8.422c1.14 0 2.06-1.312 2.06-2.933 0-1.62-.92-2.93-2.06-2.93-1.137 0-2.06 1.31-2.06 2.93 0 1.621.923 2.933 2.06 2.933zm4.908.193c1.522.198 2.501-1.427 2.696-2.659.199-1.23-.784-2.658-1.862-2.904-1.08-.248-2.429 1.483-2.552 2.61-.147 1.38.197 2.758 1.718 2.953zm0 3.448c-1.865-2.905-4.513-1.723-5.4-.245-.881 1.477-2.256 2.41-2.451 2.658-.198.244-2.846 1.673-2.258 4.284.587 2.609 2.652 2.56 2.652 2.56s1.521.15 3.286-.246c1.766-.391 3.286.098 3.286.098s4.125 1.38 5.253-1.278c1.128-2.66-.637-4.038-.637-4.038s-2.356-1.823-3.732-3.793zm-6.008 7.75c-1.158-.231-1.619-1.021-1.677-1.156-.057-.137-.386-.772-.212-1.853.5-1.619 1.927-1.735 1.927-1.735h1.428v-1.755l1.215.02v6.479h-2.68zm4.59-.019c-1.196-.308-1.251-1.158-1.251-1.158v-3.412l1.251-.02v3.066c.077.328.483.387.483.387h1.271v-3.433h1.332v4.57h-3.086zm7.454-9.11c0-.59-.49-2.364-2.305-2.364-1.819 0-2.062 1.675-2.062 2.859 0 1.13.095 2.707 2.354 2.657 2.26-.05 2.013-2.56 2.013-3.152z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
