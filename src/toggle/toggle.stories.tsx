import { Story } from '@storybook/react/types-6-0'
import { useState } from 'react'
import { FormControlLabel, Typography, Box } from '..'

import { Toggle } from './toggle'

export default {
    title: 'Toggle',
    component: Toggle,
}

const Template: Story = (args) => {
    const [state, setState] = useState(false)

    const handleOnChange = () => {
        setState(!state)
    }

    return <Toggle onChange={handleOnChange} isChecked={state} {...args} />
}

export const Default = Template.bind({})
Default.args = {
    isDisabled: false,
}

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
    const [state, setState] = useState({
        magnifier: false,
        narrator: true,
        filter: false,
    })

    const handleOnChange = (event) => {
        setState((prev) => ({
            ...prev,
            [event.target.name]: !prev[event.target.name],
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
                            isChecked={state.magnifier}
                            onChange={handleOnChange}
                            {...args}
                        />
                    }
                    label={!state.magnifier ? 'Off' : 'On'}
                    labelPlacement="left"
                />
            </Row>
            <Row>
                <Typography>Narrator</Typography>
                <FormControlLabel
                    control={
                        <Toggle
                            name="narrator"
                            isChecked={state.narrator}
                            onChange={handleOnChange}
                            {...args}
                        />
                    }
                    label={!state.narrator ? 'Off' : 'On'}
                    labelPlacement="left"
                />
            </Row>
            <Row>
                <Typography>Filter</Typography>
                <FormControlLabel
                    control={
                        <Toggle
                            name="filter"
                            isChecked={state.filter}
                            onChange={handleOnChange}
                            {...args}
                        />
                    }
                    label={!state.filter ? 'Off' : 'On'}
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
