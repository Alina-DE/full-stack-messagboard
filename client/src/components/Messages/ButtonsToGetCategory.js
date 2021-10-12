import React from 'react'
import { Box, Button } from '@material-ui/core';


export default function ButtonsToGetCategory({ setCategory }) {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            width= "fit-content"
            height= "150px"
            style={{ margin: "20px auto" }}
        >

            {/* Buttons to get messages from particular Category */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setCategory("feedback")}
            >Feedback</Button>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setCategory("question")}
            >Questions</Button>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setCategory("suggestion")}
            >Suggestions</Button>
        </Box>
    )
}