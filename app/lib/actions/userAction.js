"use server"
import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const UpdateUserRole= async(userId, role)=>{

    const data = await auth.api.setRole({
    body: {
        userId, // The user id which you want to set the role for.
        role, // required, The role to set, this can be a string or an array of strings.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
revalidatePath('/dashboard/admin/users')
return data;

}