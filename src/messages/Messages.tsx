import {Box, Button, Divider, TextField} from "@mui/material";
import React from "react";
import Utilisateurs from "../users/Utilisateurs";


 function Messages() {
        console.log("Messages");
        return (
            <Box display="flex" height="100vh">
                <Utilisateurs onclick={() => {
                    console.log("click");
                }} />
                <Divider orientation="vertical" flexItem />
                <Box width="60%" display="flex" flexDirection="column">
                    <Box flexGrow={1} overflow="auto">
                        <h2>Messages</h2>
                    </Box>
                    <SendMessageFrom />
                </Box>
            </Box>
        )
}


function SendMessageFrom() {

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        console.log(data.get('message'));
    };
    return (
        <Box component="form" onSubmit={sendMessage} noValidate autoComplete="off" p={1}>
            <TextField
                label="Message"
                fullWidth
                variant="outlined"
                margin="normal"
            />
            <Button variant="contained" color="primary" type="submit">
                Envoyer
            </Button>
        </Box>
    )
}

export default Messages;