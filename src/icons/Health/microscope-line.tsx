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
                <path d="M13.196 2.268l3.25 5.63c.276.477.112 1.089-.366 1.365l-1.3.75 1.001 1.732-1.732 1-1-1.733-1.299.751c-.478.276-1.09.112-1.366-.366L8.546 8.215C6.494 8.837 5 10.745 5 13c0 .625.115 1.224.324 1.776C6.1 14.284 7.016 14 8 14c1.684 0 3.174.833 4.08 2.109l7.688-4.439 1 1.732-7.878 4.549c.072.338.11.69.11 1.049 0 .343-.034.677-.1 1H21v2l-17 .001c-.628-.836-1-1.875-1-3.001 0-1.007.298-1.945.81-2.73C3.293 15.295 3 14.182 3 13c0-2.995 1.881-5.551 4.527-6.55l-.393-.682c-.552-.957-.225-2.18.732-2.732l2.598-1.5c.957-.552 2.18-.225 2.732.732zM8 16c-1.657 0-3 1.343-3 3 0 .35.06.687.17 1h5.66c.11-.313.17-.65.17-1 0-1.657-1.343-3-3-3zm3.464-12.732l-2.598 1.5 2.75 4.763 2.598-1.5-2.75-4.763z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
