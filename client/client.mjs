import { connect } from "@crusaider/leakbot-api";

const client = await connect({
  username: "jonas.m.andreasson@gmail.com",
  password: "wCwR6C9zakgzERbFGr",
});

client.listUserDevices().then(console.log);
