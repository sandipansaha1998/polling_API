// Development Mode Properties
const development = {
  name: "development",
  root_url: "http://localhost:8000",
  JWT_key: "quick_poll",
};
// production Mode Properties
const production = {
  name: "production",
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  root_url: "",
  JWT_key: process.env.POLING_API_JWT_KEY,
};

module.exports =
  eval(process.env.POLING_API_ENVIROMENT) == undefined
    ? development
    : production;
