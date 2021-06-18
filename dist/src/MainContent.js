"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./styles.css");
function useFetchUsers( /* username */) {
    const [users, setUsers] = react_1.default.useState();
    const [error, setError] = react_1.default.useState();
    const [isLoading, setIsLoading] = react_1.default.useState();
    react_1.default.useEffect(() => {
        async function fetchUser() {
            try {
                setUsers();
                setError();
                setIsLoading(true);
                const response = await fetch(`/api/test-endpoint`);
                const userResponse = await response.json();
                setUsers(userResponse);
            }
            catch (err) {
                console.error(err);
                setError(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchUser();
    }, []);
    return { users, isLoading, error };
}
function MainContent() {
    const { users, isLoading, error } = useFetchUsers();
    console.log({
        users,
        isLoading,
        error
    });
    return (<div className="container">
      {users ? (<h1>{`Hello ${JSON.stringify(users)}`}</h1>) : (<h1>Loading... please wait!</h1>)}
    </div>);
}
exports.default = MainContent;
//# sourceMappingURL=MainContent.js.map