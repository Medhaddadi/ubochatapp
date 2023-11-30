import { ErrorCallback, User} from "../model/common";
import {CustomError} from "../model/CustomError";

type Callback = (data: any) => void;
export function registerUser(user: User, onResult:Callback, onError: ErrorCallback) {
    fetch("/api/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then( (response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(error => {
                    throw new Error(error.message || 'Server error');
                });
            }
        })
        .then(data => {
            onResult(data);

        }).catch(error => {
            onError(new CustomError(error));
        }
    );

}