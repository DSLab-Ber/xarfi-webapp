// lib/salonQueries.ts
import axios from "axios"

export const salonKeys = {
  all: ["salons"] as const,
  list: (lang: string, filters: Record<string, any> = {}) =>
    [...salonKeys.all, lang, JSON.stringify(filters)] as const, // stringify filters for key
}

export const salonQueries = {
  list: (lang: string, filters: Record<string, any> = {}) => ({
    queryKey: salonKeys.list(lang, filters),
    queryFn: async () => {
      let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/api/user/nearest?lang=${lang}`

      // Append filters only if they have values
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          // If array, join with comma
          if (Array.isArray(value)) {
            apiURL += `&${key}=${value.join(",")}`
          } else {
            if (value) {
              apiURL += `&${key}=${value}`
            }
          }
        }
      })

      const res = await axios.get(apiURL)
      return res.data.data // expects { salons, pagination }
    },
  }),
}
