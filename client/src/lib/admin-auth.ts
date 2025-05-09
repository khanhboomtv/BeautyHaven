import { apiRequest } from "./queryClient";

export async function loginAdmin(username: string, password: string): Promise<any> {
    const credentials = btoa(`${username}:${password}`);
    const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${credentials}`
        },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }
}

export function getAuthHeader(username: string, password: string): string {
    const credentials = btoa(`${username}:${password}`);
    return `Basic ${credentials}`;
}
