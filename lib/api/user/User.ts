// lib/api/user/home.ts
import axios from "axios";

export async function getCategoriesApi(lang: string) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/categories?lang=${lang}`,
        { withCredentials: true }
    );
    return res.data;
}

export type NearestPayload = {
    longitude: number | undefined;
    latitude: number | undefined;
    date: string | undefined;
    time: string | undefined;
    targetGroup?: string[] | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    Service_names?: string[] | undefined;
};

export async function getNearestApi(
    lang: string,
    page: number,
    payload: NearestPayload
) {
    try {

        const formData = new FormData();

        for (const [key, value] of Object.entries(payload)) {
            if (Array.isArray(value)) {
                value.forEach((v) => formData.append(`${key}[]`, v));
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        }

        // Debug: log final FormData
        for (const [k, v] of formData.entries()) {
            console.log("FormData →", k, v);
        }

        const url = `${process.env.API_URL}/api/user/nearest?page=${page}&lang=${lang}`;
        console.log("API CALL:", url, payload);

        const res = await axios.post(url, payload,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        console.log(res, 'resresres')
        return res.data;
    } catch (err) {
        console.log(err, 'errorroror')
    }

}

export async function getMasterDetailApi(lang: string, id: string) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/master-detail/${id}?lang=${lang}`,
        { withCredentials: true }
    );
    return res.data;
}

export async function getProductDetailApi(lang: string, id: string) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/product-detail/${id}?lang=${lang}`,
        { withCredentials: true }
    );
    return res.data;
}

export async function getServiceMasterApi(lang: string, id: string, services: any[]) {
    let api = `${process.env.NEXT_PUBLIC_API_URL}/api/booking/get-booking-appointment?ownerId=${id}&lang=${lang}`
    services.map((a, i) => {
        api += `&serviceIds=${a._id}`
    })
    const res = await axios.get(
        api
        // ,
        // { withCredentials: true }
    );
    return res.data;
}

export async function getBookingSlotApi(lang: string, masterId: string, services: any[], date: string) {
    // 2025-10-07
    let api = `${process.env.NEXT_PUBLIC_API_URL}/api/booking/generate-booking-slots?masterId=${masterId}&date=${date}&lang=${lang}`
    services.map((a, i) => {
        api += `&serviceIds=${a._id}`
    })
    const res = await axios.get(
        api,
        { withCredentials: true }
    );
    return res.data;
}

export async function BookingApi(services: any[], masterId: string, ownerId: string, date: string, time: string, bookingFor: any, guestName: string) {
    // 2025-10-07
    let obj = {
        items: services.map((a, i) => {
            return {
                service: a._id,
                quantity: 1
            }
        }),
        master: masterId,
        owner: ownerId,
        date: date,
        time: time,
        paymentMethod: "Master Card",
        bookingFor: {
            otherThenMyself: bookingFor,
            guestName: guestName
        }
    }
    let formData = new FormData();

    formData.append("master", masterId);
    formData.append("owner", ownerId);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("paymentMethod", "Master Card");
    formData.append("bookingFor[otherThenMyself]", String(bookingFor));
    formData.append("bookingFor[guestName]", guestName);

    // For the items array
    services.forEach((a, i) => {
        formData.append(`items[${i}][service]`, a._id);
        formData.append(`items[${i}][quantity]`, "1");
    });
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/booking/booking-appointment`
    const res = await axios.post(url, formData,
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );
    console.log(res, 'resresres')
    return res.data;
    // items[0][service]: 687a9f391b7324346dab1004
    // items[0][quantity]: 1
    // items[1][service]: 687a9f171b7324346dab0ffd
    // items[1][quantity]: 1
    // master: 689e6f5bc3bc6f61d7a3794a
    // owner: 687a9a4f969574832462833c
    // date: 2025 -09-03
    // time:09: 45
    // paymentMethod:Master card
    // bookingFor[otherThenMyself]: true
    // bookingFor[guestName]:John Doe

    // let api = `${process.env.NEXT_PUBLIC_API_URL}/api/booking/generate-booking-slots?masterId=${masterId}&date=${date}&lang=${lang}`
    // services.map((a, i) => {
    //     api += `&serviceIds=${a._id}`
    // })
    // const res = await axios.get(
    //     api,
    //     { withCredentials: true }
    // );
    // return res.data;
}
// items = [
//     {
//         "product": "68e40d84484ccfdb814c53a7",
//         "quantity": 8
//     }
// ]
export const checkoutProduct = async (products: any[], id?: string) => {
    try {

        const items = products?.map((a) => ({
            product: a._id,
            quantity: a.quantity,
        }));

        const formData = new FormData();

        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        items.forEach((item, index) => {
            Object.entries(item).forEach(([key, value]) => {
                formData.append(`items[${index}][${key}]`, value as any);
            });
        });
        if (id) formData.append('owner', id)
        formData.append('paymentMethod', 'Stripe')
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/checkout`
        const res = await axios.post(url, formData,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        if (res?.data) {
            console.log(res, 'resresres')
            return res?.data
        }
    } catch (err) {
        console.log(err)
    }
};



export const getSaloon = async (id: string, lang: string, lat: string, lng: string) => {
    const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/salon-detail/${id}?lang=${lang}${lat ? `&latitude=${lat}` : ''}${lng ? `&longitude=${lng}` : ''}`
    );

    const res = await axios.get(url.toString());
    const data = await res?.data?.data;
    return data
}

export const toggleBookingNotifcation = async (id: string) => {
    try {
        const formData = new FormData();
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/api/booking/notify-me/${id}`
        );

        const res = await axios.put(url.toString(), formData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
            withCredentials: true,
        });

        if (!res?.data?.success) {
            throw new Error(res?.data?.message || "Something went wrong");
        }

        return res?.data;
    } catch (err: any) {
        const message =
            err?.response?.data?.message || 
            err?.message ||                 
            "Something went wrong";         

        throw new Error(message);
    }
};





export const toggleOrderNotifcation = async (id: string) => {
    try {
        const formData = new FormData();
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/notify-order/${id}`
        );

        const res = await axios.put(url.toString(), formData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
            withCredentials: true,
        });

        if (!res?.data?.success) {
            throw new Error(res?.data?.message || "Something went wrong");
        }

        return res?.data;
    } catch (err: any) {
        const message =
            err?.response?.data?.message || 
            err?.message ||                 
            "Something went wrong";         

        throw new Error(message);
    }
};