import {Avatar, Box, Container, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import {User} from "../model/common";
import {CustomError} from "../model/CustomError";
import {useState} from "react";
import {getAllUsers} from "./UtilisateursApi";
import {useDispatch} from "react-redux";
import {setUser} from "../Redux/Actions/userActions";



function Utilisateurs(onclick: any) {
    const [error, setError] = useState({} as CustomError);
    const [users, setUsers] = useState([] as User[]);

   getAllUsers((result: User[]) => {
        setUsers(result);
    }, (error: CustomError) => {
        setError(error);
    });

    return (
        <Box  width="20%"  overflow="auto"
            sx={{
                backgroundColor:"#f7f7f7",
                width: '30%',
                overflow: 'auto' ,
                padding: 2,
            }}
        >
            <h2>Utilisateurs</h2>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {   users && users.map((user: User) => {
                        return <UserItem key={user.external_id} user={user} onclick={onclick} />
                    })
                }
            </List>
        </Box>
    )
}


function UserItem( {user , onclick} : {user: User ,onclick:any}) {
    const dispatch = useDispatch();

    onclick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(user);
        dispatch(setUser(user));

    }
    return (
        <ListItem onClick={onclick}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.username} secondary={user.last_login} />
        </ListItem>
    )
}

export default Utilisateurs;