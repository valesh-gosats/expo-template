function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getErrorMessage(error: unknown): string {
  if (isRecord(error)) {
    const response = error.response;
    if (isRecord(response) && isRecord(response.data) && typeof response.data.message === 'string') {
      return response.data.message;
    }

    if (typeof error.message === 'string' && error.message.length > 0) {
      return error.message;
    }
  }

  return 'Something went wrong';
}
