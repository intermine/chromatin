import { Story } from '@storybook/react/types-6-0'
import { useRef, useState } from 'react'

import { Box } from '../../box'
import { Popper } from '../../popper'
import { useMouseOver } from './use-mouse-over'

export default {
    title: 'Utils/Hooks/useMouseOver',
}

const Template: Story = (args) => {
    const ref1 = useRef<HTMLElement | null>(null)
    const [el, setEl] = useState<HTMLElement | null>(null)

    const isMouseOver = useMouseOver({
        anchorElement: ref1.current,
        otherElement: el,
        isHoverPolygonVisible: true,
        isCheckMouseInsidePolygon: true,
    })

    return (
        <>
            <Box
                tabIndex={1}
                innerRef={ref1}
                csx={{
                    root: {
                        width: 250,
                        height: 300,
                        marginLeft: '20rem',
                        border: '1px solid #005bff',
                        '&:focus': { borderColor: 'red' },
                    },
                }}
                {...args}
            >
                IsMouseOver: {isMouseOver ? 'Yes' : 'No'}
            </Box>
            <Popper
                csx={{ root: { display: isMouseOver ? 'block' : 'none' } }}
                placement="bottom-start"
                anchorElement={ref1.current}
            >
                <Box
                    innerRef={(el: any) => setEl(el)}
                    csx={{
                        root: {
                            margin: '5rem',
                            width: '30rem',
                            height: '10rem',
                            border: '1px solid #005bff',
                        },
                    }}
                    tabIndex={1}
                >
                    Element 2
                </Box>
            </Popper>
        </>
    )
}

export const Default = Template.bind({})
Default.args = {}
