module.exports = {
  AUTH_INCORRECT_REFRESH_TOKEN: () => ({
    status: 401,
    title: 'INCORRECT_REFRESH_TOKEN',
    detail: 'Refresh token is invalid or expired. Authentication required.',
  }),
}
