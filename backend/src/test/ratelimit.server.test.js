//server based testing
import { beforeEach, jest } from "@jest/globals";
import rateLimiter from "../middleware/rateLimiter";
const req = {}
const res = {}
const next = jest.fn();


res.status = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);

beforeEach( () => {
    jest.clearAllMocks();
});

test("testing the connection", async () => {
    await rateLimiter(req, res, next);
    expect(next).toHaveBeenCalled();             
});
test("testing the ratelimit", async () => {
    for (let i=0;i<100;i++){
        await rateLimiter(req, res, next);
    }
    console.log("blocked calls:", res.status.mock.calls.length);
    //calling 99 times because we sn=ent a call in the last test L:17
    expect(next).toHaveBeenCalledTimes(99);
    await rateLimiter(req, res, next);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(next).not.toHaveBeenCalled();
    
}, 30000);