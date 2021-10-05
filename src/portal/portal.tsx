import { useState } from 'react'
import { createPortal } from 'react-dom'

import { ReactElement } from '../styles'
import { attachSignatureToComponent } from '../utils'
import { PORTAL } from '../constants/component-ids'

export type PortalProps = {
    children?: ReactElement
    /**
     * There are some requirement where a portal element should
     * behave like none portal element, i.e., it should mount
     * according to render tree. For those condition pass false
     * here.
     *
     * @default true
     */
    isPortalDisabled?: boolean
}

export const Portal = (props: PortalProps): JSX.Element => {
    const { children, isPortalDisabled = false } = props
    const [node] = useState(document.body)

    if (isPortalDisabled) return <>{children}</>

    return createPortal(children, node)
}

attachSignatureToComponent(Portal, PORTAL)
