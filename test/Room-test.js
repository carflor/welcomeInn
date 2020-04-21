import Room from '../src/Room.js';
import { expect } from 'chai';

describe('Room', function () {
  let room;
  
  beforeEach(function () {
    room = new Room(4, "single room", false, "queen", 1, 429.44)
  })

  it('should be an instance of Room', function() {
    expect(room).to.be.an.instanceOf(Room)
  })

  it('should have a room number', function() {
    expect(room.number).to.equal(4)
  })

  it('should have a type', function() {
    expect(room.roomType).to.equal("single room")
  })

  it('should show if it has a bidet', function() {
    expect(room.bidet).to.equal(false)
  })

  it('should specify bed size', function() {
    expect(room.bedSize).to.equal("queen")
  })

  it('should specify the number of beds', function() {
    expect(room.numBeds).to.equal(1)
  })

  it('should include cost per night', function() {
    expect(room.costPerNight).to.equal(429.44)
  }); 
})