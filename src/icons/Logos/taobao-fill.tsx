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
                    d="M3.576 8.277l-1.193 1.842 2.2 1.371s1.464.754.763 2.169c-.65 1.338-3.846 4.27-3.846 4.27l2.862 1.798c1.984-4.326 1.85-3.75 2.347-5.306.512-1.58.624-2.794-.242-3.677-1.113-1.125-1.238-1.23-2.891-2.467zm1.564-.694c1.04 0 1.883-.758 1.883-1.693 0-.943-.843-1.701-1.883-1.701-1.048 0-1.887.762-1.887 1.701.005.931.84 1.693 1.887 1.693zm17.005.21s-.624-4.87-11.207-1.854c.455-.795.669-1.307.669-1.307l-2.64-.75s-1.07 3.508-2.972 5.14c0 0 1.846 1.073 1.826 1.04a17.07 17.07 0 0 0 1.407-1.596c.424-.19.83-.363 1.226-.524-.492.887-1.278 2.218-2.068 3.056l1.112.984s.762-.738 1.589-1.62h.943v1.636H8.345v1.306h3.685v3.133l-.14-.004c-.408-.02-1.037-.089-1.287-.484-.298-.484-.077-1.359-.064-1.903H7.995l-.093.052s-.935 4.205 2.689 4.113c3.386.092 5.33-.956 6.265-1.677l.37 1.394 2.09-.882-1.416-3.484-1.693.536.314 1.19c-.427.33-.93.572-1.467.754v-2.738h3.592v-1.31h-3.592v-1.637h3.604V9.051h-6.41c.464-.569.822-1.089.92-1.415l-1.122-.307c4.798-1.733 7.47-1.435 7.45 1.403v7.475s.283 2.564-2.636 2.383l-1.58-.343-.367 1.512s6.817 1.967 7.374-3.314c.552-5.282-.142-8.652-.142-8.652z"
                />
            </g>
        </svg>
    )
})
