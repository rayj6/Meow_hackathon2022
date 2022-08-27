import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Users { 'username' : string, 'email' : string }
export interface Votes {
  'content' : string,
  'owner' : Principal,
  'options' : Array<string>,
}
export interface _SERVICE {
  'CreateAccount' : ActorMethod<[string, string], string>,
  'allAccounts' : ActorMethod<[], Array<Users>>,
  'allEntries' : ActorMethod<[], Array<[Principal, Users]>>,
  'allRooms' : ActorMethod<[], Array<bigint>>,
  'allroomEntries' : ActorMethod<[], Array<[bigint, Votes]>>,
  'allvoteEntries' : ActorMethod<[], Array<[Principal, Array<Votes>]>>,
  'clearall' : ActorMethod<[bigint], undefined>,
  'createVote' : ActorMethod<[string, Array<string>, bigint], [] | [Votes]>,
  'currentResult' : ActorMethod<[[] | [Array<Array<bigint>>]], Array<number>>,
  'endVote' : ActorMethod<[bigint], [] | [Array<number>]>,
  'isJoined' : ActorMethod<[bigint], boolean>,
  'joinVote' : ActorMethod<[bigint, Array<bigint>], string>,
  'returnRoomID' : ActorMethod<[bigint], [] | [Votes]>,
  'returnVote' : ActorMethod<[], [] | [Array<Votes>]>,
  'returnaccount' : ActorMethod<[], [] | [Users]>,
  'test' : ActorMethod<[], Array<[Principal, Array<Votes>]>>,
}
