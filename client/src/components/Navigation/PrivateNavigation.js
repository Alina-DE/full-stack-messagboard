import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Button } from '@material-ui/core';

import { AuthContext } from "../../App";


export default function PrivateNavigation() {

    const { handleLogin } = useContext(AuthContext);

    const history = useHistory();

    // Logout
    const HandleLogout = () => {
        handleLogin(false, null, null);
        window.localStorage.clear();
        history.push("/")
    }

    return (
        <>
            <Box width="fit-content">
                <Button>
                    <Link to="/" style={{ color: "white" }}
                        onClick={() => window.location.reload()}
                    >Message Board</Link>
                </Button>
            </Box>

            <Box width="fit-content">
                <Button
                    onClick={HandleLogout}
                    variant="contained" color="secondary"
                >
                    Logout
                </Button>
            </Box>
        </>
    );
}