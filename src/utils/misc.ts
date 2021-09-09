import clone from 'clone-deep'
import mergeDeep from 'deepmerge'

/**
 * To check whether current environment is production.
 * @returns {boolean}
 */
export const isProdEnv = (): boolean => {
    if (process.env.NODE_ENV === 'production') return true
    return false
}

/**
 * In case in future we have to use
 * different library for cloning and merging then we
 * don't have to change other places.
 */
export { clone, mergeDeep }
