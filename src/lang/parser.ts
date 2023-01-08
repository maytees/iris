import {
  AssignmentType,
  ASTAssignmentNode,
  ASTBinaryNode,
  ASTIdenNode,
  ASTNode,
  ASTNumNode,
  ASTProgramNode,
} from "./ast.ts";
import { ExpectedError } from "./errors.ts";
import { Token, TokenType } from "./token.ts";

export class Parser {
  public tokens: Token[] = [];
  public current_tok: Token;
  public index = 0;
  public programNode: ASTProgramNode;

  public constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.current_tok = this.tokens[0];
    this.programNode = new ASTProgramNode();
  }

  public genAst(): ASTNode[] {
    while (this.index < this.tokens.length) {
      this.programNode.statements.push(this.parseStatement());
    }

    return this.programNode.statements;
  }

  private advance(recur = 1) {
    this.index += recur;

    if (this.index < this.tokens.length) {
      this.current_tok = this.tokens[this.index];
    }
  }

  private parseStatement(): ASTNode {
    if (this.current_tok.type === TokenType.TTKeyword) {
      if (
        this.current_tok.value === "var" || this.current_tok.value === "const"
      ) {
        return this.parseAssignment(
          this.current_tok.value === "var"
            ? AssignmentType.inconstant
            : AssignmentType.constant,
        );
      }
    }

    return this.parseExpression();
  }

  private parseExpression(): ASTNode {
    let left: ASTNode = this.parseTerm();

    while (this.current_tok.value === "+" || this.current_tok.value === "-") {
      const token = this.current_tok;
      this.advance();
      const right: ASTNode = this.parseTerm();
      left = new ASTBinaryNode(left, right, token);
    }

    return left;
  }

  private parseFactor(): ASTNumNode {
    const token = this.current_tok;

    if (token.type === TokenType.TTInt || token.type === TokenType.TTFloat) {
      this.advance();
      return new ASTNumNode(token);
    }

    throw new ExpectedError("Expected something ;/");
  }

  private parseTerm(): ASTNumNode | ASTBinaryNode {
    let left: ASTNumNode = this.parseFactor();

    while (this.current_tok.value === "*" || this.current_tok.value === "/") {
      const token = this.current_tok;
      this.advance();
      const right: ASTNumNode = this.parseFactor();
      left = new ASTBinaryNode(left, right, token);
    }

    return left;
  }

  private parseAssignment(assignmentType: AssignmentType) {
    // Eat var, or const token
    this.advance();
    const iden = new ASTIdenNode(this.current_tok);

    // eat variable iden, and equal sign
    this.advance(2);

    const right = this.parseExpression();

    console.log(this.current_tok);
    return new ASTAssignmentNode(iden, right, assignmentType);
  }
}
