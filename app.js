import "dotenv/config";
import express from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma.js";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { verifyCb } from "./passport/verifycallback.js";
import { serializeCb } from "./passport/serializeCallback.js";
import { deserializeCb } from "./passport/deserializeCallback.js";
import { indexRouter } from "./route/index.js";

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));

// set cookie httponly and secure to true only in production
const isProduction = process.env.NODE_ENV === "production";
app.use(
  session({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2mins
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // httpOnly: isProduction,
      // secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  }),
);
app.use(passport.session());
passport.use(new LocalStrategy(verifyCb));
passport.serializeUser(serializeCb);
passport.deserializeUser(deserializeCb);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
  return;
});
app.use(async (req, res, next) => {
  console.log(req.session);
  await console.log(req.user);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App successfully running on port ${PORT}`);
});
