/* eslint-disable @typescript-eslint/default-param-last */
import { StoreAction } from '@utils/types/store'
import { countActionTypes } from '@store/count/action'

const initialState = {
  count: 0
}

export default function reducer (
  state = initialState, { type, payload }: StoreAction<number>
): unknown {
  switch (type) {
    case countActionTypes.ADD:
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return { ...state, count: (state.count + payload.value) }
    default:
      return state
  }
}
