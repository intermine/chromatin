import { useState } from 'react'
import { createPortal } from 'react-dom'

import { ReactElement } from '../styles'
import { attachSignatureToComponent } from '../utils'
import { PORTAL } from '../constants/component-ids'

export type PortalProps = {
    children?: ReactElement
    /**
     * There are some use cases where a portal element should
     * behave like none portal element, i.e., it should mount
     * according to render tree. For those condition pass false
     * here.
     *
     * @default true
     */
    hasUseReactPortal?: boolean
}

export const Portal = (props: PortalProps): JSX.Element => {
    const { children, hasUseReactPortal = true } = props
    const [node] = useState(document.body)

    if (!hasUseReactPortal) return <>{children}</>

    return createPortal(children, node)
}

attachSignatureToComponent(Portal, PORTAL)
