import Booking from "./Booking";

class User {
  constructor(id, name, reservations, rooms) {
    this.id = id;
    this.name = name;
    // list of rooms available for booking
    this.rooms = rooms;
    // list of reservations past / present / future
    this.reservations = reservations;
  }

  bookRoom(booking) {
    let bookedRoom = new Booking(booking)
    // instantiate a booking 
    this.reservations.push(bookedRoom)
    // adds a reservations to the array
  }

  rewardPoints() {
    return this.reservations.reduce((acc, reservation) => {  
      this.rooms.forEach(room => {
        if (reservation.roomNumber === room.number) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0)
  }

  unbookRoom() {
    // this should find a booking in the 
    // reservations array and remove it 
    // should delete fetch the future reservation
  }
}

export default User;