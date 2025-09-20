export function logServerError(error: unknown) {
  /**
   * Normally we would log this to a database or a
   * logging service like Sentry or Rollbar
   */
  console.error(error);
}
