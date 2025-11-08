import { lastRightPart } from "@servicestack/client"

export const RoomType = {
  Single: "Single",
  Double: "Double",
  Queen: "Queen",
  Twin: "Twin",
  Suite: "Suite"
} as const

export type RoomType = typeof RoomType[keyof typeof RoomType]

export interface Coupon {
  id: string
  discount: number
  description: string
  expiryDate: Date
}

export interface Booking {
  id: number
  name: string
  roomType: RoomType
  roomNumber: number
  cost: number
  bookingStartDate: Date
  bookingEndDate: Date
  createdBy: string
  couponId?: string
  discount?: Coupon
}

export interface Track {
  id: number
  name: string
  artist: string
  album: string
  year: number
}

export interface Forecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

export interface Contact {
  displayName: string
  firstName: string
  lastName: string
  email: string
  profileUrl: string
  skills: string[]
}

export interface FileInfo {
  filePath: string
  fileName: string
  contentType: string
  contentLength: number
}

const getMimeType = (filePath: string): string => {
  const ext = lastRightPart(filePath, '.')
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

export const allContacts: Contact[] = [
  ["Alexis Kirlin", "/profiles/1.jpg"],
  ["Alize Glover", "/profiles/2.jpg"],
  ["Damon Jakubowski", "/profiles/3.jpg"],
  ["Max O'Hara", "/profiles/4.jpg"],
  ["Diego Collier", "/profiles/5.jpg"],
  ["Deanna Williamson", "/profiles/6.jpg"],
  ["Wilfred Wilderman", "/profiles/7.jpg"],
  ["Dillan Dibbert", "/profiles/8.jpg"],
  ["Axel Torphy", "/profiles/9.jpg"],
  ["Eda Ritchie", "/profiles/angelina-litvin-52R7t7x8CPI-unsplash.jpg"],
  ["Teagan Franecki", "/profiles/art-hauntington-jzY0KRJopEI-unsplash.jpg"],
  ["Marilou VonRueden", "/profiles/askar-ulzhabayev-mOnHNBhyjgM-unsplash.jpg"],
  ["Khalil Powlowski", "/profiles/charles-etoroma-95UF6LXe-Lo-unsplash.jpg"],
  ["Hazle Sawayn", "/profiles/christopher-campbell-rDEOVtE7vOs-unsplash.jpg"],
  ["Dale Cremin", "/profiles/de-andre-bush-baeDx6LuSt4-unsplash.jpg"],
  ["Judson Ziemann", "/profiles/engin-akyurt-ljkKZUU6AkQ-unsplash.jpg"],
  ["Estefania Rodriguez", "/profiles/engin-akyurt-UJavPBeDsT8-unsplash.jpg"],
  ["Obie Ferry", "/profiles/hisu-lee-u6LGX2VMOP4-unsplash.jpg"],
  ["Jaquan Prosacco", "/profiles/janko-ferlic-mIs_QHS1ht8-unsplash.jpg"],
  ["Marlene Beahan", "/profiles/joel-mott-LaK153ghdig-unsplash.jpg"],
  ["Rowena Paucek", "/profiles/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg"],
  ["Elvis Tillman", "/profiles/luke-braswell-oYFv-_JKsVk-unsplash.jpg"],
  ["Mabelle Block", "/profiles/mateus-campos-felipe-JoM_lC1WAnE-unsplash.jpg"],
  ["Mia Huels", "/profiles/omid-armin-VS4Bg3tWWcI-unsplash.jpg"],
  ["Dion Jenkins", "/profiles/peter-john-manlapig-KRBHTbLTMDs-unsplash.jpg"],
  ["Buster Block", "/profiles/reza-biazar-eSjmZW97cH8-unsplash.jpg"],
  ["Maggie Trantow", "/profiles/roman-holoschchuk-O-98kcPe0P8-unsplash.jpg"],
  ["Rogers Watsica", "/profiles/takashi-miyazaki-93-nUbomATA-unsplash.jpg"],
].map(c => {
  const displayName = c[0]
  const firstName = displayName.split(' ')[0]
  const lastName = displayName.split(' ')[1]
  const email = `${firstName.toLowerCase()}@${lastName.toLowerCase()}@email.com`
  const profileUrl = 'https://blazor-gallery.servicestack.net' + c[1]
  return { displayName, firstName, lastName, email, profileUrl, skills: ['servicestack', 'react', 'c#'] }
})

const toFile = (filePath: string): FileInfo => ({
  filePath,
  fileName: lastRightPart(filePath, '/'),
  contentType: getMimeType(filePath),
  contentLength: Math.floor(Math.random() * (800000 - 400000) + 400000),
})

export const files: FileInfo[] = allContacts.slice(0, 4).map(c => toFile(c.profileUrl))

const expiryDate = new Date(Date.now() + 30 * 86400000)
const Coupons: Record<string, Coupon> = {
  BOOK10: { id: 'BOOK10', discount: 10, description: '10% Discount', expiryDate },
  BOOK25: { id: 'BOOK25', discount: 25, description: '25% Discount', expiryDate },
  BOOK50: { id: 'BOOK50', discount: 50, description: '50% Discount', expiryDate },
}

let bookingId = 0
function createBooking(
  name: string,
  roomType: RoomType,
  roomNumber: number,
  cost: number,
  createdBy: string,
  couponId?: string
): Booking {
  bookingId++
  const bookingStartDate = new Date(Date.now() + bookingId * 86400000)
  const bookingEndDate = new Date(Date.now() + (bookingId + 7) * 86400000)
  return {
    id: bookingId,
    name,
    roomType,
    roomNumber,
    cost,
    bookingStartDate,
    bookingEndDate,
    createdBy,
    couponId,
    discount: couponId ? Coupons[couponId] : undefined
  }
}

export const bookings: Booking[] = [
  createBooking("First Booking!", RoomType.Queen, 10, 100, "employee@email.com", "BOOK10"),
  createBooking("Booking 2", RoomType.Double, 12, 120, "manager@email.com", "BOOK25"),
  createBooking("Booking the 3rd", RoomType.Suite, 13, 130, "employee@email.com", "BOOK50"),
]

export const forecasts: Forecast[] = [
  { date: "2018-05-06", temperatureC: 1, summary: "Freezing" },
  { date: "2018-05-07", temperatureC: 14, summary: "Bracing" },
  { date: "2018-05-08", temperatureC: -13, summary: "Freezing" },
  { date: "2018-05-09", temperatureC: -16, summary: "Balmy" },
  { date: "2018-05-10", temperatureC: -2, summary: "Chilly" }
].map(({ date, temperatureC, summary }) => ({
  date,
  temperatureC,
  temperatureF: 32 + Math.round(temperatureC / 0.5556),
  summary
}))

let trackId = 0
function createTrack(name: string, artist: string, album: string, year: number): Track {
  return { id: ++trackId, name, artist, album, year }
}

export const tracks: Track[] = [
  createTrack("Everythings Ruined", "Faith No More", "Angel Dust", 1992),
  createTrack("Lightning Crashes", "Live", "Throwing Copper", 1994),
  createTrack("Heart-Shaped Box", "Nirvana", "In Utero", 1993),
  createTrack("Alive", "Pearl Jam", "Ten", 1991),
]

