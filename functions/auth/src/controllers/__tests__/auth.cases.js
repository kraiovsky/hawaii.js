module.exports = {
  createUser: {
    happy: [
      ['set state with jwtClaim of existing user', 'email@domain.com', false],
      ['set state with jwtClaim of new user', 'new@email.com', true],
    ],
  },
  upsertToken: {
    happy: [
      [
        '603e7b98-fa52-11e8-8644-d1e6d1ba128b',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDNlN2I5OC1mYTUyLTExZTgtODY0NC1kMWU2ZDFiYTEyOGIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTQ0MzI4NDYwLCJleHAiOjE1NDY5MjA0NjB9.wIQOg3Yxrs0HlMC0LKGFTkgGXTCJXPsQbdx7qQsR3YI',
        'execute upsert query and call next()',
      ],
    ],
    sad: [
      [
        null,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDNlN2I5OC1mYTUyLTExZTgtODY0NC1kMWU2ZDFiYTEyOGIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTQ0MzI4NDYwLCJleHAiOjE1NDY5MjA0NjB9.wIQOg3Yxrs0HlMC0LKGFTkgGXTCJXPsQbdx7qQsR3YI',
        'fail upsert query if no uid provided',
      ],
      ['603e7b98-fa52-11e8-8644-d1e6d1ba128b', null, 'fail upsert query if no token provided'],
    ],
  },
  updateToken: {
    happy: [
      [
        '0ff2daf2-7814-4336-a2d2-fc08f859006b',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwZmYyZGFmMi03ODE0LTQzMzYtYTJkMi1mYzA4Zjg1OTAwNmIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTQ0ODc4NzU1LCJleHAiOjE1NDc0NzA3NTV9.S7fTMwHLbDitDIwWxsLHbW3laaAupavwH2GE3edZgRI',
        'new_token',
        'match uid and refreshToken, return true and call next()',
      ],
    ],
    sad: [
      [
        'wrong_uid',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwZmYyZGFmMi03ODE0LTQzMzYtYTJkMi1mYzA4Zjg1OTAwNmIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTQ0ODc4NzU1LCJleHAiOjE1NDc0NzA3NTV9.S7fTMwHLbDitDIwWxsLHbW3laaAupavwH2GE3edZgRI',
        'new_token',
        'not match uid, fail and respond with auth error',
      ],
      [
        '0ff2daf2-7814-4336-a2d2-fc08f859006b',
        'wrong_refresh_token',
        'new_token',
        'not match refreshToken, fail and respond with auth error',
      ],
      [
        null,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwZmYyZGFmMi03ODE0LTQzMzYtYTJkMi1mYzA4Zjg1OTAwNmIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTQ0ODc4NzU1LCJleHAiOjE1NDc0NzA3NTV9.S7fTMwHLbDitDIwWxsLHbW3laaAupavwH2GE3edZgRI',
        'new_token',
        'fail update query if no uid provided',
      ],
      [
        '0ff2daf2-7814-4336-a2d2-fc08f859006b',
        null,
        'new_token',
        'fail update query if no current refreshToken provided',
      ],
      [
        '0ff2daf2-7814-4336-a2d2-fc08f859006b',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwZmYyZGFmMi03ODE0LTQzMzYtYTJkMi1mYzA4Zjg1OTAwNmIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTQ0ODc4NzU1LCJleHAiOjE1NDc0NzA3NTV9.S7fTMwHLbDitDIwWxsLHbW3laaAupavwH2GE3edZgRI',
        null,
        'fail update query if no new refreshToken provided',
      ],
    ],
  },
  sendMagicLink: {
    happy: [[false, 'return 200 OK'], [true, 'return 201 OK']],
  },
}
