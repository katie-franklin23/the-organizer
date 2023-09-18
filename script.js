document.addEventListener('DOMContentLoaded', function() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthYear = document.getElementById('current-month-year');
    const calendarBody = document.getElementById('calendar-body');
  
    const eventInput = document.getElementById('event-input');
    const addEventBtn = document.getElementById('add-event');
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let events = []; // Store events in an array

    function renderCalendar() {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();

        currentMonthYear.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(firstDayOfMonth)} ${currentYear}`;

        let calendarHTML = '';

        let day = 1;
        for (let i = 0; i < 6; i++) {
            let row = '<tr>';
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDayOfWeek) || day > daysInMonth) {
                    row += '<td></td>';
                } else {
                    const eventsForDay = events.filter(event => event.date === `${currentYear}-${currentMonth + 1}-${day}`);
                    let eventHTML = '';
                    if (eventsForDay.length > 0) {
                        eventHTML = `<ul>`;
                        eventsForDay.forEach(event => {
                            eventHTML += `<li>${event.title} <button class="delete-event px-2 py-1 border border-blue-500 bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded ml-2"" data-id="${event.id}">Delete</button></li>`;
                        });
                        eventHTML += `</ul>`;
                    }
                    row += `<td class="p-2 border border-black text-sm text-center" data-date="${currentYear}-${currentMonth + 1}-${day}">${day}${eventHTML}<button class="add-event-button px-2 py-1 border border-blue-500 bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white rounded ml-2" data-date="${currentYear}-${currentMonth + 1}-${day}">Add Event</button></td>`;

                    day++;
                }
            }
            row += '</tr>';
            calendarHTML += row;
        }

        calendarBody.innerHTML = calendarHTML;

        // Add event listeners to delete buttons and the "Add Event" button
        addEventListeners();
    }

    function addEvent(title, date) {
        const newEvent = {
            id: Date.now().toString(), // Generate a unique ID (in practice, use a backend for IDs)
            title,
            date,
        };
        events.push(newEvent);
        renderCalendar();
        eventInput.value = ''; // Clear the input field
    }

    function deleteEvent(eventId) {
        events = events.filter(event => event.id !== eventId);
        renderCalendar();
    }

    // Add event listeners to delete buttons and the "Add Event" button
    function addEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-event');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const eventId = button.getAttribute('data-id');
                deleteEvent(eventId);
            });
        });

        const addEventBtns = document.querySelectorAll('.add-event-button');
        addEventBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedDate = btn.getAttribute('data-date');
                showEventModal(selectedDate);
            });
        });

        addEventBtn.addEventListener('click', function() {
            const eventTitle = eventInput.value.trim();
            if (eventTitle !== '') {
                const selectedDate = document.querySelector('.selected-day').getAttribute('data-date');
                addEvent(eventTitle, selectedDate);
            }
        });
    }

    // Function to show a modal for event creation (you can replace this with a custom modal)
    function showEventModal(date) {
        const eventTitle = prompt(`Add an event for ${date}:`);
        if (eventTitle) {
            addEvent(eventTitle, date);
        }
    }

    prevMonthBtn.addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar();
    });

    renderCalendar();
});



