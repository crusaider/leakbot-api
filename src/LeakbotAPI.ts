import { sendAPIReqest } from "./sendAPIRequest";
import { concatPaths } from "./conactPaths";
import {
  ListUserDevicesReponse,
  GetUserAccountInfoResponse,
  ListUserAddressesResponse,
  GetUserTenantResponse,
  DeviceStatusResponse,
  ListDevicesMessagesResponse,
  GetDeviceWaterUsageResponse,
  LoginResponse,
} from "./ReponseTypes";
import { DeviceId } from "./DeviceId";

const API_VERSION = "v1.0";

class LeakbotAPI {
  constructor(private readonly token: string) {}

  private sendRequest<T>(endpointPath: string, body?: Record<string, unknown>) {
    const path = concatPaths(API_VERSION, endpointPath);
    return sendAPIReqest<T>({ path, body, token: this.token });
  }

  listUserDevices(): Promise<ListUserDevicesReponse> {
    return this.sendRequest("/User/Device/MyDeviceList/");
  }

  getUserAccountInfo(): Promise<GetUserAccountInfoResponse> {
    return this.sendRequest("/User/Account/MyRead/");
  }

  listUserAddresses(): Promise<ListUserAddressesResponse> {
    return this.sendRequest("/User/Address/MyRead/");
  }

  getUserTenant(): Promise<GetUserTenantResponse> {
    return this.sendRequest("/User/Tenant/MyView/");
  }

  getDeviceStatus(deviceId: DeviceId): Promise<DeviceStatusResponse> {
    return this.sendRequest("/Device/Device/MyView/", {
      LbDevice_ID: deviceId,
    });
  }

  listDevicesMessages(
    deviceId: DeviceId,
  ): Promise<ListDevicesMessagesResponse> {
    return this.sendRequest("/Device/Device/MyListMessagesForDevice", {
      LbDevice_ID: deviceId,
      fetch_size: 1, // Dont't know how ta paginate, so just fetch one message.
    });
  }

  getDeviceWaterUsage(
    deviceId: DeviceId,
    timeZoneOffset = 60, // Don't really know what other value to use here, any other value seems to return a empty body.
  ): Promise<GetDeviceWaterUsageResponse> {
    return this.sendRequest("/Device/Device/WaterUsage", {
      LbDevice_ID: deviceId,
      timeZoneOffset,
    });
  }
}

function login(options: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  const path = concatPaths(API_VERSION, "/User/Account/MyLogin/");
  return sendAPIReqest({ path, body: options });
}

export async function connect(options: { username: string; password: string }) {
  const { token } = await login(options);
  return new LeakbotAPI(token);
}
