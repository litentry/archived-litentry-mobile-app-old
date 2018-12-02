export const unlockActionType = {
  ON_KEY_PRESS: 'UNLOCK_ON_KEY_PRESS'
}

export const unlockAction = {
  onKeyPress: key => ({type: unlockActionType.ON_KEY_PRESS, key})
}