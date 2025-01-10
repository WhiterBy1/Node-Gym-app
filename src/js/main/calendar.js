export function initializeWeekView() {
    const weekScroll = document.getElementById('weekScroll');
    const today = new Date();
    const currentDay = today.getDay();
    
    // Clear existing content
    weekScroll.innerHTML = '';
    
    // Generate week days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - currentDay + i);
        
        const dayItem = document.createElement('div');
        dayItem.className = 'day-item';
        if (i === currentDay) {
            dayItem.classList.add('current');
        }
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = date.getDate();
        
        dayItem.innerHTML = `
            <span class="day">${dayName}</span>
            <span class="date">${dayNumber}</span>
            ${i === currentDay ? '<span class="status current"></span>' : ''}
        `;
        
        weekScroll.appendChild(dayItem);
    }
    
    // Scroll to current day
    const scrollPosition = currentDay * 80 - (weekScroll.offsetWidth / 2) + 40;
    weekScroll.scrollLeft = scrollPosition;
}

export function setupCalendar() {
    const calendarToggle = document.getElementById('calendarToggle');
    const calendarOverlay = document.getElementById('calendarOverlay');
    const closeCalendar = document.getElementById('closeCalendar');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const currentMonthEl = document.getElementById('currentMonth');
    const calendarGrid = document.getElementById('calendarGrid');
    
    let currentDate = new Date();
    
    function renderCalendar(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        
        currentMonthEl.textContent = date.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        calendarGrid.innerHTML = '';
        
        // Add day labels
        const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        days.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.className = 'calendar-day';
            dayLabel.textContent = day;
            calendarGrid.appendChild(dayLabel);
        });
        
        // Add empty cells for previous month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            if (i === new Date().getDate() && 
                date.getMonth() === new Date().getMonth() && 
                date.getFullYear() === new Date().getFullYear()) {
                dayEl.classList.add('current');
            }
            dayEl.textContent = i;
            dayEl.addEventListener('click', () => {
                currentDate = new Date(date.getFullYear(), date.getMonth(), i);
                initializeWeekView();
                calendarOverlay.classList.remove('active');
            });
            calendarGrid.appendChild(dayEl);
        }
    }
    
    calendarToggle.addEventListener('click', () => {
        calendarOverlay.classList.add('active');
        renderCalendar(currentDate);
    });
    
    closeCalendar.addEventListener('click', () => {
        calendarOverlay.classList.remove('active');
    });
    
    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    
    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    
    // Close calendar when clicking outside
    calendarOverlay.addEventListener('click', (e) => {
        if (e.target === calendarOverlay) {
            calendarOverlay.classList.remove('active');
        }
    });
}