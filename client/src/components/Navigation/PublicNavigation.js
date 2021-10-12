import { Link } from "react-router-dom";
import { Box, Button } from '@material-ui/core';


export default function PublicNavigation() {
    return (
        <>
            <Box width= "fit-content">
                <Button>
                    <Link to="/" style={{ color: "white" }}>Message Board</Link>
                </Button>
            </Box>

            <Box width= "fit-content">
                <Button>
                    <Link to="/register" style={{ color: "white" }}>Register</Link>
                </Button>
                
                <Button>
                    <Link to="/login" style={{ color: "white" }}>Login</Link>
                </Button>
            </Box>
        </>
    );
}