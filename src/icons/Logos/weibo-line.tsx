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
                    d="M20.194 14.197c0 3.362-4.53 6.424-9.926 6.424C5.318 20.62 1 18.189 1 14.534c0-1.947 1.18-4.087 3.24-6.088 2.832-2.746 6.229-4.033 7.858-2.448.498.482.723 1.122.719 1.858 1.975-.576 3.65-.404 4.483.752.449.623.532 1.38.326 2.207 1.511.61 2.568 1.77 2.568 3.382zm-4.44-2.07c-.386-.41-.4-.92-.198-1.41.208-.508.213-.812.12-.94-.264-.368-1.533-.363-3.194.311a2.043 2.043 0 0 1-.509.14c-.344.046-.671.001-.983-.265-.419-.359-.474-.855-.322-1.316.215-.67.18-1.076.037-1.215-.186-.18-.777-.191-1.659.143-1.069.405-2.298 1.224-3.414 2.306C3.925 11.54 3 13.218 3 14.534c0 2.242 3.276 4.087 7.268 4.087 4.42 0 7.926-2.37 7.926-4.424 0-.738-.637-1.339-1.673-1.652-.394-.113-.536-.171-.767-.417zm7.054-1.617a1 1 0 0 1-1.936-.502 4 4 0 0 0-4.693-4.924 1 1 0 1 1-.407-1.958 6 6 0 0 1 7.036 7.384z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
