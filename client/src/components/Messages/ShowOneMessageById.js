import { Box, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import axiosApiInstance from "../../util/AxiosInstance";


export default function ShowOneMessageById({ user_id, oneMessage, setOneMessage, messageIdDel, setMessageIdDel, setCategory, setMessages, setMessageId, setMessage }) {

    // "delete" a message (not actual delete) :
    const deleteOneMessage = async (event) => {
        event.preventDefault();

        try {
            let res = await axiosApiInstance.put(`/message/delete`, {
                user_id: user_id,
                message_id: messageIdDel,
            });

            if (res.status === 200) {
                setMessage("The message was deleted")

                setTimeout(() => {
                    setMessage("")
                }, 1200);

                setOneMessage({});
                setCategory("");
                setMessages([]);
                setMessageId("");
                setMessageIdDel("")
            }

        } catch (error) {
            console.log("Error on deleting the message :", error.response);
        }
    }


    return (
        <Box>
            {/* Showing one message by ID */}
            {/* Search Result */}
            {oneMessage.content ?
                <>
                    <h2 style={{ padding: "10px", textAlign: "center" }}>Search result :</h2>

                    <Box
                        key={oneMessage._id}
                        textAlign="left"
                        border={1}
                        borderColor="grey.400"
                        borderLeft={0}
                        borderRight={0}
                        p={1.25}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            <Box display="flex">

                                <img src={oneMessage.user_id.avatar} alt="avatar" width="50" height="50" style={{ display: "block", margin: "0 15px 15px 0" }} />

                                <Box>
                                    <div style={{ margin: "6px 0", fontWeight: "bold", color: "#303F9F" }}>{oneMessage.user_id.username}</div>

                                    <div style={{ fontSize: "0.7rem" }}>

                                        {new Date(oneMessage.dates.created).toLocaleString()}
                                    </div>
                                </Box>
                            </Box>

                            <Box style={{ fontSize: "0.7rem", marginBottom: "8px" }}>
                                <strong>ID:</strong> {oneMessage._id}
                            </Box>
                        </Box>

                        <Box>
                            <h4>{oneMessage.category[0].toUpperCase() + oneMessage.category.slice(1)}</h4>

                            <div style={{ marginTop: "15px" }}>{oneMessage.content}</div>
                        </Box>

                        {oneMessage.user_id._id === user_id ?

                            <Box textAlign="right">
                                <Button
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                    style={{ background: "#F8CB1C" }}
                                    type="submit"
                                    onClick={deleteOneMessage}
                                >
                                    Delete
                                </Button>
                            </Box>
                            :
                            null
                        }
                    </Box>
                </>
                :
                null
            }
        </Box>
    )
}