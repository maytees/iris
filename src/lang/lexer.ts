import { Token, TokenType } from "./token.ts";
import {
  ERR,
  getFileContent,
  isLetter,
  isNumeric,
  isWhitespace,
  LOG,
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
  public index = 0;

  public tokens: Token[] = [];

  public constructor(source: string) {
    this.source = getFileContent(source);
    this.index = 0;
    this.current = this.source[this.index];
  }

  public lex(): Token[] {
    LOG("Running lexer...");

    while (this.index != this.source.length) {
      // Skip comments
      if (this.source.substring(this.index, this.index + 2) === "//") {
        // Linter shows an error saying comparison is unintentional, though it works.
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        while (this.current !== "\n") {
          this.advance();
        }

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
        this.advance();
        this.tokens.push(this.lexString());
        this.advance();
        continue;
      }

      if (isLetter(this.current)) {
        this.tokens.push(this.lexIden());
        continue;
      }

      if (isNumeric(this.current)) {
        this.tokens.push(this.lexNum());
        continue;
      }

      const singleCharToken: Token = this.lexSingle();
      if (singleCharToken.type != TokenType.TTNone) {
        this.tokens.push(singleCharToken);
        this.advance();
        continue;
      }

      ERR("Cannot resolve char: " + this.current + "  idx: " + this.index);
      this.advance();
    }

    return this.tokens;
  }

  private advance() {
    if (this.source.length >= this.index) {
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
    let strval = "";

    while (this.current != '"') {
      strval += this.current;
      this.advance();
    }

    return new Token(TokenType.TTString, strval);
  }

  private lexIden(): Token {
    let idenval = "";

    while (isLetter(this.current)) {
      idenval += this.current;
      this.advance();
    }

    if (KEYWORDS.includes(idenval)) {
      return new Token(TokenType.TTKeyword, idenval);
    }

    return new Token(TokenType.TTIden, idenval);
  }

  private lexNum(): Token {
    let numvalue = "";
    let dotcount = 0;

    while (isNumeric(this.current) || this.current === ".") {
      if (this.current === ".") {
        dotcount++;
        numvalue += ".";
        this.advance();
        continue;
      }

      if (dotcount > 1) {
        ERR("Too many dots!");
        Deno.exit(1);
      }

      numvalue += this.current;
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
      case "{": {
        this.advance();
        return new Token(TokenType.TTLBrace, "{");
      }
      case "}": {
        this.advance();
        return new Token(TokenType.TTRBrace, "}");
      }
      case "[": {
        this.advance();
        return new Token(TokenType.TTLBrack, "[");
      }
      case "]": {
        this.advance();
        return new Token(TokenType.TTRBrack, "]");
      }
      case ">": {
        this.advance();
        return new Token(TokenType.TTGreaterthan, ">");
      }
      case "<": {
        this.advance();
        return new Token(TokenType.TTLessthan, "<");
      }
      default: {
        return new Token(TokenType.TTNone);
      }
    }
  }
}
