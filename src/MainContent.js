import React from "react";
import "./styles.css";

function useFetchUsers(/* username */) {
  const [users, setUsers] = React.useState();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  React.useEffect(() => {
    async function fetchUser() {
      try {
        setUsers();
        setError();
        setIsLoading(true);

        const response = await fetch(`/api/test-endpoint`);
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

export default function MainContent() {
  const { users, isLoading, error } = useFetchUsers();
  console.log({
    users,
    isLoading,
    error,
  });

  return (
    <div className="container">
      {users ? (
        <h1>{`Hello ${JSON.stringify(users)}`}</h1>
      ) : (
        <h1>Loading... please wait!</h1>
      )}
    </div>
  );
}
