const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "aws-0-ap-southeast-1.pooler.supabase.com"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "postgres"),
      user: env("DATABASE_USERNAME", "postgres.hrpyhiinoakoazjyrlub"),
      password: env("DATABASE_PASSWORD", "Dinesh@#2911"),
      ssl: env.bool("DATABASE_SSL", false),
    },
    pool: {
      min: env.int("DATABASE_POOL_MIN", 2),
      max: env.int("DATABASE_POOL_MAX", 15),
      afterCreate: (conn, done) => {
        // Ensure compatibility with session pool mode
        conn.query(
          `SET SESSION pool_mode = '${env("DATABASE_POOL_MODE", "session")}'`,
          (err) => {
            done(err, conn);
          }
        );
      },
    },
    useNullAsDefault: true,
  },
});
