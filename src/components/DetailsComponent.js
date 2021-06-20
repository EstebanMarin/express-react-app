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
            <h2>Username: {username}</h2>
            <p><strong>Plays: </strong>{plays}</p>
            <p><strong>Friends: </strong>{friends}</p>
            <p><strong>uri: </strong>{uri}</p>
            <p><strong>tracks: </strong>{tracks.length}</p>
        </InnerContainer>
    )
}

export default ShowDetails