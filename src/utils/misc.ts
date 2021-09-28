import clone from 'clone-deep'
import mergeDeep from 'deepmerge'

/**
 * In case in future we have to use
 * different library for cloning and merging then we
 * don't have to change other places.
 */
export { clone, mergeDeep }
