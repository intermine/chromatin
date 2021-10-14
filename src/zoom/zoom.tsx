import { cloneElement } from 'react'
import { Transition } from 'react-transition-group'
import cx from 'clsx'

import {
    TransitionProps,
    TransitionStatus,
} from 'react-transition-group/Transition'

import { createStyle } from '../styles'

export type ZoomProps = TransitionProps

type StyleProps = {
    timeout: TransitionProps['timeout']
}

const useStyles = createStyle({
    exited: (props: StyleProps) => {
        const { timeout: _timeout } = props
        const timeout = typeof _timeout === 'object' ? _timeout.exit : _timeout

        return {
            transform: 'scale(0)',
            transition: `${timeout ?? 200}ms`,
            opacity: 0,
        }
    },
    exiting: (props: StyleProps) => {
        const { timeout: _timeout } = props
        const timeout = typeof _timeout === 'object' ? _timeout.exit : _timeout

        return {
            transform: 'scale(0)',
            transition: `${timeout ?? 200}ms`,
            opacity: 0,
        }
    },
    entering: (props: StyleProps) => {
        const { timeout: _timeout } = props
        const timeout = typeof _timeout === 'object' ? _timeout.enter : _timeout

        return {
            transform: 'scale(1)',
            transition: `${timeout ?? 200}ms`,
            opacity: 1,
        }
    },
    entered: (props: StyleProps) => {
        const { timeout: _timeout } = props
        const timeout = typeof _timeout === 'object' ? _timeout.enter : _timeout

        return {
            transform: 'scale(1)',
            transition: `${timeout ?? 200}ms`,
            opacity: 1,
        }
    },
})

export const Zoom = (props: ZoomProps): JSX.Element => {
    const { in: _in, timeout = 200, children, ...rest } = props

    const classes = (useStyles({ timeout }) as unknown) as any

    return (
        <Transition in={_in} timeout={timeout} {...rest}>
            {(state: TransitionStatus, childProps: any) => {
                return cloneElement(children as any, {
                    className: cx(childProps, classes[state]),
                    ...childProps,
                })
            }}
        </Transition>
    )
}
