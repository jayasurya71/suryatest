const config = require('pando-env');
const { ExtractJwt, Strategy } = require('passport-jwt');

function passportJWT(passport) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('web:app_secret'),
  };

  passport.use(new Strategy(options, (jwtPayload, done) => {
    try {
      if (jwtPayload) {
        done(null, jwtPayload);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  }));
}

module.exports = passportJWT;
