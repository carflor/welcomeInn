import $ from "jquery";
import './css/base.scss';
// An example of how you tell webpack to use an image
// import './images/background.jpg';
// const moment = require('moment')
import moment from 'moment';
import ApiController from './ApiController';
import Manager from './Manager';
import Room from './Room';
import User from './User';
import Booking from './Booking';

let api = new ApiController();
let manager;
let customer;

const fetchData = () => {
  let userData = api.getUsersData()
  let roomData = api.getRoomData()
  let reservationData = api.getReservationData()

  Promise.all([userData, roomData, reservationData])
    .then(finalData => {
      let userData = finalData[0]
      let roomData = finalData[1]
      let reservationData = finalData[2]
      loadManager(userData, roomData, reservationData)
    }).catch(error => console.log(error.message))
}

function loadManager(userData, roomData, reservationData) {
  manager = new Manager(userData, roomData, reservationData)
  let today = moment().format("YYYY-MM-DD").split('-').join('/')
  
}

// function loadUsers(userData, arr) {
//   // instead of a for each i need to validate according to the password id!
//   userData.forEach(function(datum) {
//     let user = new User(datum)
//     arr.push(user)
//   })
// }

$('.submit-button').click(() => {
  let username = $('.username-input')
  let password = $('.password-input')
  let customer = username.val().split('').splice(0, 8).join('')
  let customerId = Number(username.val().split('').splice(8).join(''))
  console.log('user ID', customerId)
  console.log('user', customer)
  if ((customer === 'manager') && (password.val() === 'overlook2020')) {
    displayManagerDashboard()
  } else if ((customer === 'customer' && customerId) && (password.val() === 'overlook2020')) {
    displayCustomerDashboard(customerId)
  } else {
    alert("Please Enter Correct Username and Password")
    $('.username-input').val('')
    $('.password-input').val('')
  }
})

// LOG OUT BUTTON
$('.logout').click(() => location.reload(true))

// DISPLAY DASHBOARD PAGES
function displayManagerDashboard() {
  $('.login-container').hide()
  $('.manager-dashboard').show()
  $('.button-container').removeClass('invisible')
}

function displayCustomerDashboard() {
  $('.login-container').hide()
  $('.manager-dashboard').show()
  $('.button-container').removeClass('invisible')
}

fetchData()