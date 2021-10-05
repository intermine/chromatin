import { useState } from 'react'
import { Story } from '@storybook/react/types-6-0'

import { AlertGroup } from './alert-group'
import { Alert } from '../alert'
import { Box } from '../box'
import { Button } from '../button'

export default {
    title: 'AlertGroup',
    component: AlertGroup,
}

const alertMessage = `lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`
const alertType = ['success', 'error', 'warning', 'info']
const alertTitle = ['Success', 'Error', 'Warning', 'Info']

const rand = (range: number) => (Math.random() * 1000_000_000) % range

const Template: Story = (args) => {
    const [alerts, addAlerts] = useState<
        {
            title: string
            message: string
            id: string
            type: any
            isOpen: boolean
        }[]
    >([])

    const handleAddAlert = () => {
        const message = alertMessage.substr(rand(40))
        const idx = Number.parseInt(rand(4).toFixed(0), 10)
        const type = alertType[idx]
        const title = alertTitle[idx]
        const id = `${rand(1000)}`

        addAlerts((prev) => [
            ...prev,
            { id, message, type, title, isOpen: true },
        ])
    }

    const handleAlertOnClose = (idx: number) => {
        const newAlerts = alerts.map((alert, _idx) => {
            if (_idx === idx) {
                return { ...alert, isOpen: false }
            }
            return alert
        })

        addAlerts(newAlerts)
    }

    const isAnyAlertIsOpen = (): boolean => {
        for (let i = 0; i < alerts.length; i++) {
            if (alerts[i].isOpen) return true
        }

        return false
    }

    return (
        <Box>
            <Button onClick={handleAddAlert} color="info" variant="ghost">
                Add Alert
            </Button>

            <AlertGroup isOpen={isAnyAlertIsOpen()} {...args}>
                {alerts.map((alert, idx) => {
                    return (
                        <Alert
                            onClose={() => handleAlertOnClose(idx)}
                            key={alert.id}
                            type={alert.type}
                            message={alert.message}
                            title={alert.title}
                            isOpen={alert.isOpen}
                        />
                    )
                })}
            </AlertGroup>
        </Box>
    )
}

const Template2: Story = (args) => {
    const [alerts, addAlerts] = useState<
        {
            title: string
            message: string
            id: string
            type: any
            isOpen: boolean
        }[]
    >([])

    const handleAddAlert = () => {
        const message = alertMessage.substr(rand(40))
        const idx = Number.parseInt(rand(4).toFixed(0), 10)
        const type = alertType[idx]
        const title = alertTitle[idx]
        const id = `${rand(1000)}`

        addAlerts((prev) => [
            ...prev,
            { id, message, type, title, isOpen: true },
        ])
    }

    const handleAlertOnClose = (idx: number) => {
        const newAlerts = alerts.map((alert, _idx) => {
            if (_idx === idx) {
                return { ...alert, isOpen: false }
            }
            return alert
        })

        addAlerts(newAlerts)
    }

    const isAnyAlertIsOpen = (): boolean => {
        for (let i = 0; i < alerts.length; i++) {
            if (alerts[i].isOpen) return true
        }

        return false
    }

    const clearAll = () => {
        const newAlerts = alerts.map((alert) => {
            return { ...alert, isOpen: false }
        })

        addAlerts(newAlerts)
    }

    return (
        <Box>
            <Button onClick={handleAddAlert} color="info" variant="ghost">
                Add Alert
            </Button>

            <AlertGroup isOpen={isAnyAlertIsOpen()} {...args}>
                <Box
                    csx={{
                        root: {
                            padding: '1rem 0 0 0',
                            alignSelf: 'flex-end',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        },
                    }}
                >
                    <Button
                        onClick={clearAll}
                        color="secondary"
                        variant="outlined"
                    >
                        Clear All
                    </Button>
                </Box>
                {alerts.map((alert, idx) => {
                    return (
                        <Alert
                            onClose={() => handleAlertOnClose(idx)}
                            key={alert.id}
                            type={alert.type}
                            message={alert.message}
                            title={alert.title}
                            isOpen={alert.isOpen}
                        />
                    )
                })}
            </AlertGroup>
        </Box>
    )
}
export const Default = Template.bind({})
Default.args = {}

export const WithClearAllButton = Template2.bind({})
WithClearAllButton.args = {}
