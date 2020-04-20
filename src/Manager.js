import moment from 'moment';
import Booking from './Booking';

class Manager {
  constructor(users, rooms, reservations, date) {
    this.users = users;
    this.rooms = rooms;
    this.reservations = reservations;
    this.date = date;
  }
  // THESE METHODS WILL NEED TO REFER TO INDEX ZERO TO BE ABLE TO REACH NESTED DATA!!!!!!!!!!

  bookingHistoryById(userId, reservations) {
    return reservations[0].filter(reservation => {
      return reservation.userID === userId
    })
  }

  getReservationsByDate(date) {    
    return this.reservations.filter(booking => booking.date === date)
  }

  bookRoom(booking) {
    // reservation is an obj that contains date / userId / room Number
    // when would this affect the DOM?
    this.reservations.push(booking)
  }

  currentOccupancy(date) {
    let unavailableRooms = this.getReservationsByDate(date)
    let occupancyPercent = (unavailableRooms.length / this.rooms.length) * 100
    return occupancyPercent
  }

  totalRevenue(date) {
    let roomNums = this.reservations.filter(reservation => reservation.date === date).map(reservation => reservation.roomNumber)
    let revenueToday = roomNums.reduce((acc, roomNum) => {
      acc += this.rooms.find(room => room.number === roomNum).costPerNight
      return acc
    }, 0);
    return revenueToday
  }

  // might be a dom method
  displayAvailableRooms(date) {
    let booked = this.getReservationsByDate(date) 
    let unbooked = this.rooms.map(room => room.number).filter(num => !booked.includes(num))
    // message for no rooms available
    // when does this trigger a dom change
    if (unbooked.length === 0) {
      unbooked = "We are very sorry, but we currently have no rooms available for that day! "
    }
    return unbooked
  }

  filterByType(roomType) {
    return this.rooms.filter(room => room.roomType === roomType)
  }

  deleteBooking() {
    // deletes a booking post
    // should trigger fetch delete request by booking randomized id 
  }
}

export default Manager;