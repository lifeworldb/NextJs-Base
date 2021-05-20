import { StoreAction } from '@utils/types/store'

export const countActionTypes = {
  ADD: 'ADD'
}

export const addCount = (): StoreAction<number> => ({
  type: countActionTypes.ADD,
  payload: {
    value: 1
  }
})
