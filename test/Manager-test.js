import { expect } from 'chai';
// import spies from 'chai-spies';
// chai.use(spies);
import moment from "moment";
import Manager from '../src/Manager.js';


describe('BookingsRepo', function() {
  let manager;
  let reservations;
  let rooms;
  let users;
  let today;
  let newBooking;

  beforeEach(function () {
    users = [
      {
        "id": 1,
        "name": "Leatha Ullrich"
      },
      {
        "id": 2,
        "name": "Rocio Schuster"
      },
      {
        "id": 3,
        "name": "Kelvin Schiller"
      },
      {
        "id": 4,
        "name": "Kennedi Emard"
      }]
    newBooking = {
      "id": "example9838983",
      "userID": 1,
      "date": today,
      "roomNumber": 15,
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
        "userID": 2,
        "date": "2020/01/24",
        "roomNumber": 24,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 1,
        "date": "2020/01/10",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 3,
        "date": "2020/02/16",
        "roomNumber": 7,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 4,
        "date": "2020/02/05",
        "roomNumber": 12,
        "roomServiceCharges": []
      }, {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 8,
        "date": "2020/02/05",
        "roomNumber": 15,
        "roomServiceCharges": []
      }]
    rooms = [{
      "number": 15,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    },{
      "number": 12,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "twin",
      "numBeds": 2,
      "costPerNight": 172.09
    },{
      "number": 7,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 231.46
    },{
      "number": 24,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 327.24
    }]
    today = moment().format("YYYY-MM-DD")
    manager = new Manager(reservations, rooms, users);
  })

  it('should be an instance of Manager', function() {
    expect(manager).to.be.an.instanceOf(Manager);
  })

  it('should have access to all reservations', function() {
    expect(manager.reservations).to.deep.equal(reservations)
  })

  it('should have access to all rooms', function() {
    expect(manager.rooms).to.deep.equal(rooms)
  })

  it('should have access to all guests data', function() {
    expect(manager.users).to.deep.equal(users)
  })

  it('should be able to add a new booking', function () {
    expect(manager.reservations.length).to.equal(5)
    manager.bookRoom(newBooking);
    expect(manager.reservations.length).to.equal(6)
  })

  it('should get the percent of rooms occupied', function () {
    expect(manager.currentOccupancy('2020/02/05')).to.equal(25);
  })

  it('should get bookings by date', function () {
    expect(manager.getReservationsByDate('2020/02/05').length).to.equal(2)
  })

  it('should be able to search booking history by userId', function () {
    expect(manager.bookingHistoryById(1, reservations).length).to.equal(2)
  })

  it('should calculate total revenue by date', function () {
    expect(manager.totalRevenue('2020/02/16')).to.equal(231.46)
    expect(manager.totalRevenue('2020/02/05')).to.eql(466.65)
  })

  it('should be able to filter rooms by type', function () {
    expect(manager.filterByType('single room').length).to.equal(2)
  })
})