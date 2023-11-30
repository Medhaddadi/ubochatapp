import {getConnecterUser, triggerNotConnected} from "../lib/session";
import {kv} from "@vercel/kv";
import {db} from "@vercel/postgres";
//const PushNotifications = require("@pusher/push-notifications-server");

export default async (request, response) => {
    try {
        const headers = new Headers(request.headers);
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
        }

        const message  = await request.body;
        console.log("message :", message);
        const client = await db.connect();
        await client.query("insert into messages ( content, created_on, sended_by, sended_to, room_id) values ( $1, $2, $3, $4, $5)", [
            message.content,
            new Date(),
            user.id,
            message.sended_to,
            message.room_id

        ]);
        response.send("OK");
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
};
