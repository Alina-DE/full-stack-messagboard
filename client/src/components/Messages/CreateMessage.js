import { useState } from "react";
import axiosApiInstance from '../../util/AxiosInstance';
import { Box, Button, TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function CreateMessage({ category, setCategory, setMessage, user_id, getMessages }) {

    const [content, setContent] = useState("");
    const [categoryPost, setCategoryPost] = useState("feedback");

    // Create a new message
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axiosApiInstance.post("/message/create", {
                user_id: user_id,
                content: content,
                category: categoryPost
            })

            if (res.status === 200) {
                setMessage("The message was successfully added!");

                setTimeout(() => {
                    setMessage("");
                }, 2000);

                setContent("")
                setCategory(categoryPost)
                getMessages()
            }
        } catch (error) {
            // console.log("Error on creating a message :", error.response.data);
            setMessage(error.response.data)

            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
    };
    

    return (
        <>
            {/* Form for creating a new message */}
            <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>

                <TextField
                    required
                    name='content'
                    id="outlined-multiline-static"
                    label="Create a new Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    style={{ margin: "10px 0 20px" }}
                />

                <Box display="flex" justifyContent="space-between">

                    <FormControl
                        component="fieldset"
                        onChange={(event) => setCategoryPost(event.target.value)}
                        style={{ height: "fit-content" }}
                    >
                        <RadioGroup row aria-label="category" name="category" defaultValue="feedback"
                        >
                            <FormControlLabel
                                value="feedback"
                                control={<Radio color="primary" />}
                                label="Feedback"
                            />

                            <FormControlLabel
                                value="question"
                                control={<Radio color="primary" />}
                                label="Question"
                            />

                            <FormControlLabel
                                value="suggestion"
                                control={<Radio color="primary" />}
                                label="Suggestion"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        variant="contained"
                        style={{ margin: "5px 15px", background: "#F8CB1C", fontWeight: "bold", minWidth: "150px", height: "40px", whiteSpace: "nowrap" }}
                        type="submit"
                    >
                        Post Message
                    </Button>
                </Box>
            </form>
        </>
    )
}