export interface Restaurant {
  id: string
  name: string
  description: string
  address: string
  cuisineType: string
  imageUrl: string
}

export interface TimeSlot {
  id: string
  restaurantId: string
  date: string
  startTime: string
  endTime: string
  totalCapacity: number
  bookedCovers: number
  status: 'free' | 'nearly_full' | 'full'
}

export interface ReservationCreate {
  restaurantId: string
  timeSlotId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  covers: number
}

export interface Reservation {
  id: string
  token: string
  status: 'confirmed' | 'cancelled'
  message: string
  restaurant: {
    id: string
    name: string
  }
  slot: {
    id: string
    date: string
    startTime: string
    endTime: string
  }
  covers: number
  customer: {
    name: string
    email: string
    phone: string
  }
}

export interface ApiError {
  statusCode: number
  message: string
  field?: string
}
