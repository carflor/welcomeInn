import Booking from "./Booking";

class User {
  constructor(id, name, reservations, rooms) {
    this.id = id;
    this.name = name;
    // list of reservations past / present / future
    this.reservations = reservations;
    // list of rooms available for booking
    this.rooms = rooms;
  }

  // MOVED THIS TO MANAGER CLASS
  // bookingHistory() {
  //   // this works if the data is an array of objects
  //   return reservations.filter(reservation => {
  //     return reservation.userID === this.id;
  //   })
  // }

  bookRoom(booking) {
    let bookedRoom = new Booking(booking)
    // instantiate a booking 
    this.reservations.push(bookedRoom)
    // adds a reservations to the array
  }

  unbookRoom() {
    // this should find a booking in the 
    // reservations array and remove it 
    
    // should delete fetch the future reservation
  }
}

export default User;