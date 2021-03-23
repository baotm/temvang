module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3002),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'fafd7566acbbb43d828ea365bd726a34'),
    },
  },
});
