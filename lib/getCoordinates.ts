export async function getCoordinates(lang: string) {
    console.log("getCoordinates");
    try {
        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // fallback for dev

        const res = await fetch(`${baseUrl}/api/coords?lang=${lang}`, {
            cache: "no-store",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch coordinates");
        }

        const data = await res.json();
        console.log(data, "coords response");
        return data; // { longitude, latitude }
    } catch (err) {
        console.log("Error in getCoordinates", err);
        // return { longitude: 67.06662025, latitude: 24.861289 }; // fallback
    }
}