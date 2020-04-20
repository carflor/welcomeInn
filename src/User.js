class User {
  constructor(reservations, rooms) {
    this.id = id;
    this.name = name;
    this.reservations = reservations;
    this.rooms = rooms;
  }

  bookingHistory() {
    // reservations should be transformed into arr of obj specific 
    // to the id for user
    // iterates over bookings arrray and returns objects that 
    // match userID with this.id
  }

  bookRoom() {
    // should make a POST to update the rooms available

  }

  unbookRoom() {

  }
}

export default User;