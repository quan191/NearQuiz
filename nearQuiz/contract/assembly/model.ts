import { context, u128} from "near-sdk-as";
@nearBindgen
export class Questions {
  id: i32;
  owner: string;
  question: string;
  answer: i32;
  choice1: string;
  choice2: string;
  reward: u128;

  constructor(
    _id: i32,
    _owner: string,
    _question: string,
    _answer: i32,
    _choice1: string,
    _choice2: string,
    _reward: u128
  ) {
    this.id = _id;
    this.owner = _owner;
    this.question = _question;
    this.answer = _answer;
    this.choice1 = _choice1;
    this.choice2 = _choice2;
    this.reward = _reward;
  }

  public getQuestion(): string {
    return `${this.question}`
  }

  public getChoiceDetails(): Array<string>{
    return `${this.choice}`;
  }

  public getAnswer(): i32{
    return this.answer;
  }
}
