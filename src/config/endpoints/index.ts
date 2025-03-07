export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  USER: {
    ME: '/user/me',
    STATS: '/user/stats',
  },
  LOBBY: {
    GET: '/lobby/active',
    EVENTS: '/lobby/events',
    CREATE: '/lobby/create',
    JOIN: '/lobby/join',
    LEAVE: '/lobby/leave',
    START: '/lobby/start',
    LEADERBOARD: '/lobby/leaderboard',
    SELECT: '/lobby/select',
  },
  LEADERBOARD: {
    LIST: '/leaderboard/list',
  },
  GAME: {},
}
