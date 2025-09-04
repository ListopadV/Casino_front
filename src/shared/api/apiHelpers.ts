// TODO переделать под бекенд.

export interface ApiErrorShape {
  readonly success: false;
  readonly error: {
    readonly code?: string;
    readonly message: string;
    readonly details?: ReadonlyArray<{ field: string; message: string }>;
  };
}

export const isApiError = (
  error: unknown,
): error is { data: ApiErrorShape } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in (error as Record<string, unknown>) &&
    typeof (error as { data: unknown }).data === 'object' &&
    (error as { data: { success?: unknown } }).data?.success === false
  );
};

export const getApiErrorMessage = (error: unknown): string => {
  if (isApiError(error)) return error.data.error.message;
  if (error instanceof Error) return error.message;
  return 'Unexpected error occurred';
};

export const getApiErrorCode = (error: unknown): string | undefined => {
  if (isApiError(error)) return error.data.error.code;
  return undefined;
};

export const formatApiError = (
  error: unknown,
): { title: string; message: string } => {
  const code = getApiErrorCode(error);
  const message = getApiErrorMessage(error);

  switch (code) {
    case 'VALIDATION_ERROR':
      return { title: 'Validation Error', message };
    case 'AUTHENTICATION_FAILED':
      return {
        title: 'Authentication Failed',
        message: 'Invalid credentials provided',
      };
    case 'AUTHENTICATION_REQUIRED':
      return {
        title: 'Authentication Required',
        message: 'Please login to continue',
      };
    case 'INSUFFICIENT_PRIVILEGES':
    case 'FORBIDDEN':
      return {
        title: 'Access Denied',
        message: 'You do not have permission to perform this action',
      };
    case 'USER_EXISTS':
      return { title: 'User Already Exists', message };
    case 'USER_NOT_FOUND':
      return { title: 'User Not Found', message };
    case 'REGISTRATION_FAILED':
      return {
        title: 'Registration Failed',
        message: 'Failed to create user account',
      };
    case 'LOGIN_FAILED':
      return { title: 'Login Failed', message: 'Failed to authenticate user' };
    case 'NOT_FOUND':
      return { title: 'Not Found', message };
    case 'CONFLICT':
      return { title: 'Conflict', message };
    case 'PAYMENT_REQUIRED':
      return { title: 'Payment Required', message };
    case 'RATE_LIMIT_EXCEEDED':
      return { title: 'Too Many Requests', message: 'Please try again later' };
    case 'SERVER_ERROR':
      return {
        title: 'Server Error',
        message: 'Something went wrong on our end',
      };
    case 'SERVICE_UNAVAILABLE':
      return {
        title: 'Service Unavailable',
        message: 'Please try again later',
      };
    default:
      return { title: 'Error', message };
  }
};
