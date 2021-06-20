import styled, { css } from "styled-components";

const InnerContainer = styled.div`
  line-height: 32px;
  font-size: xx-large;
  text-align: center
`

const ShowDetails = props => {
    const { username, plays, friends, tracks, uri } = props
    return (
        <InnerContainer>
            <h2>Username {username}</h2>
            <p>Plays: {plays}</p>
            <p>Friends: {friends}</p>
            <p>uri: {uri}</p>
            <p>tracks: {tracks.length}</p>
        </InnerContainer>
    )
}

export default ShowDetails