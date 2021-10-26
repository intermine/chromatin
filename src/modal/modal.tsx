import { forwardRef } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cx from 'clsx'

import {
    ThemeCSSStyles,
    getThemeCSSObject,
    createStyle,
    hex2rgba,
    themeTernaryOperator as tto
} from '../styles'
import { attachSignatureToComponent } from '../utils'
import { MODAL } from '../constants/component-ids'

export interface ModalProps extends Omit<ReactModalProps, 'as'> {
    /**
     * To extend the styles applied to the components
     */
    classes?: {
        /**
         * Applied to root component
         */
        root?: string
        /**
         * Applied to content container
         */
        content?: string
    }
    /**
     * To override the applied styles.
     */
    csx?: {
        /**
         * Applied to root component
         */
        root?: ThemeCSSStyles
        /**
         * Applied to content container
         */
        content?: ThemeCSSStyles
    }
}

const useStyles = createStyle((theme) => ({
    root: (props: ModalProps) => {
        const { isOpen = false, csx = {} } = props
        const { themeVars, ...themePropsForThemeVarFn } = theme
        const {
            palette: {
                common: { white, black }
            },
            themeType
        } = themePropsForThemeVarFn

        const rgba = hex2rgba(tto(themeType, black, white), 0.05)

        return {
            alignItems: 'center',
            background: rgba.rgba,
            bottom: 0,
            display: isOpen ? 'flex' : 'none',
            justifyContent: 'center',
            left: 0,
            position: 'fixed',
            right: 0,
            top: 0,
            ...themeVars.modal(themePropsForThemeVarFn, props),
            ...getThemeCSSObject(csx.root, theme)
        }
    },

    content: (props: ModalProps) => {
        const { csx = {} } = props
        const {
            palette: { neutral }
        } = theme

        return {
            color: neutral[90],
            ...getThemeCSSObject(csx.root, theme)
        }
    }
}))

export const Modal = forwardRef<any, ModalProps>((props, ref): JSX.Element => {
    const { classes: _classes = {}, className, children, ...rest } = props

    const classes = useStyles(props)

    return (
        <ReactModal
            className={cx(classes.content, _classes.content)}
            overlayClassName={cx(classes.root, className, _classes.root)}
            ref={ref}
            {...rest}
        >
            {children}
        </ReactModal>
    )
})

attachSignatureToComponent(Modal, MODAL)
