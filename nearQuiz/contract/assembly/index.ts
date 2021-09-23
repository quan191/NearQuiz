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

import { Context, logging, storage,context, u128, PersistentVector, ContractPromiseBatch, PersistentMap  } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const account_id = Context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}

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
  _choice: Array<string>,
  _answer: i32
): void {
  let id = QuestionVector.length + 1;
  const question = new Questions(id,context.sender,_question,_answer,_choice,DEFAULT_REWARD);
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
  return QuestionVector[_id].owner;
}

export function getAnswer(_id: u32): i32 {
  return QuestionVector[_id].answer
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
export function answerQuestion(_quest_id: u32, _choice: i32): void {
  assert(QuestionVector[_quest_id].reward > DEFAULT_REWARD, "Cannot answer this question");
  assert(getWinnerList(_quest_id).includes(context.sender)!=true, "YOu have already answer the question");

  let author = getAuthorByQuestion(_quest_id);
  assert(context.accountBalance >= DEFAULT_REWARD , "You don't have enough near to play");
  assert(context.sender != author, "You cannot play because you are the author of the question");
  let answer = getAnswer(_quest_id);
  if (_choice == answer) {
    // get reward
    WinnerListMap.getSome(_quest_id).push(context.sender);
  }
  else {
    addLostBounty(author);
  }
}
