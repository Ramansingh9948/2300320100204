const STACKS = ["backend", "frontend"];

const LEVELS = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

const PACKAGES = [
  // backend
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",

  // frontend
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",

  // shared
  "auth",
  "config",
  "middleware",
  "utils",
];

module.exports = {
  STACKS,
  LEVELS,
  PACKAGES,
};
