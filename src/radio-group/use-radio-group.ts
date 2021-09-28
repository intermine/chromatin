import { useContext } from 'react'

import {
    RadioGroupContext,
    RadioGroupContextProps,
} from './radio-group-context'

export const useRadioGroup = (): RadioGroupContextProps | null => {
    return useContext(RadioGroupContext)
}
