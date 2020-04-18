class User {
  constructor(reservations, rooms) {
    this.id = id;
    this.name = name;
    this.reservations = reservations;
    this.rooms = rooms;
  }

  bookingHistory() {
    // this works if the data is an array of objects
    return reservations.filter(reservation => {
      return reservation.userID === this.id;
    })
  }

  bookRoom() {
    // should make a POST to update the rooms available
  }

  unbookRoom() {
    // should delete fetch the future reservation
  }
}

export default User;