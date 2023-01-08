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

export enum TokenFamily {
  Op,
}

export class Token {
  public type: TokenType = TokenType.TTNone;
  public strType = "";
  public value = "";
  public family: TokenFamily | null = null;

  public constructor(type: TokenType, value?: string) {
    this.type = type;
    value == undefined ? value = "" : this.value = value;
    this.strType = TokenType[this.type];

    if (
      this.strType === "TTAdd" || this.strType === "TTMul" ||
      this.strType === "TTDiv" || this.strType === "TTSub"
    ) {
      this.family = TokenFamily.Op;
    }
  }
}
