# Leakbot API

A thin wrapper to communicate with the [**Leakbot**](https://leakbot.io/) service over https.

Should be possible to use this library in both node.js and the browser.

## Credits and inspiration

This library is basically a Typescript implementation of the API layer in the home [assistant leakbot integration](https://github.com/sHedC/homeassistant-leakbot).

## Installation

```bash
npm install @crusaider/leakbot-api
```

## Usage

```typescript
import { connect } from '@crusaider/leakbot-api';

const client = await connect({
  username: '<leakbot user name>',
  password: '<leakbot password>',
});

console.log(await client.listUserDevices());
```

## API

### connect

```typescript
connect(options: {
  username: string;
  password: string;
}): Promise<LeakbotAPI>;
```

### LeakbotClient

```typescript
interface LeakbotAPI {
  listUserDevices(): Promise<ListUserDevicesReponse>;
  getUserAccountInfo(): Promise<GetUserAccountInfoResponse>;
  listUserAddresses(): Promise<ListUserAddressesResponse>;
  getUserTenant(): Promise<GetUserTenantResponse>;
  getDeviceStatus(deviceId: DeviceId): Promise<DeviceStatusResponse>;
  listDevicesMessages(deviceId: DeviceId): Promise<ListDevicesMessagesResponse>;
  getDeviceWaterUsage(
    deviceId: DeviceId,
    timeZoneOffset?: number
  ): Promise<GetDeviceWaterUsageResponse>;
}
```

## Please Read

> :warning: **Leakbot Only Allows One Login:** If you use this library the token your mobile app is connected to becomes invalid and you get logged out. This happens also if you re-log back into the app it invalidates the token for the integration, however the library should automatically re-authenticate.

