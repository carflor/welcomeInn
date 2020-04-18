// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from "jquery";
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/background.jpg';
import moment from 'moment';
// const moment = require('moment');
import Hotel from './Hotel';
import Booking from './Booking';
import User from './User';
import ApiController from './ApiController';

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
      loadHotel(userData, roomData, reservationData)
    }).catch(error => console.log(error.message))
}

function loadManager(userData, roomData, reservationData) {
  let today = moment().format("YYYY-MM-DD").split('-').join('/')
  manager = new Hotel(userData, roomData, reservationData)
  
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