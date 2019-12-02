import DummyClass from "../src/singleStorage"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(DummyClass).toBeInstanceOf(DummyClass)
  })
})
