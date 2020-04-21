import $ from "jquery";
import './css/base.scss';
// An example of how you tell webpack to use an image
// import './images/background.jpg';
// const moment = require('moment')
import moment from 'moment';
import ApiController from './ApiController';
import Manager from './Manager';
import User from './User';
import Room from './Room';
import Booking from './Booking';

let api = new ApiController();
let manager;
let customer;
let userData;
let roomData;
let reservationData;
let today;

const fetchData = () => {
  userData = api.getUsersData()
  roomData = api.getRoomData()
  reservationData = api.getReservationData()

  Promise.all([userData, roomData, reservationData])
    .then(finalData => {
      userData = Object.values(finalData[0])
      roomData = Object.values(finalData[1])
      reservationData = Object.values(finalData[2])
      loadManager(userData, roomData, reservationData)
    }).catch(error => console.log(error.message))
}

// MANAGER INSTANTIATION
function loadManager(userData, roomData, reservationData) {
  manager = new Manager(userData, roomData, reservationData)
  today = moment().format("YYYY-MM-DD").split('-').join('/')
  // today = '2020/04/28'
  console.log(manager);
}

// CUSTOMER INSTANTIATION
function loadCustomer(customerId, manager) {
  let guest = []
  let guestRooms = manager.rooms
  let guestReservations = manager.bookingHistoryById(customerId, reservationData)
  manager.users.forEach(user => {
    if (user.id === customerId) {
      guest.push(user)
    }
  })
  customer = new User(guest[0].id, guest[0].name, guestReservations, guestRooms)
  displayCustomer(customer)
}

function displayCustomer(guest) {
  $('.guest-name').text(guest.name)
  $('.points-message').text(`You currently have ${guest.rewardPoints().toFixed(0)} Reward Points!`)
  let upcomingReservations = [];
  customer.reservations.forEach(reservation => {
    if (reservation.date >= today) {
      upcomingReservations.push(reservation)
    }
  })
  reservedRoomDetails(customer, upcomingReservations)
}

const populateGuestHistory = () => {
  console.log('avail arr', customer)
  console.log('reservationts to show', customer.reservations)
  customer.reservations.forEach(stay => {
    $(`<section class="reservation-card">
      <p>Room # ${stay.roomNumber}</p>
      <p>"${stay.date}"</p>
      <p>Confirmation #: ${stay.id}</p>
      `).prependTo($('.guest-history-main'))
  })
}


function calculateAvailableRooms(manager, today) {
  let bookedNow = []
  manager.reservations.forEach(booked => {
    manager.rooms.forEach(room => {
      if (booked.date === today && booked.roomNumber === room.number) {
        bookedNow.push(room)        
      }
    })
  })
  let availableRooms = manager.rooms.filter(room => {
    return !bookedNow.includes(room)
  })
  populateAvailableRooms(availableRooms);  
}

function populateAvailableRooms(availableRooms) {
  // console.log('avail arr', availableRooms)
  availableRooms.forEach(room => {
    $(`<section class="room-card">
      <p>Room # ${room.number}</p>
      <p>"${room.roomType}"</p>
      <p>Beds: ${room.numBeds} ${room.bedSize.toUpperCase()}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Cost: $${room.costPerNight}</p>
      <button class="book">BOOK ROOM</button>
    </section>`).prependTo($('.rooms-main'))
  })
}
  
$('.history').click(historyBtnHandler)
$('.rooms').click(roomBtnHandler)

function historyBtnHandler() {
  // populateGuestHistory(customer)
  displayGuestHistory()
}

function roomBtnHandler() {
  // calculateAvailableRooms(manager, today)
  displayRooms()
}

function displayCustomerReservations(customer, upcomingReservations, matchRoom) {
  if (upcomingReservations.length >= 1) {
    $('.reservations-container').prepend(`
    <section class="current-reservation">
    <p class="reservation-date">${upcomingReservations[0].date}</p>
    <p>Room # ${upcomingReservations[0].roomNumber}</p>
    <p>${matchRoom[0].roomType.toUpperCase()}</p>
    <p>Beds: ${matchRoom[0].numBeds} ${matchRoom[0].bedSize.toUpperCase()} </p>
    <span>Confirmation #: ${upcomingReservations[0].id}</span>
    </section>`)
  } else {
    $('.reservations-container').prepend(`<p class="no-reservations">No reservations found at this moment</p>`)
  }
}

function reservedRoomDetails(customer, upcomingReservations) {
  let matchRoom;
  if (upcomingReservations.length >= 1) {
    matchRoom = customer.rooms.filter(room => {
      return upcomingReservations[0].roomNumber === room.number || 0
    }) 
  } else {
    matchRoom = 0;
  }
  displayCustomerReservations(customer, upcomingReservations, matchRoom)
}

// LOG IN VALIDATION
$('.submit-button').click(() => {
  let username = $('.username-input')
  let password = $('.password-input')
  let customer = username.val().split('').splice(0, 8).join('')
  let customerId = Number(username.val().split('').splice(8).join(''))

  if ((customer === 'manager') && (password.val() === 'overlook2020')) {
    displayManagerDashboard()
  } else if ((customer === 'customer' && customerId) && (password.val() === 'overlook2020')) {
    displayCustomerDashboard(customerId)
    loadCustomer(customerId, manager)
  } else {
    incorrectLogin()
  }
})

// LOG IN VALIDATE
function incorrectLogin() {
  alert("Please Enter Correct Username and Password")
  $('.username-input').val('')
  $('.password-input').val('')
}

// LOG OUT BUTTON
$('.logout').click(() => location.reload(true))

// DISPLAY DASHBOARD PAGES
function displayManagerDashboard() {
  $('.manager-dashboard').show()
  $('.login-container').hide()
  $('.guest-history-main').hide()
  $('.rooms-main').hide()
  $('.button-container').removeClass('invisible')
  $('.guests').removeClass('invisible')
}

function displayCustomerDashboard() {
  $('.user-dashboard').show()
  $('.manager-dashboard').hide()
  $('.login-container').hide()
  $('.guest-history-main').hide()
  $('.button-container').removeClass('invisible')
}

function displayRooms() {
  $('.rooms-main').show()
  $('.manager-dashboard').hide()
  $('.login-container').hide()
  $('.user-dashboard').hide()
  $('.guest-history-main').hide()
  $('.button-container').removeClass('invisible')
  calculateAvailableRooms(manager, today)
}

function displayUsers() {
  $('.users-page').show()
  $('.manager-dashboard').hide()
  $('.rooms-main').hide()
  $('.login-container').hide()
  $('.user-dashboard').hide()
  $('.guest-history-main').hide()
  $('.button-container').removeClass('invisible')
  $('.guests').removeClass('invisible')
}

function displayGuestHistory() {
  $('.guest-history-main').show()
  $('.manager-dashboard').hide()
  $('.user-dashboard').hide()
  $('.login-container').hide()
  $('.rooms-main').hide()
  $('.button-container').removeClass('invisible')
  populateGuestHistory(customer)
}

function displayAllHistory() {
}

fetchData()