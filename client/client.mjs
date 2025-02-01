import { connect } from "@crusaider/leakbot-api";

const client = await connect({
  username: "user",
  password: "password",
});

client.listUserDevices().then(console.log);
