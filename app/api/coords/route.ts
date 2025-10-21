import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    const lang = new URL(req.url).searchParams.get("lang") || "en";

    let coords = (await cookieStore).get("coords")?.value;
    let longitude: number | null = null;
    let latitude: number | null = null;

    if (coords) {
        [longitude, latitude] = JSON.parse(coords);
    }

    if (!longitude || !latitude) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/setting/profile?lang=${lang}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                    credentials: "include",
                    cache: "no-store",
                }
            );

            if (res.ok) {
                const profile = await res.json();
                longitude = profile?.location?.coordinates?.[0];
                latitude = profile?.location?.coordinates?.[1];
            }
        } catch (e) {
            console.error("Error fetching profile", e);
        }
    }

    // ✅ Fallback
    longitude = longitude || 67.06662025;
    latitude = latitude || 24.861289;

    // ✅ Save cookie here (allowed in Route Handlers)
    (await cookies()).set("coords", JSON.stringify([longitude, latitude]), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ longitude, latitude });
}
