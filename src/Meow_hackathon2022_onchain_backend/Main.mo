import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Users "users";
import Votes "votes";
import Hash "mo:base/Hash";
actor {
    public type Users = Users.users;
    public type Votes = Votes.votingroom;

    //users : principal id -> user
    private var users = HashMap.HashMap<Principal, Users>(1,Principal.equal, Principal.hash);
    private stable var usersEntries : [(Principal, Users)] = [];
    private stable var userList : [Users] = [];

    //votes : owner of vote -> vote content
    private var votes = HashMap.HashMap<Principal, [Votes]>(1,Principal.equal, Principal.hash); 
    private stable var votesEntries : [(Principal, [Votes])] = [];
       
    //Room IDs : room id -> vote content
    private var rooms = HashMap.HashMap<Nat, Votes>(1,Nat.equal, Hash.hash);
    private stable var roomIDs : [Nat] = [];
    private stable var roomEntries : [(Nat,Votes)] = [];
    
    //stars : room id -> list of votes acquired
    private var stars = HashMap.HashMap<Nat, [[Nat]]>(1,Nat.equal, Hash.hash);
    private stable var starsEntries : [(Nat,[[Nat]])] = [];
    
    //roomsjoined : principal id -> list of room ids joined
    private var roomjoined = HashMap.HashMap<Principal,[Nat]>(1,Principal.equal,Principal.hash);
    private stable var roomjoinedEntries : [(Principal,[Nat])] = [];

    ////////
    private func usernameAvailable(username : Text) : async Bool {
      for (i in Iter.range(0,userList.size() - 1)) {
        if (userList[i].username == username) {
          return false;
          };
      };
      return true;
    };

    private func emailAvailable(email : Text) : async Bool {
      for (i in Iter.range(0,userList.size() - 1)) {
        if (userList[i].email == email) {
          return false;
        };
      };
      return true;
    };

    public shared ({caller}) func CreateAccount(username : Text, email : Text) : async Text{
      switch(users.get(caller)) {
        case(null){
          var checkusername : Bool = await usernameAvailable(username);
          var checkemail : Bool = await emailAvailable(email);
          if (checkusername == false) {
            return "Username is taken. Please choose a new username.";
          };
          if (checkemail == false) {
            return "Email is taken. Please choose a new email.";
          };
          var newAccount : Users = {
            username = username;
            email = email;
            votes_joined = [];
          };   
          users.put(caller, newAccount);
          userList := Array.append<Users>(userList, [newAccount]);
          usersEntries := Array.append<(Principal, Users)>(usersEntries, [(caller, newAccount)]);
          return "You've successfully create a new account."
        };
        case (_) {
          return ("You've already create your account.");
        };
      };
    };

  public func allAccounts() : async [Users]{return userList;};
  public func allEntries() : async [(Principal, Users)]{return usersEntries;};

  public shared ({caller}) func clearall(roomID : Nat) : async () {
    userList := [];
    usersEntries := [];
    users.delete(caller);
    votes.delete(caller);
    votesEntries := [];
    roomIDs := [];
    rooms.delete(roomID);
    roomEntries := [];
    stars.delete(roomID);
    starsEntries := [];
    roomjoined.delete(caller);
    roomjoinedEntries := [];
  };

  public shared ({caller}) func test() : async [(Principal,[Votes])]{
    return Iter.toArray(votes.entries());
  };
  public shared ({caller}) func returnaccount() : async ?Users{return users.get(caller);};

  public shared ({caller}) func createVote(content : Text, options : [Text], roomID : Nat) : async ?Votes{
    // switch(votes.get(caller)) {
    //   case(null) {
    //     var newVotingRoom : Votes = {
    //       content = content;
    //       options = options;
    //       owner = caller;
    //     };

    //     votes.put(caller, newVotingRoom);
    //     votesEntries := Array.append<(Principal, Votes)>(votesEntries, [(caller, newVotingRoom)]);

    //     rooms.put(roomID, newVotingRoom);
    //     roomIDs := Array.append<Text>(roomIDs, [roomID]);
    //     roomEntries := Array.append<(Text, Votes)>(roomEntries, [(roomID, newVotingRoom)]);

    //     return ?newVotingRoom;
    //   };
    //   case(_) 
    //     return votes.get(caller);
    //   };
    // };
    if (rooms.get(roomID) != null) {
      return null;
    };
    var newVotingRoom : Votes = {
      content = content;
      options = options;
      owner = caller;
    };

    rooms.put(roomID,newVotingRoom);
    roomIDs := Array.append(roomIDs,[roomID]);
    roomEntries := Array.append(roomEntries,[(roomID,newVotingRoom)]);

    var temp = votes.get(caller);
    switch(temp){
      case(null){
        votes.put(caller,[newVotingRoom]);
        votesEntries := Array.append(votesEntries,[(caller,[newVotingRoom])]);
      };
      case(?temp){
        var new = temp;
        new := Array.append(new,[newVotingRoom]);
        votes.put(caller,new);
        votesEntries := Array.append(votesEntries, [(caller, new)]);
      };
    };
    return ?newVotingRoom;
  };
  public func allvoteEntries() : async [(Principal,[Votes])] {return votesEntries;};
  public func allRooms() : async [Nat] {return roomIDs;};
  public func allroomEntries() : async [(Nat, Votes)]{return roomEntries;};
  public shared ({caller}) func returnVote() : async ?[Votes]{return votes.get(caller);};
  public func returnRoomID(roomID : Nat) : async ?Votes{return rooms.get(roomID);};

  public shared ({caller}) func isJoined(roomID : Nat) : async Bool{
    var temp = roomjoined.get(caller);
    switch(temp){
      case(null){
        return false;
      };
      case(?temp){
        for (i in Iter.range(0, temp.size() - 1)){
          if (temp[i] == roomID){
            return true;
          };
        };
        return false;
      };
    };
  };

  public func currentResult(lst : ?[[Nat]]) : async [Float]{
    switch(lst){
      case null return [];
      case (?lst){
        var sizeofvotes = lst[0].size();
        var result : [Float] = [];
        var sum = 0;
        for (i in Iter.range(0,sizeofvotes - 1)){
          sum := 0;
          for (j in Iter.range(0,lst.size() - 1)){
            sum += lst[j][i];
          };
          result := Array.append(result,[Float.fromInt(sum) / Float.fromInt(lst.size())]);
        };
      return result;
      };
      };
    };
    
  
  public shared ({caller}) func endVote(roomID : Nat) : async ?[Float]{
    var temp = rooms.get(roomID);
    switch(temp){
      case(null){return null;};
      case(?temp){
        var new = stars.get(roomID);
        switch(new){
          case(null){return null;};
          case(?new){return ?(await currentResult(?new));};
        };
      };
    };
  };
  public shared ({caller}) func joinVote(roomID : Nat, stars_voted : [Nat]) : async Text{
    if ((await isJoined(roomID)) == true){return "You have joined this room."};
    var roomchosen : ?Votes = rooms.get(roomID);
    switch (roomchosen) {
      case (?roomchosen) {
        var nums = roomchosen.options.size();
        if (stars_voted.size() != nums){return "Vote for all the options on a scale of 1 to 5."};
        for (i in Iter.range(0,stars_voted.size() - 1)){
          if (stars_voted[i] > 5) {return "Vote from a scale from 1 to 5."};
          if (stars_voted[i] < 1) {return "Vote from a scale from 1 to 5."};
        };
        var temp = stars.get(roomID);
        switch(temp){
          case(null){
            stars.put(roomID,[stars_voted]);
          };
          case(?temp){
            var new = temp;
            new := Array.append(new,[stars_voted]);
            stars.put(roomID,new);
          };
        };

        var temp_ = roomjoined.get(caller);
        switch (temp_){
          case(null){
            roomjoined.put(caller,[roomID]);
          };
          case(?temp_) {
            var new = temp_;
            new := Array.append(new,[roomID]);
            roomjoined.put(caller,new);
          };
        };

        return "You have successfully voted.";
      };
      case (null) {
        return "Room ID not available.";
      };
    };
  };
  // public shared ({caller}) func returnVotesFor(roomID : Text) : async
  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
    votesEntries := Iter.toArray(votes.entries());
    roomEntries := Iter.toArray(rooms.entries());
    starsEntries := Iter.toArray(stars.entries());
  };

  system func postupgrade() {
    type Users = Users.users;
    type Votes = Votes.votingroom;

    users := HashMap.fromIter<Principal, Users>(usersEntries.vals(), 1, Principal.equal, Principal.hash);
    usersEntries := [];

    votes := HashMap.fromIter<Principal, [Votes]>(votesEntries.vals(), 1, Principal.equal, Principal.hash);
    votesEntries := [];

    rooms := HashMap.fromIter<Nat, Votes>(roomEntries.vals(), 1,Nat.equal, Hash.hash);
    roomEntries := [];

    stars := HashMap.fromIter<Nat, [[Nat]]>(starsEntries.vals(), 1, Nat.equal, Hash.hash);
    starsEntries := [];

  };


};
