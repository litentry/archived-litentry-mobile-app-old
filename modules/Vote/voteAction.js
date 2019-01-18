export const voteActionType = {
  INIT: 'VOTE_INIT',
  SET: 'VOTE_SET',
  RESET: 'VOTE_RESET',
  SUBMITED: 'VOTE_SUBMITED',
};

export const voteAction = {
  initVote: data => ({ type: voteActionType.INIT, data }),
  setVote: data => ({ type: voteActionType.SET, data }),
  resetVote: () => ({ type: voteActionType.RESET }),
  submited: () => ({ type: voteActionType.SUBMITED }),
};
