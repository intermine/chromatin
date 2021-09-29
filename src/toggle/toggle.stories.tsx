import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'
import { FormControlLabel, Typography, Box } from '..'

import { Toggle } from './toggle'

export default {
    title: 'Toggle',
    component: Toggle,
}

type toggleType = 'off' | 'on'

const Row = ({ children }) => {
    return (
        <Box
            csx={{
                root: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                },
            }}
        >
            {' '}
            {children}{' '}
        </Box>
    )
}

const Template2: Story = (args) => {
    const [state, setState] = useState<{ [x: string]: toggleType }>({
        magnifier: 'off',
        narrator: 'off',
        filter: 'off',
    })

    const handleOnChange = (event) => {
        setState((prev) => ({
            ...prev,
            [event.target.name]:
                prev[event.target.name] === 'on' ? 'off' : 'on',
        }))
    }

    return (
        <Box csx={{ root: { width: '300px' } }}>
            <Row>
                <Typography>Magnifier</Typography>
                <FormControlLabel
                    control={
                        <Toggle
                            name="magnifier"
                            state={state.magnifier}
                            onChange={handleOnChange}
                            {...args}
                        />
                    }
                    label={state.magnifier === 'off' ? 'Off' : 'On'}
                    labelPlacement="left"
                />
            </Row>
            <Row>
                <Typography>Narrator</Typography>
                <FormControlLabel
                    control={
                        <Toggle
                            name="narrator"
                            state={state.narrator}
                            onChange={handleOnChange}
                            {...args}
                        />
                    }
                    label={state.narrator === 'off' ? 'Off' : 'On'}
                    labelPlacement="left"
                />
            </Row>
            <Row>
                <Typography>Filter</Typography>
                <FormControlLabel
                    control={
                        <Toggle
                            name="filter"
                            state={state.filter}
                            onChange={handleOnChange}
                            {...args}
                        />
                    }
                    label={state.filter === 'off' ? 'Off' : 'On'}
                    labelPlacement="left"
                />
            </Row>
        </Box>
    )
}

export const TogglerInAction = Template2.bind({})
TogglerInAction.args = {
    disabled: false,
}

const Template: Story = (args) => {
    const [state, setState] = useState<toggleType>('off')

    const handleOnChange = () => {
        setState(state === 'on' ? 'off' : 'on')
    }

    return <Toggle onChange={handleOnChange} state={state} {...args} />
}

export const Default = Template.bind({})
Default.args = {
    disabled: false,
}
