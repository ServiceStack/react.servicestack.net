import { describe, it, expect } from 'vitest'
import { 
  RoomType, 
  bookings, 
  forecasts, 
  tracks, 
  allContacts,
  files 
} from './data'

describe('RoomType', () => {
  it('should have all room types defined', () => {
    expect(RoomType.Single).toBe('Single')
    expect(RoomType.Double).toBe('Double')
    expect(RoomType.Queen).toBe('Queen')
    expect(RoomType.Twin).toBe('Twin')
    expect(RoomType.Suite).toBe('Suite')
  })
})

describe('bookings', () => {
  it('should have 3 bookings', () => {
    expect(bookings).toHaveLength(3)
  })

  it('should have correct booking structure', () => {
    const booking = bookings[0]
    expect(booking).toHaveProperty('id')
    expect(booking).toHaveProperty('name')
    expect(booking).toHaveProperty('roomType')
    expect(booking).toHaveProperty('roomNumber')
    expect(booking).toHaveProperty('cost')
    expect(booking).toHaveProperty('bookingStartDate')
    expect(booking).toHaveProperty('bookingEndDate')
    expect(booking).toHaveProperty('createdBy')
  })

  it('should have valid room types', () => {
    bookings.forEach(booking => {
      expect(Object.values(RoomType)).toContain(booking.roomType)
    })
  })

  it('should have discount coupons applied correctly', () => {
    expect(bookings[0].couponId).toBe('BOOK10')
    expect(bookings[0].discount?.discount).toBe(10)
    
    expect(bookings[1].couponId).toBe('BOOK25')
    expect(bookings[1].discount?.discount).toBe(25)
    
    expect(bookings[2].couponId).toBe('BOOK50')
    expect(bookings[2].discount?.discount).toBe(50)
  })

  it('should have valid dates', () => {
    bookings.forEach(booking => {
      expect(booking.bookingStartDate).toBeInstanceOf(Date)
      expect(booking.bookingEndDate).toBeInstanceOf(Date)
      expect(booking.bookingEndDate.getTime()).toBeGreaterThan(booking.bookingStartDate.getTime())
    })
  })
})

describe('forecasts', () => {
  it('should have 5 forecasts', () => {
    expect(forecasts).toHaveLength(5)
  })

  it('should have correct forecast structure', () => {
    const forecast = forecasts[0]
    expect(forecast).toHaveProperty('date')
    expect(forecast).toHaveProperty('temperatureC')
    expect(forecast).toHaveProperty('temperatureF')
    expect(forecast).toHaveProperty('summary')
  })

  it('should convert Celsius to Fahrenheit correctly', () => {
    forecasts.forEach(forecast => {
      const expectedF = 32 + Math.round(forecast.temperatureC / 0.5556)
      expect(forecast.temperatureF).toBe(expectedF)
    })
  })
})

describe('tracks', () => {
  it('should have 4 tracks', () => {
    expect(tracks).toHaveLength(4)
  })

  it('should have correct track structure', () => {
    const track = tracks[0]
    expect(track).toHaveProperty('id')
    expect(track).toHaveProperty('name')
    expect(track).toHaveProperty('artist')
    expect(track).toHaveProperty('album')
    expect(track).toHaveProperty('year')
  })

  it('should have unique IDs', () => {
    const ids = tracks.map(t => t.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(tracks.length)
  })

  it('should have valid years', () => {
    tracks.forEach(track => {
      expect(track.year).toBeGreaterThan(1900)
      expect(track.year).toBeLessThan(2100)
    })
  })
})

describe('allContacts', () => {
  it('should have 28 contacts', () => {
    expect(allContacts).toHaveLength(28)
  })

  it('should have correct contact structure', () => {
    const contact = allContacts[0]
    expect(contact).toHaveProperty('displayName')
    expect(contact).toHaveProperty('firstName')
    expect(contact).toHaveProperty('lastName')
    expect(contact).toHaveProperty('email')
    expect(contact).toHaveProperty('profileUrl')
    expect(contact).toHaveProperty('skills')
  })

  it('should have valid email format', () => {
    allContacts.forEach(contact => {
      expect(contact.email).toContain('@')
      expect(contact.email).toContain('email.com')
    })
  })

  it('should have skills array', () => {
    allContacts.forEach(contact => {
      expect(Array.isArray(contact.skills)).toBe(true)
      expect(contact.skills).toContain('servicestack')
      expect(contact.skills).toContain('react')
      expect(contact.skills).toContain('c#')
    })
  })

  it('should parse names correctly', () => {
    const contact = allContacts[0]
    expect(contact.displayName).toContain(contact.firstName)
    expect(contact.displayName).toContain(contact.lastName)
  })
})

describe('files', () => {
  it('should have 4 files', () => {
    expect(files).toHaveLength(4)
  })

  it('should have correct file structure', () => {
    const file = files[0]
    expect(file).toHaveProperty('filePath')
    expect(file).toHaveProperty('fileName')
    expect(file).toHaveProperty('contentType')
    expect(file).toHaveProperty('contentLength')
  })

  it('should have valid content types', () => {
    files.forEach(file => {
      expect(file.contentType).toMatch(/^image\//)
    })
  })

  it('should have valid content lengths', () => {
    files.forEach(file => {
      expect(file.contentLength).toBeGreaterThan(0)
      expect(file.contentLength).toBeGreaterThanOrEqual(400000)
      expect(file.contentLength).toBeLessThanOrEqual(800000)
    })
  })

  it('should extract file names from paths', () => {
    files.forEach(file => {
      expect(file.fileName).toBeTruthy()
      expect(file.filePath).toContain(file.fileName)
    })
  })
})

