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
                <path d="M9.902 21.839A7.903 7.903 0 0 1 2 13.935C2 10.29 4.467 7.06 7.824 6.31 11.745 5.43 13.528 4.742 14.9 2c.998 1.935.323 3.71 0 4.677 4.698-1.129 6.371-3.28 6.774-3.548 0 3.952-1.231 6.452-2.419 8.065 1.476-.056 2.009-.484 2.744-.587-.325 1.448-1.5 3.49-4.33 4.795a7.905 7.905 0 0 1-7.768 6.437zm3.71-6.452c0 .323-.053.484-.403.484l-3.15.002 2.96-3.248c.86-.86.86-1.29.86-2.388 0-.334-.048-.717.048-1.05.047-.144-.048-.192-.191-.144-.335.095-.908.095-1.863.095H7.575c-.239 0-.335-.143-.239-.334 0-.048 0-.191-.096-.191-.62.286-.764 1.576-.716 2.388 0 .43.239.669.573.669h3.391l-3.486 3.725c-.24.287-.478.669-.478 1.194v1.051c0 .478.287.764.812.86h5.988c.555 0 .933-.233.933-.855v-1.129c0-.208 0-.968-.645-1.129z" />
            </g>
        </svg>
    )
})
