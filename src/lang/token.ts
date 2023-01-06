export enum TokenType {
    TTNone,
    TTString,
    TTNumber,
    TTIden,
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
    public value: string = "";

    public constructor (type: TokenType, value: string) {
        this.type = type;
        this.value = value;
    }
}