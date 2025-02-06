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
      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 grid-rows-[repeat(8,minmax(0,1fr))] gap-4 h-[calc(100vh-3rem)]">
        {/* Top Row */}
        <Suspense fallback={<LoadingPlaceholder />}>
          <GridTile title="Time & Date" className="col-span-3 row-span-2">
            <Clock />
          </GridTile>
        </Suspense>

        <Suspense fallback={<LoadingPlaceholder />}>
          <GridTile title="Weather" className="col-span-3 row-span-2">
            <Weather data={weather} />
          </GridTile>
        </Suspense>

        <Suspense fallback={<LoadingPlaceholder />}>
          <GridTile title="Pregnancy Timeline" className="col-span-6 row-span-2">
            <PregnancyStatus startDate="2023-09-01" dueDate="2024-06-07" />
          </GridTile>
        </Suspense>

        {/* Middle Rows */}
        <Suspense fallback={<LoadingPlaceholder />}>
          <GridTile title="Calendar" className="col-span-4 row-span-3">
            <Calendar events={calendarEvents} currentDate={currentDate} />
          </GridTile>
        </Suspense>

        <Suspense fallback={<LoadingPlaceholder />}>
          <GridTile title="Media Gallery" className="col-span-8 row-span-3">
            <MediaGallery />
          </GridTile>
        </Suspense>

        {/* Bottom Row */}
        <Suspense fallback={<LoadingPlaceholder />}>
          <GridTile title="News Feed" className="col-span-12 row-span-3">
            <RSSFeed items={rssFeed} />
          </GridTile>
        </Suspense>
      </div>
    </div>
  )
}

