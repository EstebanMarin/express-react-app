import axios from "axios"
import {
    isUserPlay,
    onlyUnique,
    URIFactory,
} from "../predicates"

class TwilioService {
    constructor(friendsURL, playURL) {
        this.friendsURL = friendsURL
        this.playURL = playURL
    }

    generatePromises(username) {
        const allUserFriendsPromise = axios.get(`${this.friendsURL.listAll}`)
        const userFriendsDetailsPromise = axios.get(`${this.friendsURL.detailUserName}${username}`)
        const allUsersPlayInfoPromise = axios.get(`${this.playURL.listAllUsers}`)
        const userNamePlayDetailsPromise = axios.get(`${this.playURL.detailUserName}${username}`)

        return [
            allUserFriendsPromise,
            userFriendsDetailsPromise,
            allUsersPlayInfoPromise,
            userNamePlayDetailsPromise
        ]
    }

    generateError(username) {
        return { error: `no ${username} in our databases` }
    }

    generateBody(result, username) {
        const dataCleanup = answer => answer?.value?.data
        const [
            allUserFriends,
            userFriendsDetails,
            allUsersPlayInfo,
            userNamePlayDetails
        ] = result.map(dataCleanup)


        return {
            username,
            friends: userFriendsDetails.friends.length,
            plays: allUsersPlayInfo.plays.filter(isUserPlay(username)).length,
            tracks: userNamePlayDetails.plays.filter(onlyUnique),
            uri: URIFactory(username)
        }
    }

}


export default TwilioService