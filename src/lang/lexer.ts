import { Token, TokenType } from "./token.ts";
import {
  ERR,
  getFileContent,
  isLetter,
  isNumeric,
  isWhitespace,
  LOG,
  WARN,
} from "../util.ts";

const KEYWORDS = [
  "var",
  "const",
  "return",
  "func",
  "int",
  "float",
  "string",
  "if",
  "else",
  "for",
];

export class Lexer {
  public current = "";
  public source = "";
  public index = 1;

  public tokens: Token[] = [];

  public constructor(source: string) {
    this.source = getFileContent(source);
    this.index = 1;
    this.current = this.source[this.index];
  }

  public lex(): Token[] {
    while (this.current != "\0") {
      // Skip comments
      if (this.current === "/" && this.peek() === "/") {
        this.advance();
        continue;
      }

      // Skip whitespace
      if (isWhitespace(this.current)) {
        this.advance();
        continue;
      }

      // Check for string lit
      if (this.current === '"') {
        this.tokens.push(this.lexString());
        this.advance();
        continue;
      }

      if (isLetter(this.current)) {
        this.tokens.push(this.lexIden());
        this.advance();
        continue;
      }

      if (isNumeric(this.current)) {
        this.tokens.push(this.lexNum());
        this.advance();
        continue;
      }

      let singleCharToken: Token = this.lexSingle();
      if (singleCharToken.type != TokenType.TTNone) {
        this.tokens.push(singleCharToken);
        continue;
      }

      ERR("Cannot resolve char: " + this.current);
    }

    return this.tokens;
  }

  private advance() {
    if (this.source.length > this.index) {
      this.index++;
      this.current = this.source[this.index];
    }
  }

  /*
    Peek nth characters ahead of the current char.
    If nth is not specified, return next char
  */
  private peek(nth?: number): string {
    if (nth !== undefined) {
      return this.source[this.index + nth];
    }

    return this.source[this.index + 1];
  }

  private lexString(): Token {
    const strval = "";

    while (this.current != '"') {
      strval.concat(this.current);
      this.advance();
    }

    return new Token(TokenType.TTString, strval);
  }

  private lexIden(): Token {
    const idenval = "";

    while (isLetter(this.current)) {
      idenval.concat(this.current);
      this.advance();
    }

    if (KEYWORDS.includes(idenval)) {
      return new Token(TokenType.TTKeyword, idenval);
    }

    return new Token(TokenType.TTIden, idenval);
  }

  private lexNum(): Token {
    const numvalue = "";
    let dotcount = 0;

    while (isNumeric(this.current) || this.current === ".") {
      if (this.current === ".") {
        dotcount++;
        numvalue.concat(".");
        this.advance();
        continue;
      }

      if (dotcount >= 1) throw new Error();

      numvalue.concat(this.current);
      this.advance();
      continue;
    }

    if (dotcount == 1) return new Token(TokenType.TTFloat, numvalue);

    return new Token(TokenType.TTInt, numvalue);
  }

  private lexSingle(): Token {
    switch (this.current) {
      case "(": {
        this.advance();
        return new Token(TokenType.TTLparen, "(");
      }
      case ")": {
        this.advance();
        return new Token(TokenType.TTRparen, ")");
      }
      case "=": {
        this.advance();
        return new Token(TokenType.TTEq, "=");
      }
      case "+": {
        this.advance();
        return new Token(TokenType.TTAdd, "+");
      }
      case "-": {
        this.advance();
        return new Token(TokenType.TTSub, "-");
      }
      case "/": {
        this.advance();
        return new Token(TokenType.TTDiv, "/");
      }
      case "*": {
        this.advance();
        return new Token(TokenType.TTMul, "*");
      }
      case ";": {
        this.advance();
        return new Token(TokenType.TTSemi, ";");
      }
      default: {
        return new Token(TokenType.TTNone, "");
      }
    }
  }
}
