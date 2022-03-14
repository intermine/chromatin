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
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-10.432c.24-.84 1.075-1.541 1.99-1.648.187.694.388 1.373.545 2.063.053.23.037.495-.018.727-.213.892-1.248 1.242-1.978.685-.53-.405-.742-1.12-.539-1.827zm3.817-.197c-.125-.465-.256-.927-.393-1.42.5.13.908.36 1.255.698 1.257 1.221 1.385 3.3.294 4.731-1.135 1.49-3.155 2.134-5.028 1.605-2.302-.65-3.808-2.952-3.441-5.316.274-1.768 1.27-3.004 2.9-3.733.407-.182.58-.56.42-.93-.157-.364-.54-.504-.944-.343-2.721 1.089-4.32 4.134-3.67 6.987.713 3.118 3.495 5.163 6.675 4.859 1.732-.165 3.164-.948 4.216-2.347 1.506-2.002 1.297-4.783-.463-6.499-.666-.65-1.471-1.018-2.39-1.153-.083-.013-.217-.052-.232-.106-.087-.313-.18-.632-.206-.954-.029-.357.29-.64.65-.645.253-.003.434.13.603.3.303.3.704.322.988.062.29-.264.296-.678.018-1.008-.566-.672-1.586-.891-2.43-.523-.847.37-1.321 1.187-1.2 2.093.038.28.11.557.167.842l-.26.072c-.856.24-1.561.704-2.098 1.414-.921 1.22-.936 2.828-.041 3.947 1.274 1.594 3.747 1.284 4.523-.568.284-.676.275-1.368.087-2.065z" />
            </g>
        </svg>
    )
}) as (props: ChromatinIcon & { ref?: any }) => JSX.Element
