import { Token, TokenType } from "./token.ts";
import { ERR, getFileContent, isWhitespace, LOG, WARN, isLetter } from "../util.ts";

const KEYWORDS = [
    "var",
    "const",
    "return",
    "func",
    "int",
    "string",
    "if",
    "else",
    "for",
]

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

      if(isLetter(this.current)) {
        this.tokens.push(this.lexIden());
        this.advance();
        continue;
      }
    }

    return this.tokens;
  }

  private advance() {
    if (this.source.length > this.index) {
      this.index++;
      this.current = this.source[this.index];
    }
  }

  private lexString(): Token {
  }

  private lexIden(): Token {
  }

  private lexNum(): Token {
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
}
