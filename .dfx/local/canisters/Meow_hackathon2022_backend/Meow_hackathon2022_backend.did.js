export const idlFactory = ({ IDL }) => {
  const Users = IDL.Record({ 'username' : IDL.Text, 'email' : IDL.Text });
  const Votes = IDL.Record({
    'content' : IDL.Text,
    'owner' : IDL.Principal,
    'options' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'CreateAccount' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'allAccounts' : IDL.Func([], [IDL.Vec(Users)], []),
    'allEntries' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, Users))], []),
    'allRooms' : IDL.Func([], [IDL.Vec(IDL.Nat)], []),
    'allroomEntries' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Nat, Votes))], []),
    'allvoteEntries' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(Votes)))],
        [],
      ),
    'clearall' : IDL.Func([IDL.Nat], [], []),
    'createVote' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Text), IDL.Nat],
        [IDL.Opt(Votes)],
        [],
      ),
    'currentResult' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Vec(IDL.Nat)))],
        [IDL.Vec(IDL.Float64)],
        [],
      ),
    'endVote' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Vec(IDL.Float64))], []),
    'isJoined' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'joinVote' : IDL.Func([IDL.Nat, IDL.Vec(IDL.Nat)], [IDL.Text], []),
    'returnRoomID' : IDL.Func([IDL.Nat], [IDL.Opt(Votes)], []),
    'returnVote' : IDL.Func([], [IDL.Opt(IDL.Vec(Votes))], []),
    'returnaccount' : IDL.Func([], [IDL.Opt(Users)], []),
    'test' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(Votes)))],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
