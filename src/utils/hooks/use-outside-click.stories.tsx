import { Story } from '@storybook/react/types-6-0'
import { useRef } from 'react'

import { Box } from '../../box'
import { useOutsideClick } from './use-outside-click'

export default {
    title: 'Utils/Hooks/useOutsideClick',
}

const Template: Story = (args) => {
    const ref = useRef<HTMLElement | null>(null)
    const isClickedOutside = useOutsideClick({
        anchorElement: ref.current,
        triggerOnKeyboardEvent: true,
    })

    return (
        <>
            <Box
                tabIndex={1}
                innerRef={ref}
                csx={{
                    root: {
                        width: 250,
                        height: 300,
                        border: '1px solid #005bff',
                        '&:focus': { borderColor: 'red' },
                    },
                }}
                {...args}
            >
                You clicked :{' '}
                {typeof isClickedOutside !== 'undefined'
                    ? isClickedOutside
                        ? 'Outside'
                        : 'Inside'
                    : 'Not clicked yet!'}
            </Box>
            <Box tabIndex={1} />
        </>
    )
}

export const Default = Template.bind({})
Default.args = {}
