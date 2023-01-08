import { Token } from "./token.ts";

export enum ASTNodeType {
  Program,
  BinaryNode,
  NumNode,
  AssignmentNode,
  None,
  IdenNode,
}

export class ASTNode {
  public type: ASTNodeType;
  public strType: string;
  public left: ASTNode | null;
  public right: ASTNode | null;
  // deno-lint-ignore no-explicit-any
  public value: any;

  // deno-lint-ignore no-explicit-any
  public constructor(type: ASTNodeType, value?: any) {
    this.type = type;
    this.strType = ASTNodeType[this.type];
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

export class ASTProgramNode extends ASTNode {
  public statements: ASTNode[] = [];

  public constructor() {
    super(ASTNodeType.Program);
  }
}

export class ASTNumNode extends ASTNode {
  public constructor(value: Token) {
    super(ASTNodeType.NumNode);
    this.right = null;
    this.left = null;
    this.value = value;
  }
}

export class ASTIdenNode extends ASTNode {
  public constructor(value: Token) {
    super(ASTNodeType.IdenNode);
    this.right = null;
    this.left = null;
    this.value = value;
  }
}

export class ASTBinaryNode extends ASTNode {
  public constructor(left: ASTNode, right: ASTNode, op: Token) {
    super(ASTNodeType.BinaryNode);

    this.left = left;
    this.right = right;
    this.value = op;
  }
}

export enum AssignmentType {
  inconstant,
  constant,
}

export class ASTAssignmentNode extends ASTNode {
  public assignemntType: AssignmentType;
  public strAssignmentType: string;

  public constructor(
    iden: ASTIdenNode,
    value: ASTNode,
    assignmentType: AssignmentType,
  ) {
    super(ASTNodeType.AssignmentNode);
    this.assignemntType = assignmentType;
    this.strAssignmentType = AssignmentType[this.assignemntType];
    this.left = iden;
    this.right = value;
    this.value = this.left;
  }
}
