import { GridTile } from "@/components/GridTile"
import { PregnancyStatus } from "@/components/PregnancyStatus"
import { Clock } from "@/components/Clock"
import { Weather } from "@/components/Weather"
import { Calendar } from "@/components/Calendar"
import { RSSFeed } from "@/components/RSSFeed"
import { MediaGallery } from "@/components/MediaGallery"
import { fetchWeather, fetchCalendarEvents, fetchRSSFeed, formatDate } from "@/lib/api"
import { Suspense } from "react"

export const revalidate = 60 // Revalidate every 60 seconds

function LoadingPlaceholder() {
  return <div className="animate-pulse bg-white/10 rounded-lg h-full w-full" />
}

export default async function Home() {
  // Server-side data fetching
  const [weather, calendarEvents, rssFeed] = await Promise.all([
    fetchWeather(),
    fetchCalendarEvents(),
    fetchRSSFeed()
  ])

  const currentDate = formatDate(new Date())

  return (
    <div className="min-h-screen w-screen p-6 bg-[#f5f5f5] dark:bg-[#1a1a1a] overflow-hidden">
      {/* Main Flex Layout */}
      <div className="flex h-[calc(100dvh-2rem)] gap-4 p-4 bg-gray-50">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Top Row */}
          <Suspense fallback={<LoadingPlaceholder />}>
            <GridTile title="Time & Date" className="mb-4">
              <Clock />
            </GridTile>
          </Suspense>

          <Suspense fallback={<LoadingPlaceholder />}>
            <GridTile title="Weather" className="mb-4">
              <Weather data={weather} />
            </GridTile>
          </Suspense>

          <Suspense fallback={<LoadingPlaceholder />}>
            <GridTile title="Pregnancy Timeline" className="mb-4">
              <PregnancyStatus startDate="2023-09-01" dueDate="2024-06-07" />
            </GridTile>
          </Suspense>

          <Suspense fallback={<LoadingPlaceholder />}>
            <GridTile title="Calendar" className="mb-4">
              <Calendar events={calendarEvents} currentDate={currentDate} />
            </GridTile>
          </Suspense>

          <Suspense fallback={<LoadingPlaceholder />}>
            <GridTile title="News Feed" className="mb-4">
              <RSSFeed items={rssFeed} />
            </GridTile>
          </Suspense>
        </div>

        {/* Right Column */}
        <div className="flex-[2] bg-white rounded-lg shadow-lg p-4 overflow-hidden">
          <Suspense fallback={<LoadingPlaceholder />}>
            <GridTile title="Media Gallery">
              <MediaGallery />
            </GridTile>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
