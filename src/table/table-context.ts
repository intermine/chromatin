import { createContext } from 'react'

export type TableContextProps = {
    isDense: boolean
    hasStickyHeader: boolean
}

const TableContext = createContext<null | TableContextProps>(null)

export default TableContext
