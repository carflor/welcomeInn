import Booking from '../src/Booking.js';
import { expect } from 'chai';

describe('Booking', function () {
  let bookedRoom;
  let booking = {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 43,
    "date": "2020/01/24",
    "roomNumber": 24,
    "roomServiceCharges": []
  }
  
  beforeEach(function () {
    bookedRoom = new Booking(booking)
  })

  it('should be an instance of Room', function() {
    expect(bookedRoom).to.be.an.instanceOf(Booking)
  })

  it('should have a unique randomized booking id', function() {
    expect(bookedRoom.id).to.equal("5fwrgu4i7k55hl6t5")
  })

  it('should have been made by a specific user', function() {
    expect(bookedRoom.userID).to.equal(43)
  })

  it('should have a specific booked date', function() {
    expect(bookedRoom.date).to.equal("2020/01/24")
  })

  it('should include all room services charges', function() {
    expect(bookedRoom.roomServiceCharges).to.deep.equal([])
  })
})