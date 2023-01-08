export class ExpectedError extends Error {
  public constructor(message: string) {
    const msg =
      "Unexpected Erorr, something that you wrote was unexpected..  " +
      message;
    super(msg);
  }
}

export class UnknownOperatorErorr extends Error {
  public constructor(message: string) {
    const msg = "Unkown operator: " + message;
    super(msg);
  }
}
