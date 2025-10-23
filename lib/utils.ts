import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(dateInput: Date | string): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
}

type TimingObject = {
  timing: {
    start: string;
    end: string;
  };
  lunchBreak?: {
    start: string;
    end: string;
  };
  days: string[];
};

const daysOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dayShort: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function formatTime(timeStr: string): string {
  // normalize "5 : 5" → "5:5"
  const normalized = timeStr.replace(/\s*:\s*/, ":");
  let [h, m] = normalized.split(":").map((v) => v.trim());
  let hour = parseInt(h, 10);
  let minute = parseInt(m, 10);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${ampm}`;
}

function formatDays(days: string[]): string {
  const sortedDays = [...days].sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  // special case → all 7 days
  if (sortedDays.length === 7) {
    return "Daily";
  }

  let ranges: string[][] = [];
  let temp: string[] = [sortedDays[0]];

  for (let i = 1; i < sortedDays.length; i++) {
    const prevIndex = daysOrder.indexOf(sortedDays[i - 1]);
    const currIndex = daysOrder.indexOf(sortedDays[i]);

    if (currIndex === prevIndex + 1) {
      temp.push(sortedDays[i]);
    } else {
      ranges.push(temp);
      temp = [sortedDays[i]];
    }
  }
  if (temp.length) ranges.push(temp);

  return ranges
    .map((r) =>
      r.length > 1 ? `${dayShort[r[0]]} - ${dayShort[r[r.length - 1]]}` : dayShort[r[0]]
    )
    .join(", ");
}

export function formatTimingObject(data: TimingObject): string {
  const startTime = formatTime(data.timing.start);
  const endTime = formatTime(data.timing.end);
  const daysStr = formatDays(data.days);

  let result = `${daysStr}, ${startTime} - ${endTime}`;

  // if (data.lunchBreak) {
  //   result += ` (Lunch: ${formatTime(data.lunchBreak.start)} - ${formatTime(
  //     data.lunchBreak.end
  //   )})`;
  // }

  return result;
}
export function minutesToReadableTime(minutes: any) {
  if (minutes < 0) {
    throw new Error("Minutes cannot be negative.");
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  // Format HH:MM
  const formattedMins = mins.toString().padStart(2, "0");
  const timeString = `${hours}:${formattedMins}`;

  // Human readable text
  let parts = [];
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }
  if (mins > 0) {
    parts.push(`${mins} min${mins > 1 ? "s" : ""}`);
  }
  const textString = parts.join(" ");

  return textString || "0 minutes";
}
export const pad = (number: any) => {
  return String(number)?.length > 1 ? String(number) : `0${number}`
}
export const sumProductPrices = (productList: { price: number; quantity: number }[]) => {
  return productList.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};


export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const handleRouteWithParams = (route: string, param: any, paramName: string): string => {
  if (param) {
    console.log(param)
    return `${route}?${paramName}=${param}`
  } else {
    return route
  }
}

export const getTotalPrice = (services:any[] = []) => {
  if (!Array.isArray(services)) return 0;
  return services.reduce((sum, item) => sum + (item.price || 0), 0);
};

export const shortAddress = (fullAddress: string): string => {
    if (!fullAddress) return "";

    // Split address by commas and trim spaces
    const parts = fullAddress.split(",").map((p) => p.trim());

    // If we have fewer than 2 parts, return the original
    if (parts.length < 2) return fullAddress;

    // Get last two elements (city, country)
    const country = parts[parts.length - 1];
    const city = parts[parts.length - 2];

    // Return formatted short address
    return `${city}, ${country}`;
};

export const formatDateTime = (date: string, time: string): [string, string] => {
    if (!date || !time) return ["", ""];

    // Parse both into Date objects
    const dateObj = new Date(date);
    const timeObj = new Date(time);

    // Format date: e.g., 27 Oct 2025
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    // Format time: e.g., 13:00 (24-hour format)
    const formattedTime = timeObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return [formattedDate, formattedTime];
};


export const isWithin48Hours = (date: string, time: string): boolean => {
    if (!date || !time) return false;

    try {
        const dateObj = new Date(date);
        const timeObj = new Date(time);

        // Combine date + time into a single Date
        const combined = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            timeObj.getHours(),
            timeObj.getMinutes(),
            timeObj.getSeconds()
        );

        const now = new Date();
        const diffMs = combined.getTime() - now.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        // ✅ Return true if within next 48 hours
        return diffHours > 0 && diffHours < 48;
    } catch (err) {
        return false;
    }
};



// export const formatBookingDate = (isoString: string): string => {
//   if (!isoString) return "";

//   const date = new Date(isoString);
//   const day = date.getUTCDate();
//   const month = months[date.getUTCMonth()];
//   const year = date.getUTCFullYear();

//   return `${day} ${month} ${year}`;
// };
