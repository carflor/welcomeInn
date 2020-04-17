class ApiController {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/overlook/1904"
  }

  getUsersData() {
    let url = `${this.rootUrl}/users/users`
    return fetch(url).then(response => response.json());
  }

  getRoomData() {
    let url = `${this.rootUrl}/rooms/rooms`
    return fetch(url).then(response => response.json());
  }

  getReservationData() {
    let url = `${this.rootUrl}/bookings/bookings`
    return fetch(url).then(response => response.json());
  }

  postUserData(userId, fullName) {
    let userObj = {
      "id": Number(userId),
      "name": fullName,
    }
    let url = `${this.rootUrl}/users/users`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  postRoomData(roomId, roomType, bidet, bedSize, numBeds, costPerNight) {
    let roomObj = {
      "number": Number(roomId),
      "roomType": roomType,
      "bidet": bidet,
      "bedSize": bedSize,
      "numBeds": Number(numBeds),
      "costPerNight": Number(costPerNight),
    }

    let url = `${this.rootUrl}/rooms/rooms`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomObj),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  postBookingData(id, userId, date, roomNumber, roomServiceCharges) {
    let bookingObj = {
      "id": id,
      "userID": Number(userId),
      "date": date,
      "roomNumber": Number(roomNumber),
      "roomServiceCharges": roomServiceCharges,
    }

    let url = `${this.rootUrl}/bookings/bookings`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingObj),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  // does this need something apart from the ID ? 
  deleteBookingData(id, url) {
    return fetch(url + '/' + id, {
      method: 'delete'
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message))
  }
}

export default ApiController;