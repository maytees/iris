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
  TTRBrace,
  TTLBrace,
  TTGreaterthan,
  TTLessthan,
  TTRBrack,
  TTLBrack,
}

export class Token {
  public type: TokenType = TokenType.TTNone;
  public strType: string = "";
  public value = "";

  public constructor(type: TokenType, value?: string) {
    this.type = type;
    value == undefined ? value = "" : this.value = value;
    this.strType = TokenType[this.type];
  }
}
