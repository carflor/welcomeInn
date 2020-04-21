import { expect } from 'chai';
import User from '../src/User';
// import moment from "moment";
// import Booking from '../src/Booking';

describe('User', function() {
  let user1;
  let reservations;
  let rooms;
  let bookedRoom;
  // let today;
  // let booking; 
  // let userData;
  

  beforeEach(function () {
    // today = moment().format("YYYY-MM-DD")
    bookedRoom = {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2020/02/05",
      "roomNumber": 12,
      "roomServiceCharges": []
    }
    reservations = [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 1,
        "date": "2020/02/04",
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 1,
        "date": "2020/01/24",
        "roomNumber": 24,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 12,
        "roomServiceCharges": []
      }]
    // rooms = [{
    //   "number": 1,
    //   "roomType": "residential suite",
    //   "bidet": true,
    //   "bedSize": "queen",
    //   "numBeds": 1,
    //   "costPerNight": 358.4
    // },
    // {
    //   "number": 2,
    //   "roomType": "suite",
    //   "bidet": false,
    //   "bedSize": "full",
    //   "numBeds": 2,
    //   "costPerNight": 477.38
    // },
    // {
    //   "number": 3,
    //   "roomType": "single room",
    //   "bidet": false,
    //   "bedSize": "king",
    //   "numBeds": 1,
    //   "costPerNight": 491.14
    // },
    // {
    //   "number": 7,
    //   "roomType": "single room",
    //   "bidet": false,
    //   "bedSize": "queen",
    //   "numBeds": 2,
    //   "costPerNight": 231.46
    // },
    // {
    //   "number": 12,
    //   "roomType": "single room",
    //   "bidet": false,
    //   "bedSize": "twin",
    //   "numBeds": 2,
    //   "costPerNight": 172.09
    // },
    // {
    //   "number": 15,
    //   "roomType": "residential suite",
    //   "bidet": false,
    //   "bedSize": "full",
    //   "numBeds": 1,
    //   "costPerNight": 294.56
    // }]
    user1 = new User(1, "Leatha Ullrich", reservations, rooms)
  }) 

  it('should be a function', function () {
    expect(User).to.be.a('function');
  })

  it('should be an instance of customer', function() {
    expect(user1).to.be.an.instanceOf(User);
  })

  it('should have a name', function() {
    expect(user1.name).to.deep.equal("Leatha Ullrich");
  })

  it('should have an id', function() {
    expect(user1.id).to.equal(1);
  })

  it('should have a list of reservations', function() {
    expect(user1.reservations).to.deep.equal(reservations);
  })

  it('should be able to book a room', function() {
    user1.bookRoom(bookedRoom)
    expect(user1.reservations.length).to.deep.equal(reservations.length)
  })
})