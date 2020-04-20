import moment from 'moment';

class Manager {
  constructor(reservations, rooms, users, userNow) {
    this.reservations = reservations;
    this.rooms = rooms;
    this.users = users;
    this.userNow = userNow;
  }

  bookRoom() {
    // makes a post with a specific user id to a specific room #
  }

  deleteBooking() {
    deletes a booking post
  }

  currentOccupancy() {
        // provides percentage of occupancy
    // provides rooms that are occupied
  }

  totalRevenue() {
    // calculates cost of room and amount of rooms occupied and gives out a value
    // maybe another add the amount per date

  }

  availableRooms() {
 // provides cards or list of available rooms
    // if no ROOMS available
    // Display "sorry message"
  }

  filterByType() {
    // provides rooms available for a certain type
  }
}

export default Manager;