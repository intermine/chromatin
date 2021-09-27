import { useState } from 'react'
import { createPortal } from 'react-dom'

import { ReactElement } from '../styles'

export type PortalProps = {
    children?: ReactElement
}

export const Portal = (props: PortalProps): JSX.Element => {
    const { children } = props
    const [node] = useState(document.body)

    return createPortal(children, node)
}
