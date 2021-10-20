import { Story } from '@storybook/react/types-6-0'

import { Table } from './table'
import { TableBody } from '../table-body'
import { TableCell } from '../table-cell'
import { TableHead } from '../table-head'
import { TableRow } from '../table-row'

import { Card } from '../card'

export default {
    title: 'Table',
    component: Table,
    subcomponents: { TableBody, TableCell, TableHead, TableRow },
}

const data = [
    {
        slNo: 1,
        name: 'Human.fasta',
        type: 'fasta',
        size: '2',
        date: '23/11/2022',
    },
    {
        slNo: 2,
        name: 'Human.gff',
        type: 'gff',
        size: '1',
        date: '27/02/2022',
    },
    {
        slNo: 3,
        name: 'Rat.tsv',
        type: 'tsv',
        size: '2',
        date: '9/7/2022',
    },
    {
        slNo: 4,
        name: 'Covid.csv',
        type: 'csv',
        size: '2',
        date: '20/07/2022',
    },
    {
        slNo: 5,
        name: 'Human.fasta',
        type: 'fasta',
        size: '2',
        date: '20/07/2022',
    },
]
const Template: Story = (args) => {
    return (
        <Card hoverVariant="none">
            <Table {...args}>
                <TableHead>
                    <TableRow>
                        <TableCell Component="th">Sl No.</TableCell>
                        <TableCell Component="th">File Name</TableCell>
                        <TableCell Component="th">Type</TableCell>
                        <TableCell Component="th">Size (in GB)</TableCell>
                        <TableCell Component="th">Date Added</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((d) => {
                        const { size, date, name, slNo, type } = d
                        return (
                            <TableRow key={slNo}>
                                <TableCell>{slNo}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{type}</TableCell>
                                <TableCell>{size}</TableCell>
                                <TableCell>{date}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Card>
    )
}

export const Default = Template.bind({})
Default.args = {}

const Template2: Story = (args) => {
    return (
        <Card hoverVariant="none">
            <Table {...args}>
                <TableHead>
                    <TableRow>
                        <TableCell Component="th">Sl No.</TableCell>
                        <TableCell Component="th">File Name</TableCell>
                        <TableCell Component="th">Type</TableCell>
                        <TableCell Component="th">Size (in GB)</TableCell>
                        <TableCell Component="th">Date Added</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((d) => {
                        const { size, date, name, slNo, type } = d
                        return (
                            <TableRow key={slNo}>
                                <TableCell>{slNo}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{type}</TableCell>
                                <TableCell>{size}</TableCell>
                                <TableCell>{date}</TableCell>
                            </TableRow>
                        )
                    })}
                    {data.map((d) => {
                        const { size, date, name, slNo, type } = d
                        return (
                            <TableRow key={slNo + 5}>
                                <TableCell>{slNo}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{type}</TableCell>
                                <TableCell>{size}</TableCell>
                                <TableCell>{date}</TableCell>
                            </TableRow>
                        )
                    })}
                    {data.map((d) => {
                        const { size, date, name, slNo, type } = d
                        return (
                            <TableRow key={slNo}>
                                <TableCell>{slNo + 10}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{type}</TableCell>
                                <TableCell>{size}</TableCell>
                                <TableCell>{date}</TableCell>
                            </TableRow>
                        )
                    })}
                    {data.map((d) => {
                        const { size, date, name, slNo, type } = d
                        return (
                            <TableRow key={slNo}>
                                <TableCell>{slNo + 15}</TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{type}</TableCell>
                                <TableCell>{size}</TableCell>
                                <TableCell>{date}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Card>
    )
}

export const TableWithStickyHeader = Template2.bind({})
TableWithStickyHeader.args = {
    hasStickyHeader: true,
}
