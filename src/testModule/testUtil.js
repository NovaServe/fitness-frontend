export async function getTestMessage() {
    const response = await fetch("/api/v1/test", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch test message: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: response.status,
        body: data
    };
};