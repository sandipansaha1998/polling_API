// Development Mode Properties
const development = {
  name: "development",
  root_url: "http://localhost:8000",
  db: "api_poling_development",
  JWT_key: "quick_poll",
};
// production Mode Properties
const production = {
  name: "production",
  root_url: "",
  db: "api_poling_production",
  JWT_key: process.env.POLING_API_JWT_KEY,
};

module.exports =
  eval(process.env.POLING_API_ENVIROMENT) == undefined
    ? development
    : production;
