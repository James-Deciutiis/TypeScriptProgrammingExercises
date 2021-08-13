// 1. Design a way to handle erros for the following API.
// A:
type UserID = {
    userID: string
    friendList: UserID[]
    userName: string
}

class User implements UserID{
    userID: string
    friendList: UserID[]
    userName: string

    constructor(userid: string, friends: UserID[], username: string){
        this.userID = userid
        this.friendList = friends
        this.userName = username
    }
}

class API {
    loggedInUser: UserID | null
    constructor(user: UserID){
        this.loggedInUser = user
    }

    getLoggedInUserID(): UserID{
        if(this.loggedInUser){
            return this.loggedInUser
        }

        throw Error("User never logged in")
    }

    getFriendIDs(userID: UserID): UserID[]{
        if(this.loggedInUser){
            return userID.friendList
        }

        throw Error("User never logged in")
    }

    getUserName(userID: UserID): string{
        if(this.loggedInUser){
            return userID.userName
        }

        throw Error("User never logged in")
    }
}

let api = new API(new User('d1bi12dqx' , [], 'person'))
//api.loggedInUser = null --> uncomment to see error being thrown

try{
    let user = api.getLoggedInUserID()
    let username = api.getUserName(user)
    let friends = api.getFriendIDs(user)
    friends.push(new User('dqwc23c245', [], 'person2'))
    console.log(username.toUpperCase())
}
catch(e){
    console.log(e)
}
