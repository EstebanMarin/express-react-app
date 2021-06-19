import React, { useReducer } from "react";
import "./styles.css";

function useFetchUsers(username = "ray_benigno") {
  const [users, setUsers] = React.useState();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  React.useEffect(() => {
    async function fetchUser() {
      try {
        setUsers();
        setError();
        setIsLoading(true);

        const response = await fetch(`/api/users/${username}`);
        const userResponse = await response.json();

        setUsers(userResponse);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { users, isLoading, error };
}

const useFetchUserInfo = user => {
  return user
}

//mocked

const mockInput = "ray_benigno"

const initialState = { count: 0 };


const reducer = (state, action) => {
  switch (action.type) {
    // Implementation of Inmutability
    case 'increment': return Object.assign({}, state, { count: state.count + 1 })
    case 'decrement': return Object.assign({}, state, { count: state.count - 1 })
    default:
      return state
  }
}

export default function MainContent() {
  const { users, isLoading, error } = useFetchUsers(mockInput);
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log({
    users,
    isLoading,
    error,
  });

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>

      <div className="container">
        {users ? (
          <h1>{`Hello ${JSON.stringify(users)}`}</h1>
        ) : (
          <h1>Loading... please wait!</h1>
        )}
      </div>
    </>
  );
}
