import { Box, Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import axiosApiInstance from '../../util/AxiosInstance';


export default function SearchOneMessageById({ setMessages, setCategory, setMessageIdDel, setOneMessage, messageId, setMessageId }) {

    const [message, setMessage] = useState("");

    // get ONE message my Message ID
    const getOneMessage = async (event) => {
        event.preventDefault();

        try {
            let res = await axiosApiInstance.get(`/message/view-single-message/${messageId}`);

            if (res.status === 200) {
                setOneMessage(res.data);
                setMessages([]);
                setCategory("")
                setMessageIdDel(messageId)
                setMessageId("")
            }

        } catch (error) {
            console.log("Error on getting one message :", error.response.data);

            if (error.response.status === 404) {
                setMessage("Message with this ID was not found")

                setTimeout(() => {
                    setMessage("")
                }, 2000);
            }

            if (error.response.status === 500) {
                setMessage("Incorrect Message ID format!")

                setTimeout(() => {
                    setMessage("")
                }, 2000);
            }
        }
    }

    return (
        // Searching one message by ID

        <form style={{ margin: "20px auto 0", textAlign: "center" }} onSubmit={getOneMessage}>

            <Box>
                <TextField
                    required
                    id="messageId"
                    type="search"
                    label="Message ID"
                    name="messageId"
                    variant="outlined"
                    onChange={(event) => setMessageId(event.target.value)}
                    size="small"
                    value={messageId}
                    inputProps={{ style: { fontSize: 13, width: "200px", padding: "12px 8px" } }}
                />
            </Box>

            <Button
                variant="contained"
                style={{ margin: "10px 0", background: "#F8CB1C" }}
                type="submit"
            >
                Find
            </Button>

            <Box height="20px" color="#ff4081" pt={1}>
                <h5>{message}</h5>
            </Box>
        </form>
    )
}