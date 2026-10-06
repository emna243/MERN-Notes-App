import { jest } from "@jest/globals";
jest.unstable_mockModule("./../config/upstash.js", () => ({
  default: {
    limit: jest.fn(),
  },
}));
const { default: ratelimit } = await import("./../config/upstash.js");
const { default: rateLimiter } = await import("./../middleware/rateLimiter.js");

function createMockReqRes() {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();
  return { req, res, next };
}
describe("rateLimiter middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test the connection", async () => {
    ratelimit.limit.mockResolvedValue({ success: true });
    const { req, res, next } = createMockReqRes();

    await rateLimiter(req, res, next);

    expect(next).toHaveBeenCalled();
  });
  test("responds 429 when over the limit", async () => {
    ratelimit.limit.mockResolvedValue({ success: false });
    const { req, res, next } = createMockReqRes();

    await rateLimiter(req, res, next);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(next).not.toHaveBeenCalled();
  });
});
