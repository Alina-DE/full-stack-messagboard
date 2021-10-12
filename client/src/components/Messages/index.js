import { useState, useContext, useEffect } from "react";

import CreateMessage from "./CreateMessage";
import ButtonsToGetCategory from "./ButtonsToGetCategory";
import SearchOneMessageById from "./SearchOneMessageById";
import ShowOneMessageById from "./ShowOneMessageById";
import ShowMessagesByCategory from "./ShowMessagesByCategory";

import { AuthContext } from '../../App';
import { Box } from "@material-ui/core";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import axiosApiInstance from "../../util/AxiosInstance";


export default function Messages() {

    // using Context from App.js
    const { user_id } = useContext(AuthContext)

    // all states here - sent as props to components
    const [messages, setMessages] = useState([]);
    const [category, setCategory] = useState("");

    const [oneMessage, setOneMessage] = useState({});
    const [messageId, setMessageId] = useState("");
    const [messageIdDel, setMessageIdDel] = useState("");

    const [message, setMessage] = useState("");

    // get messages by a category
    const getMessages = async () => {
        if (category) {
            try {
                let res = await axiosApiInstance.get(`/message/view-all/${category}`);

                if (res.status === 200) {
                    // console.log(res.data);
                    setMessages(res.data);
                    setMessageId("")
                    setOneMessage({});
                }
            } catch (error) {
                console.log("Error on getting messages :", error.response.statusText);
            }
        }
    }

    useEffect(() => {
        getMessages();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])


    return (
        <Box
            display="flex"
            justifyContent="space-evenly"
            flexWrap="wrap"
            paddingTop="85px"
            id="top"
        >
            {/* LEFT side */}
            <aside style={{ minWidth: "320px", width: "25%", height: "fit-content", borderRadius: "6px", padding: "20px", marginBottom: "10px", background: "white", opacity: "0.85" }}>

                <Box display="flex" justifyContent="space-around">

                    <Box width="fit-content" alignSelf="center">
                        {/* showing user avatar */}
                        <img src={window.localStorage.getItem("avatar")} alt="avatar" width="100"
                        />

                        {/* showing username */}
                        <div style={{ margin: "10px", fontWeight: "bold", textAlign: "center", color: "#303F9F" }}>
                            {window.localStorage.getItem("username")}
                        </div>
                    </Box>

                    <Box>
                        <h3 style={{ textAlign: "center" }}>Channels</h3>

                        {/* Buttons to get messages from particular Category */}
                        <ButtonsToGetCategory setCategory={setCategory} />
                    </Box>
                </Box>


                {/* Search one message by ID */}
                <h3 style={{ textAlign: "center", marginTop: "20px" }}>Find a message</h3>

                <SearchOneMessageById
                    user_id={user_id}
                    setMessages={setMessages}
                    setCategory={setCategory}
                    setMessageIdDel={setMessageIdDel}
                    oneMessage={oneMessage}
                    setOneMessage={setOneMessage}
                    messageId={messageId}
                    setMessageId={setMessageId}
                />
            </aside>

            {/* RIGHT side */}
            <main style={{ minWidth: "320px", width: "60%", height: "fit-content", borderRadius: "6px", padding: "20px", marginBottom: "20px", background: "white", opacity: "0.95" }}>

                <h3 style={{ textAlign: "left", color: "#303F9F" }}>
                    {category ?
                        category[0].toUpperCase() + category.slice(1) + "s"
                        :
                        "General"
                    }
                </h3>

                {/* Form for creating a new message */}
                <CreateMessage category={category} setCategory={setCategory} setMessage={setMessage} user_id={user_id} getMessages={getMessages} />

                {/* Notification message */}
                <Box marginTop="10px" height="30px" color="#ff4081">
                    <h3>{message}</h3>
                </Box>

                {/* Showing messages by category */}
                <div style={{ margin: "0 auto", textAlign: "left" }}>
                    <ShowMessagesByCategory
                        category={category}
                        user_id={user_id}
                        messages={messages}
                        setMessages={setMessages}
                        setOneMessage={setOneMessage}
                        setMessageId={setMessageId}
                        setMessage={setMessage}
                        getMessages={getMessages}
                        bgcolor="gray"
                    />
                </div>

                {/* Showing one message by ID */}
                <ShowOneMessageById
                    user_id={user_id}
                    setMessages={setMessages}
                    category={category}
                    setCategory={setCategory}
                    messageIdDel={messageIdDel}
                    setMessageIdDel={setMessageIdDel}
                    oneMessage={oneMessage}
                    setOneMessage={setOneMessage}
                    setMessageId={setMessageId}
                    setMessage={setMessage}
                    getMessages={getMessages}
                />
            </main>

            <a href="#top" style={{ position: "fixed", right: "15px", bottom: "15px" }}>
                <ArrowUpwardIcon
                    style={{ background: "#F8CB1C", width: "40px", height: "40px", padding: "3px", borderRadius: "50%" }}
                />
            </a>
        </Box>
    )
}