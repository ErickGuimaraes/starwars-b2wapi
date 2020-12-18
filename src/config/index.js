const configuration = {
  PORT: 3000,
  API_URL: "https://swapi.dev/api/",
  // DB_CONNECTION:
  //   "mongodb+srv://erick:12349876zxy@cluster0.jyz0i.mongodb.net/starwarsapi?retryWrites=true&w=majority",
    DB_CONNECTION:
    "mongodb://127.0.0.1:27017/planets",
  // DB_TEST_CONNECTION:
  //   "mongodb+srv://erick:12349876zxy@cluster0.jyz0i.mongodb.net/starwarsapitest?retryWrites=true&w=majority",
    DB_TEST_CONNECTION:
    "mongodb://127.0.0.1:27017/test",
};

module.exports = configuration;
