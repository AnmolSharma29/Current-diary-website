document.querySelectorAll('li').forEach(function(li) {
  li.addEventListener('click', function(e) {
    e.stopPropagation();

    const submenu = this.querySelector('.sub-menu');
    if (submenu) {
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }
  });
});

// document.querySelector('.profile').addEventListener('click', function () {
//   const menu = document.querySelector('.profile-menu');
//   const arrow = document.querySelector('.arrow-icon');

//   // Toggle menu visibility
//   menu.classList.toggle('hidden');

//   // Toggle arrow rotation
//   arrow.classList.toggle('rotate-179');
// });



const toggle = document.getElementById('dropdownToggle');
    const menu = document.getElementById('dropdownMenu');
    const arrow = document.getElementById('arrowIcon');

    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      arrow.classList.toggle('rotate-180');
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
        arrow.classList.remove('rotate-180');
      }
    });



let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

// generateCalendar = (month, year) => {

//     let calendar_days = calendar.querySelector('.calendar-days')
//     let calendar_header_year = calendar.querySelector('#year')

//     let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//     calendar_days.innerHTML = ''

//     let currDate = new Date()
//     if (!month) month = currDate.getMonth()
//     if (!year) year = currDate.getFullYear()

//     let curr_month = `${month_names[month]}`
//     month_picker.innerHTML = curr_month
//     calendar_header_year.innerHTML = year


//     // get first day of month

//     let first_day = new Date(year, month, 1)

//     for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
//         let day = document.createElement('div')
//         if (i >= first_day.getDay()) {
//             day.classList.add('calendar-day-hover')
//             day.innerHTML = i - first_day.getDay() + 1
//             day.innerHTML += `<span></span>
//                             <span></span>
//                             <span></span>
//                             <span></span>`
//             if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
//                 day.classList.add('curr-date')
//             }
//         }
//         calendar_days.appendChild(day)
//     }
// }


generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (month === undefined) month = currDate.getMonth()
    if (year === undefined) year = currDate.getFullYear()

    // 💡 Use separate variable for display to avoid conflict
    let display_month = month_names[month]
    month_picker.innerHTML = display_month
    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span><span></span><span></span><span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() &&
                year === currDate.getFullYear() &&
                month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}


let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

// document.querySelector('#prev-year').onclick = () => {
//     --curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }

// document.querySelector('#next-year').onclick = () => {
//     ++curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }

document.querySelector('#prev-year').onclick = () => {
    curr_month.value--
    if (curr_month.value < 0) {
        curr_month.value = 11
        curr_year.value--
    }
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    curr_month.value++
    if (curr_month.value > 11) {
        curr_month.value = 0
        curr_year.value++
    }
    generateCalendar(curr_month.value, curr_year.value)
}


document.querySelector('#year').onclick = () => {
    let today = new Date()
    curr_month.value = today.getMonth()
    curr_year.value = today.getFullYear()
    generateCalendar(curr_month.value, curr_year.value)
}
