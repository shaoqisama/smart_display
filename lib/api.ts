import { format } from "date-fns"

export async function fetchWeather() {
  // Mock weather data instead of API call
  return {
    temperature: 22,
    description: "partly cloudy",
    humidity: 65,
    windSpeed: 12,
  }
}

// Rest of the file remains the same
export async function fetchCalendarEvents() {
  // Mock calendar events (already mocked)
  return [
    { time: "09:00", event: "Morning Meditation" },
    { time: "11:00", event: "Prenatal Checkup" },
    { time: "14:00", event: "Virtual Yoga Class" },
    { time: "16:00", event: "Baby Shopping" },
  ]
}

export async function fetchRSSFeed() {
  // Mock RSS feed (already mocked)
  return [
    { title: "New study reveals benefits of prenatal yoga" },
    { title: "Top 10 foods for a healthy pregnancy" },
    { title: "Breakthrough in non-invasive prenatal testing" },
  ]
}

export function formatDate(date: Date) {
  return format(date, "EEEE, MMMM do")
}

