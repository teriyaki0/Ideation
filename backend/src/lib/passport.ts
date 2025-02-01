import { type Express } from "express";
import { Passport } from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { config } from "./config";
import { type AppContext } from "./ctx";

export const applyPassportToApp = (
  expressApp: Express,
  ctx: AppContext
): void => {
  const passport = new Passport();

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: config.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
      },
      (jwtPayload, done) => {
        ctx.prisma.user
          .findUnique({
            where: { id: jwtPayload.id },
          })
          .then((user) => {
            if (!user) {
              done(null, false);
              return;
            }
            done(null, user);
          })
          .catch((error) => {
            done(error, false);
          });
      }
    )
  );

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next();
      return;
    }

    passport.authenticate("jwt", { session: false }, (...args: any[]) => {
      req.user = args[1] || undefined;
      next();
    })(req, res, next);
  });
};
