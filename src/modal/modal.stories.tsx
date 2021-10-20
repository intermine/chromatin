import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'

import { Modal } from './modal'
import { Box } from '../box'
import { Button } from '../button'
import { Typography } from '../typography'

export default {
    title: 'Modal',
    component: Modal,
}

const Template: Story = (args) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <Box>
            <Button onClick={toggleModal} color="secondary" variant="outlined">
                Open Modal
            </Button>
            <Modal onRequestClose={toggleModal} isOpen={isOpen} {...args}>
                <Box
                    csx={{
                        root: (theme) => ({
                            display: 'flex',
                            flexDirection: 'column',
                            width: '300px',
                            height: '100px',
                            padding: '1rem 2rem',
                            background: theme.palette.neutral[10],
                        }),
                    }}
                >
                    <Typography variant="body" csx={{ root: { flex: '1' } }}>
                        This is a modal
                    </Typography>
                    <Button
                        csx
                        onClick={toggleModal}
                        color="error"
                        variant="outlined"
                    >
                        Close Modal
                    </Button>
                </Box>
            </Modal>
        </Box>
    )
}

export const Default = Template.bind({})
Default.args = {}
