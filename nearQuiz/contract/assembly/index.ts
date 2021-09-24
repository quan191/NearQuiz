/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging,context, u128, PersistentVector, ContractPromiseBatch, PersistentMap  } from 'near-sdk-as'


import { Questions} from './model';


/****************
 *   STORAGE    *
 ****************/
const QuestionVector = new PersistentVector<Questions>('QuestionVector');
const WinnerListMap = new PersistentMap<u32,Array<string>>('wlm');
const DEFAULT_REWARD: u128 = u128.from("1000000000000000000000000"); // 1 NEAR
/**
 * Adds a new question under the name of the sender's account id.\
 */
export function addQuestion(
  _question: string,
  _choice1: string,
  _choice2: string,
  _answer: i32
): void {
  let id = QuestionVector.length + 1;
  const question = new Questions(id,context.sender,_question,_answer,_choice1,_choice2,DEFAULT_REWARD);
  assert(context.accountBalance >= DEFAULT_REWARD, "You don't have enough near to give reward");
  QuestionVector.push(question);
  logging.log("add question" + question.getQuestion());
}
/**
 * get list question
 */
export function getListQuestion(): Array<Questions> {
  const result = new Array<Questions>(QuestionVector.length);
  for (let i = 0; i < QuestionVector.length; i++) {
        result[i] = QuestionVector[i];
    }
    return result;
}

export function getAuthorByQuestion(_id: u32): string {
  return QuestionVector[_id-1].owner;
}

export function getAnswer(_id: u32): i32 {
  return QuestionVector[_id-1].answer
}
/**
 * add Bounty to contract if u loose
 */
export function addLostBounty(_author: string): void {
  ContractPromiseBatch.create(_author).transfer(DEFAULT_REWARD);

}

export function getWinnerList(_id: u32): Array<string> {
  return WinnerListMap.getSome(_id);
}
/**
 * answer the question
 */
export function answerQuestion(_quest_id: u32, _choice: i32): boolean {

  let author = getAuthorByQuestion(_quest_id);
  assert(context.accountBalance >= DEFAULT_REWARD , "You don't have enough near to play");
  assert(context.sender != author, "You cannot play because you are the author of the question");
  let answer = getAnswer(_quest_id);
  if (_choice == answer) {
    // get reward
    ContractPromiseBatch.create(Context.sender).transfer(DEFAULT_REWARD);
    return true;
  }
  else {
    let author = getAuthorByQuestion(_quest_id);
    ContractPromiseBatch.create(author).transfer(DEFAULT_REWARD);
    return false;
  }
}
