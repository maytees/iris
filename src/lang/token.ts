export enum TokenType {
  TTNone,
  TTString,
  TTFloat,
  TTInt,
  TTIden,
  TTKeyword,
  TTLparen,
  TTRparen,
  TTEq,
  TTAdd,
  TTSub,
  TTDiv,
  TTMul,
  TTSemi,
}

export class Token {
  public type: TokenType = TokenType.TTNone;
  public value = "";

  public constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }
}
