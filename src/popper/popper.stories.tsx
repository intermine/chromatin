import { Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'

import { Button } from '../button'
import { Box } from '../box'
import { Popper } from './popper'

export default {
    title: 'Popper',
    component: Popper,
}

const Template: Story = (props) => {
    const { children, ...args } = props
    const [anchorElement, setAnchorElement] = useState<Element | null>(null)

    const toggleAnchorElement = (event: React.MouseEvent) => {
        if (anchorElement) {
            setAnchorElement(null)
            return
        }
        setAnchorElement(event.currentTarget)
    }

    return (
        <Box>
            <Button
                variant="outlined"
                color="secondary"
                onClick={toggleAnchorElement}
            >
                Toggle Popper
            </Button>
            <Popper
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10],
                        },
                    },
                ]}
                anchorElement={anchorElement}
                {...args}
            >
                <Box
                    csx={{
                        root: ({ palette, spacing }) => ({
                            border: `1px solid ${palette.primary.main}`,
                            color: palette.primary.main,
                            padding: spacing(2),
                        }),
                    }}
                >
                    {children}
                </Box>
            </Popper>
        </Box>
    )
}

export const Default = Template.bind({})
Default.args = {
    children: 'Popper',
    required: true,
}
