import { useState } from "react";
import axiosApiInstance from '../../util/AxiosInstance';
import { Box, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ShowMessagesByCategory({ category, user_id, messages, setOneMessage, setMessageId, setMessage, getMessages}) {

    const [messageIdDel, setMessageIdDel] = useState("");

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

                setOneMessage("");
                setMessageId("")
                getMessages()
            }
        } catch (error) {
            console.log("Error on deleting the message :", error.response);
        }
    }

    return (
        <>
            {/* Showing messages by category */}
            {category ?
                <Box>
                    {messages.map(item => (
                        <Box
                            key={item._id}
                            borderTop={1}
                            borderColor="grey.400"
                            p={1.25}
                            style={{ margin: "15px auto" }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                flexWrap="wrap"
                            >
                                <Box display="flex">
                                    <img src={item.user_id.avatar} alt="avatar" width="50" height="50" style={{ display: "block", margin: "0 15px 15px 0" }} />

                                    <Box>
                                        <div style={{ margin: "6px 0", fontWeight: "bold", color: "#303F9F" }}>
                                            {item.user_id.username}
                                        </div>

                                        <div style={{ fontSize: "0.7rem" }}>
                                            {new Date(item.dates.created).toLocaleString()}
                                        </div>
                                    </Box>
                                </Box>

                                <Box style={{ fontSize: "0.7rem", marginBottom: "8px" }}>
                                    <strong>ID:</strong> {item._id}
                                </Box>
                            </Box>

                            <Box>
                                <h4>{item.category[0].toUpperCase() + item.category.slice(1)}</h4>

                                <div style={{ marginTop: "15px" }}>{item.content}</div>
                            </Box>

                            {/* Delete Button if the message's author is the logged in user */}
                            {item.user_id._id === user_id ?
                                <Box textAlign="right">
                                    <input
                                        type="checkbox"
                                        checked={messageIdDel === item._id ? true : false}
                                        onChange={() =>
                                            messageIdDel !== item._id ?
                                                setMessageIdDel(item._id)
                                                :
                                                setMessageIdDel("")}
                                    />

                                    <Button
                                        variant="contained"
                                        startIcon={<DeleteIcon />}
                                        style={{ margin: "5px ", background: "#F8CB1C" }}
                                        disabled={messageIdDel !== item._id ? true : false}
                                        type="submit"
                                        onClick={deleteOneMessage}
                                    >
                                        Delete
                                    </Button>
                                </Box>

                                :
                                null
                            }
                        </Box>))}
                </Box>
                :
                null
            }
        </>
    )
}