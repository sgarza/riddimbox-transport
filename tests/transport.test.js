import { Transport, constants } from "../src/index";
const { TRANSPORT_SARTED } = constants;

describe("Transport", () => {
  it("should start the transport", () => {
    Transport.start();
    expect(Transport.state).toBe(TRANSPORT_SARTED);
  });
});
