import dotenv from "dotenv";
dotenv.config();

import { DeviceId, connect } from "../src/index";

type PromiseType<T> = T extends Promise<infer U> ? U : never;

describe("integration", () => {
  describe("connected", () => {
    let client: PromiseType<ReturnType<typeof connect>>;

    beforeAll(async () => {
      client = await connect({
        password: process.env.LEAKBOT_PASSWORD!,
        username: process.env.LEAKBOT_USERNAME!,
      });
    });

    it("should be connected", () => {
      expect(client).toBeDefined();
    });

    it("should get the device list", async () => {
      const devices = await client.listUserDevices();
      expect(devices).toBeDefined();
    });

    it("should get the account info", async () => {
      const account = await client.getUserAccountInfo();
      expect(account).toBeDefined();
    });

    it("should get addresses", async () => {
      const addresses = await client.listUserAddresses();
      expect(addresses).toBeDefined();
    });

    it("should get tenant", async () => {
      const tenant = await client.getUserTenant();
      expect(tenant).toBeDefined();
    });

    describe("device", () => {
      let deviceId: DeviceId;
      beforeAll(async () => {
        const devices = await client.listUserDevices();
        if (devices.IDs.length > 0 && devices.IDs[0].id) {
          deviceId = devices.IDs[0].id;
        } else {
          throw new Error("No devices found");
        }
      });

      it("should get device status", async () => {
        const status = await client.getDeviceStatus(deviceId);
        expect(status).toBeDefined();
      });

      it("should get device messages", async () => {
        const messages = await client.listDevicesMessages(deviceId);
        expect(messages).toBeDefined();
      });

      it("should get device water usage", async () => {
        const waterUsage = await client.getDeviceWaterUsage(deviceId);
        expect(waterUsage).toBeDefined();
      });
    });
  });
});
