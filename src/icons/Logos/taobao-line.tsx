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
    const {
        className,
        classes: _classes = {},
        csx = {},
        height,
        width,
        ...rest
    } = props
    const classes = useStyles({
        className,
        classes: _classes,
        csx,
        height,
        width,
        ...rest,
    })

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
                    d="M17.172 14H14.5v1.375c.55-.221 1.153-.49 1.812-.81l-.082-.238.942-.327zm.828-.287l.12-.042c.641 1.851 1.034 3.012 1.185 3.5l-1.912.59c-.074-.24-.216-.672-.427-1.293-6.081 2.885-8.671 2.054-9.008-1.907l1.993-.17c.1 1.165.344 1.622.897 1.752.393.093.94.063 1.652-.104V14H9v-2h.513l-1.167-1.39c1.043-.876 1.858-1.83 2.448-2.864-.518.135-1.037.28-1.551.435a13.955 13.955 0 0 1-1.754 2.109l-1.4-1.428c1.272-1.248 2.333-2.91 3.176-4.994l1.854.75a21.71 21.71 0 0 1-.48 1.101c3.702-.936 7.275-1.317 9.138-.68 1.223.418 1.919 1.391 2.187 2.584.17.756.313 2.689.313 5.123 0 2.807-.056 3.77-.34 4.622-.297.89-.696 1.418-1.407 1.984-.657.523-1.553.763-2.645.823-.673.037-1.368.003-2.095-.08a19.614 19.614 0 0 1-.596-.075l.264-1.982a57.039 57.039 0 0 0 .556.07c.625.07 1.216.1 1.762.07.714-.04 1.245-.181 1.508-.39.426-.34.591-.558.756-1.054.186-.554.237-1.448.237-3.988 0-2.299-.133-4.102-.264-4.683-.13-.577-.41-.97-.883-1.132-1.207-.412-3.801-.194-6.652.417l.615.262c-.13.302-.273.6-.43.89H18v2h-3.5V12H18v1.713zM12.5 10.5h-1.208A13.685 13.685 0 0 1 9.798 12H12.5v-1.5zm-10.039-.438L3.54 8.377c1.062.679 2.935 2.427 3.338 3.161 1.239 2.26.197 4.176-3.122 7.997l-1.51-1.311c2.687-3.094 3.5-4.59 2.878-5.724-.214-.39-1.857-1.924-2.662-2.438zm2.68-2.479c-1.049 0-1.883-.762-1.888-1.693 0-.94.84-1.701 1.887-1.701 1.04 0 1.883.758 1.883 1.701 0 .935-.843 1.693-1.883 1.693z"
                />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
