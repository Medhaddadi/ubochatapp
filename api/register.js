import { db } from '@vercel/postgres';
import {arrayBufferToBase64, stringToArrayBuffer} from "../lib/base64";

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    try {
        const {username, password,email} = await request.json();
        console.log("email :", email);
        const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(username + password));
        const hashed64 = arrayBufferToBase64(hash);

        const client = await db.connect();
        const {rowCount, rows} = await client.sql`select * from users where username = ${username} or email = ${email}`;
        if (rowCount === 1) {
            const error = {code: "USER ALREADY EXIST", message: "L'utilisateur exist deja "};
            return new Response(JSON.stringify(error), {
                status: 401,
                headers: {'content-type': 'application/json'},
            });
        } else {
            const ext_id = crypto.randomUUID().toString();
            await client.sql`insert into users (username ,password,email,created_on,external_id) values(${username},${hashed64},${email},now(),${ext_id}) `;
            return new Response( JSON.stringify({message: "User created"}), {
                status: 200,
                headers: {'content-type': 'application/json'},
            });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: {'content-type': 'application/json'},
        });
    }
}
