const { connect } = require("@crusaider/leakbot-api");

connect({
  username: "user",
  password: "password",
}).then((client) => {
  client.listUserDevices().then(console.log);
});
