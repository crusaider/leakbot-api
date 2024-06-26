import { LeakbotApiError } from "./LeakbotApiError";
import { sendAPIReqest } from "./sendAPIRequest";

jest.mock("cross-fetch");
import fetch from "cross-fetch";

const { Response } =
  jest.requireActual<typeof import("cross-fetch")>("node-fetch");

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("sendAPIReqest", () => {
  afterEach(() => {
    mockedFetch.mockClear();
  });

  it("should make a POST request with the correct URL and headers", async () => {
    const path = "/test";
    const body = { data: "test" };
    const token = "token123";

    mockedFetch.mockResolvedValueOnce(new Response("{}"));

    await sendAPIReqest({ path, body, token });

    expect(fetch).toHaveBeenCalledWith(
      "https://app.leakbot.io/test",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: "lctoken=token123",
        },
        body: JSON.stringify(body),
      }),
    );
  });

  it("should make a POST request with a empty body object if body is not provided", async () => {
    const path = "/test";

    mockedFetch.mockResolvedValueOnce(new Response("{}"));

    await sendAPIReqest({ path });

    expect(fetch).toHaveBeenCalledWith(
      "https://app.leakbot.io/test",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({}),
      }),
    );
  });

  it("should throw an error if the API request fails", async () => {
    const path = "/test";

    // Mock the fetch function to return a non-ok response
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    } as Response);

    await expect(sendAPIReqest({ path })).rejects.toThrow(
      "API request failed: Internal Server Error",
    );
  });

  it("should throw a LeakbotApiError if the response is an error response", async () => {
    const path = "/test";

    // Mock the fetch function to return an error response
    mockedFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({ error: 500, description: "Internal Server Error" }),
      ),
    );

    await expect(sendAPIReqest({ path })).rejects.toThrow(LeakbotApiError);
  });

  it("should return the response if the request is successful", async () => {
    const path = "/test";
    const response = { data: "test" };

    // Mock the fetch function to return a successful response
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(response),
    } as unknown as Response);

    const result = await sendAPIReqest({ path });

    expect(result).toEqual(response);
  });
});
