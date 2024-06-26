export class LeakbotApiError extends Error {
  constructor(
    public error: number,
    public description: string,
  ) {
    super(`LeakbotApiError: ${error} - ${description}`);
    // This line is needed to restore the correct prototype chain.
    // (see note below)
    Object.setPrototypeOf(this, new.target.prototype);
    // This ensures the name property is set correctly
    this.name = "LeakbotApiError";
  }
}
