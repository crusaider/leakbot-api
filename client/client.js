const { connect } = require("@crusaider/leakbot-api");

connect({
  username: "jonas.m.andreasson@gmail.com",
  password: "wCwR6C9zakgzERbFGr",
}).then((client) => {
  client.listUserDevices().then(console.log);
});
