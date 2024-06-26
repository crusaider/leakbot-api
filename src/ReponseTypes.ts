import { ApiResponse } from "./ApiResponse";
import { DeviceId } from "./DeviceId";

type StringBoolean = "0" | "1";
type StringNumber = string;

export interface LoginResponse extends ApiResponse {
  readonly token: string;
  readonly tenant_id: string;
  readonly account_id: string;
  readonly user_role_id: string;
}
export interface ListUserDevicesReponse extends ApiResponse {
  readonly IDs: {
    readonly device_status: string; //"Leak Inactive",
    readonly device_type: string; // "WIFILeakBotV3",
    readonly fw_version: string;
    readonly id: DeviceId;
    readonly leakbotId: string;
    readonly tenant_id: string;
  }[];
}
export interface GetUserAccountInfoResponse extends ApiResponse {
  readonly datapolicies_data_sell_allowed: string;
  readonly emailAllowed: StringBoolean;
  readonly first_name: string;
  readonly home_tel_number: string | null;
  readonly language: string;
  readonly last_name: string;
  readonly mobile_number: string | null;
  readonly phoneAllowed: StringBoolean;
  readonly postAllowed: StringBoolean;
  readonly smsAllowed: StringBoolean;
  readonly tenant: string;
  readonly updated: string;
  readonly username: string;
}
export interface ListUserAddressesResponse extends ApiResponse {
  readonly Addresses: {
    readonly LbDevice_ID: string;
    readonly address_1: string;
    readonly address_2: string;
    readonly address_3: string;
    readonly city: string;
    readonly country: string;
    readonly latitude: string;
    readonly longitude: string;
    readonly postCode: string;
    readonly updated: string;
  }[];
}
export interface GetUserTenantResponse extends ApiResponse {
  readonly code: string;
  readonly emailAllowed: StringBoolean;
  readonly frozen_pipe_feature: StringBoolean;
  readonly frozen_pipe_threshold: string;
  readonly highflow_sms_allowed: StringBoolean;
  readonly install_chasers_frequency: string;
  readonly install_chasers_max: string;
  readonly leak_daysAllowed: StringBoolean;
  readonly leak_days_threshold: string;
  readonly leak_max_reminder: string;
  readonly leak_reminder_fequency: string;
  readonly lost_connection_frequency: string;
  readonly lost_connection_max: string;
  readonly monthly_updatesAllowed: StringBoolean;
  readonly monthly_updates_frequency: string;
  readonly name: string;
  readonly smsAllowed: StringBoolean;
  readonly surveyAllowed: StringBoolean;
  readonly tenant_group_id: string;
  readonly tenant_id: string;
  readonly vacant_property_leak_tests: StringBoolean;
  readonly water_usageAllowed: StringBoolean;
}
export interface DeviceStatusResponse extends ApiResponse {
  readonly battery_sm: string;
  readonly device_status: string;
  readonly device_status_timestamp: string;
  readonly first_name: string;
  readonly message_frequency_sm: string;
  readonly leak_count_summary: {
    readonly leak_free_days: string;
    readonly fix_leak_days: string;
    readonly paused: StringBoolean;
  };
  readonly install_environment: unknown[];
}
export interface ListDevicesMessagesResponse extends ApiResponse {
  readonly LastPage: StringBoolean;
  readonly list: {
    readonly record: {
      readonly event_type: string | null;
      readonly id: string;
      readonly messageTimestamp: string;
      readonly msg_type: string;
    }[];
  };
}
export interface GetDeviceWaterUsageResponse {
  readonly days: {
    readonly details: {
      readonly morning: StringNumber;
      readonly afternoon: StringNumber;
      readonly evening: StringNumber;
      readonly night: StringNumber;
      readonly total: StringNumber;
    };
    readonly dayNumber: StringNumber;
    readonly totalFriendly: string;
    readonly morningFriendly: string;
    readonly afternoonFriendly: string;
    readonly eveningFriendly: string;
    readonly nightFriendly: string;
    readonly offset: StringNumber;
  }[];
  readonly stats: {
    readonly mostActiveDayOfWeek: {
      readonly dayNumber: StringNumber;
      readonly usageCount: StringNumber;
      readonly sampleCount: StringNumber;
      readonly averageUsageCount: StringNumber;
    }[];
    readonly mostActiveTimeOfDay: {
      readonly segmentName: "morning" | "afternoon" | "evening" | "night";
      readonly usageCount: StringNumber;
      readonly sampleCount: StringNumber;
      readonly averageUsageCount: StringNumber;
    }[];
  };
  readonly ts: number;
}
