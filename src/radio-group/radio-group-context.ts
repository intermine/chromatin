import { createContext } from 'react'

export type RadioGroupContextProps = {
    name?: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    /**
     * Selected value
     */
    value?: string
}

const RadioGroupContext = createContext<null | RadioGroupContextProps>(null)

export { RadioGroupContext }
