/**
 * javascript-lib-boilerplate v0.0.2
 * Javascript library boilerplate
 *
 * @author Sergio de la Garza
 * @license MIT
 * @preserve
 */

(function (chai) {
  'use strict';

  const sum = (a, b) => a + b;

  describe("sum", () => {
    it("should return the sum of 2 numbers", () => {
      const a = 5;
      const b = 11;
      const result = sum(a, b);
      chai.expect(result).to.be.equal(a + b);
    });
  });

}(chai));
//# sourceMappingURL=tests.bundle.js.map
