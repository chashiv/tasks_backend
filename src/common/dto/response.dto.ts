export class ErrorResponseDTO<T> {
  constructor(
    public status: 'failed',
    public data: T,
  ) {}
}

export class SuccessResponseDTO<T> {
  constructor(
    public status: 'success',
    public data: T,
  ) {}
}
