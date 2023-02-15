export enum FetchState {
  INITIAL = 'initial',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const getFetchStatuses = (fetchState: FetchState) => ({
  isInitial: fetchState === FetchState.INITIAL,
  isPending: fetchState === FetchState.PENDING,
  isSuccess: fetchState === FetchState.SUCCESS,
  isError: fetchState === FetchState.ERROR,
});