/**
 * I am creating a js library for calendar (starting from 100 years ago to 10 Years from now)
*/



// Initialize Date
const getDate = new Date();

// Initialize year
const currentYear = getDate.getFullYear();
const previousYear = currentYear - 1;
const nextYear = currentYear + 1;
const oldestYear = currentYear - 100;
const newestYear = currentYear + 10;

// Initialize month (Jan/1 to Dec/12 )
const currentMonthByIndex = getDate.getMonth();
const currentMonth = currentMonthByIndex + 1; // Jan/0 to Dec/11

// Initialize date number
const currentDate = getDate.getDate();

// Initialize day (week name, e.g. Sun/1 to Sat/7)
const currentDayByIndex = getDate.getDay();
const currentDay = currentDayByIndex + 1; // Sun/0 to Sat/6


/**
 * Gets the starting day of the week for the 1st of a given month and year.
 * 
 * @param {number} year - The year (must be greater than 0).
 * @param {number} month - The month (1-12).
 * @returns {number|boolean} - Returns the day of the week (1 = Sunday, 2 = Monday, etc.) if valid, or false if the input is invalid.
 */
function getDayOfMonthStart(year, month) {
    // Validate year and month
    if (year < 1 || month < 1 || month > 12) {
        console.error("Invalid year or month. Please enter valid year between 100 years ago and 10 years from now, and a month value between 1 and 12.");
        return false;
    }

    const date = new Date(year, month - 1, 1);
    return date.getDay() + 1; // Returns 1 for Sunday, 2 for Monday, etc.
}

// Arrays of months
const month31 = [1, 3, 5, 7, 8, 10, 12];
const month30 = [4, 6, 9, 11];

/**
 * Returns the number of days in a given month and year.
 * 
 * @param {number} year - The year to check.
 * @param {number} month - The month to check (1-12).
 * @returns {number} - The number of days in the specified month and year.
 * @throws {Error} Will log an error and return 0 if the month is out of range (not 1-12).
 */
function getDaysCountInAMonth(year, month) {
    // Validate the month input (should be between 1 and 12)
    if (month < 1 || month > 12) {
        console.error("Invalid month. Please enter a value between 1 and 12.");
        return 0;
    }

    // Check for months with 31 days
    if (month31.includes(month)) {
        return 31;
    }

    // Check for months with 30 days
    if (month30.includes(month)) {
        return 30;
    }

    // Handle February
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return isLeapYear ? 29 : 28;
}

/**
 * Checks if the provided date, month, and year match today's date.
 * 
 * @param {number|string} date - The day of the month to check.
 * @param {number|string} month - The month to check (1-12).
 * @param {number|string} year - The year to check.
 * @returns {boolean} - Returns true if the provided date, month, and year match today's date; otherwise, false.
 * 
 * @example
 * // Assuming today's date is October 30, 2024
 * dateOfToday(30, 10, 2024); // Returns true
 * dateOfToday(29, 10, 2024); // Returns false
 */
function dateOfToday(date, month, year) {
    date = parseInt(date, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);

    return (year === currentYear && month === currentMonth && date === currentDate);
}

/**
 * Extracts a substring from the specified position with a given count of characters.
 * 
 * @param {string} string - The source string to extract from.
 * @param {number} [count=1] - The number of characters to extract (default is 1).
 * @param {number} [position=0] - The starting position of the substring (default is 0).
 * @returns {string} - The extracted substring, or an empty string if the position or count is invalid.
 * @throws {Error} Will log an error if position is out of range or count is negative.
 */
function extractString(string, count = 1, position = 0) {
    // Input validation
    if (position < 0 || position >= string.length) {
        console.error("Invalid position");
        return '';
    }

    if (count < 0) {
        console.error("Invalid count");
        return '';
    }

    // Extract the substring from the given position with the specified count
    const extractedString = string.slice(position, position + count);

    return extractedString;
}

/**
 * Converts a string representation of a boolean value to an actual boolean.
 * 
 * @param {string} str - The string to convert. Accepts "true", "false", "1", or "0".
 * @returns {boolean} - Returns true if the string is "true" (case-insensitive) or "1"; otherwise, returns false.
 * 
 * @example
 * toBoolean("true");    // Returns: true
 * toBoolean("false");   // Returns: false
 * toBoolean("1");       // Returns: true
 * toBoolean("0");       // Returns: false
 */
function toBoolean(str) {
    return str.toLowerCase() === "true" || str === "1";
}

/**
 * Checks if the provided element is an input-like element that supports the `.value` property.
 * This includes `<input>`, `<textarea>`, and `<select>` elements.
 * 
 * @param {Element} element - The DOM element to check.
 * @returns {boolean} - Returns true if the element is an input, textarea, or select element; otherwise, false.
 * 
 * @example
 * // Assuming <input id="myInput"> exists in the DOM
 * const element = document.getElementById("myInput");
 * isInputElement(element); // Returns true
 * 
 * // Assuming <div id="myDiv"> exists in the DOM
 * const nonInputElement = document.getElementById("myDiv");
 * isInputElement(nonInputElement); // Returns false
 */
function isInputElement(element) {
    return (
        element instanceof HTMLInputElement || 
        element instanceof HTMLTextAreaElement || 
        element instanceof HTMLSelectElement
    );
}

/**
 * Generates an SVG icon for a "shrink" action.
 * 
 * @returns {string} - SVG markup representing the shrink icon.
 */
const shrinkIcon = () => {
    return `<svg 
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M15 15l6 6m-6-6v4.8m0-4.8h4.8" />
        <path d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
        <path d="M15 4.2V9m0 0h4.8M15 9l6-6" />
        <path d="M9 4.2V9m0 0H4.2M9 9L3 3" />
    </svg>`; 
}

/**
 * Generates an SVG icon for an "expand" action.
 * 
 * @returns {string} - SVG markup representing the expand icon.
 */
const expandIcon = () => {
    return `<svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path d="M4.75 9.233C4.75 9.64721 5.08579 9.983 5.5 9.983C5.91421 9.983 6.25 9.64721 6.25 9.233H4.75ZM6.25 5.5C6.25 5.08579 5.91421 4.75 5.5 4.75C5.08579 4.75 4.75 5.08579 4.75 5.5H6.25ZM5.5 4.75C5.08579 4.75 4.75 5.08579 4.75 5.5C4.75 5.91421 5.08579 6.25 5.5 6.25V4.75ZM9.233 6.25C9.64721 6.25 9.983 5.91421 9.983 5.5C9.983 5.08579 9.64721 4.75 9.233 4.75V6.25ZM6.03033 4.96967C5.73744 4.67678 5.26256 4.67678 4.96967 4.96967C4.67678 5.26256 4.67678 5.73744 4.96967 6.03033L6.03033 4.96967ZM9.96967 11.0303C10.2626 11.3232 10.7374 11.3232 11.0303 11.0303C11.3232 10.7374 11.3232 10.2626 11.0303 9.96967L9.96967 11.0303ZM15.767 18.75C15.3528 18.75 15.017 19.0858 15.017 19.5C15.017 19.9142 15.3528 20.25 15.767 20.25V18.75ZM19.5 20.25C19.9142 20.25 20.25 19.9142 20.25 19.5C20.25 19.0858 19.9142 18.75 19.5 18.75V20.25ZM18.75 19.5C18.75 19.9142 19.0858 20.25 19.5 20.25C19.9142 20.25 20.25 19.9142 20.25 19.5H18.75ZM20.25 15.767C20.25 15.3528 19.9142 15.017 19.5 15.017C19.0858 15.017 18.75 15.3528 18.75 15.767H20.25ZM18.9697 20.0303C19.2626 20.3232 19.7374 20.3232 20.0303 20.0303C20.3232 19.7374 20.3232 19.2626 20.0303 18.9697L18.9697 20.0303ZM15.0303 13.9697C14.7374 13.6768 14.2626 13.6768 13.9697 13.9697C13.6768 14.2626 13.6768 14.7374 13.9697 15.0303L15.0303 13.9697ZM6.25 15.767C6.25 15.3528 5.91421 15.017 5.5 15.017C5.08579 15.017 4.75 15.3528 4.75 15.767H6.25ZM4.75 19.5C4.75 19.9142 5.08579 20.25 5.5 20.25C5.91421 20.25 6.25 19.9142 6.25 19.5H4.75ZM5.5 18.75C5.08579 18.75 4.75 19.0858 4.75 19.5C4.75 19.9142 5.08579 20.25 5.5 20.25V18.75ZM9.233 20.25C9.64721 20.25 9.983 19.9142 9.983 19.5C9.983 19.08579 9.64721 18.75 9.233 18.75V20.25ZM4.96967 18.9697C4.67678 19.2626 4.67678 19.7374 4.96967 20.0303C5.26256 20.3232 5.73744 20.3232 6.03033 20.0303L4.96967 18.9697ZM11.0303 15.0303C11.3232 14.7374 11.3232 14.2626 11.0303 13.9697C10.7374 13.6768 10.2626 13.6768 9.96967 13.9697L11.0303 15.0303ZM15.767 4.75C15.3528 4.75 15.017 5.08579 15.017 5.5C15.017 5.91421 15.3528 6.25 15.767 6.25V4.75ZM19.5 6.25C19.9142 6.25 20.25 5.91421 20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75V6.25ZM20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75C19.0858 4.75 18.75 5.08579 18.75 5.5H20.25ZM18.75 9.233C18.75 9.64721 19.0858 9.983 19.5 9.983C19.91421 9.983 20.25 9.64721 20.25 9.233H18.75ZM20.0303 6.03033C20.3232 5.73744 20.3232 5.26256 20.0303 4.96967C19.7374 4.67678 19.2626 4.67678 18.9697 4.96967L20.0303 6.03033ZM13.9697 9.96967C13.6768 10.2626 13.6768 10.7374 13.9697 11.0303C14.2626 11.3232 14.7374 11.3232 15.0303 11.0303L13.9697 9.96967ZM6.25 9.233V5.5H4.75V9.233H6.25ZM5.5 6.25H9.233V4.75H5.5V6.25ZM4.96967 6.03033L9.96967 11.0303L11.0303 9.96967L6.03033 4.96967L4.96967 6.03033ZM15.767 20.25H19.5V18.75H15.767V20.25ZM20.25 19.5V15.767H18.75V19.5H20.25ZM20.0303 18.9697L15.0303 13.9697L13.9697 15.0303L18.9697 20.0303L20.0303 18.9697ZM4.75 15.767V19.5H6.25V15.767H4.75ZM5.5 20.25H9.233V18.75H5.5V20.25ZM6.03033 20.0303L11.0303 15.0303L9.96967 13.9697L4.96967 18.9697L6.03033 20.0303ZM15.767 6.25H19.5V4.75H15.767V6.25ZM18.75 5.5V9.233H20.25V5.5H18.75ZM18.9697 4.96967L13.9697 9.96967L15.0303 11.0303L20.0303 6.03033L18.9697 4.96967Z" fill="#000000"/>
    </svg>`;
}


/**
 * Set up list of months from Jan/0 to Dec/11
 */
const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];


const dayNames = [
    "Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", 
    "Saturday"
];

let lcs_calendar_initialized = false;

/**
 * Create the class for using this library
 */
class lcsCalendar {

    /**
     * Creates an instance of the lcsCalendar class.
     * @param {Object} config - The configuration object for calendar settings.
     * @param {number} [config.year=currentYear] - The year to display on the calendar.
     * @param {number} [config.month=currentMonth] - The month to display on the calendar (1 for January to 12 for December).
     * @param {number} [config.yearStart=oldestYear] - The starting year for the year selection.
     * @param {number} [config.yearEnd=nextYear] - The ending year for the year selection.
     * @param {string} [config.purpose='showcase'] - The purpose of the calendar ('showcase' or 'input').
     * @param {boolean} [config.flexible=false] - Whether the calendar can expand and shrink.
     * @param {boolean} [config.expanded=false] - Whether the calendar should initially display in expanded mode.
     * 
     * @throws {Error} If year or month is out of the valid range, or if purpose is not 'showcase' or 'input'.
     */
    constructor({
        year = currentYear,
        month = currentMonth,
        yearStart = oldestYear,
        yearEnd = nextYear,
        purpose = 'showcase',
        flexible = false,
        expanded = false
    } = {}) {

        // Check if this calendar is initialized
        if (lcs_calendar_initialized !== true) {
            lcs_calendar_initialized = true;
        }
        
        // Validate year provision
        if (year === null || year === undefined) {
            this.yearOnBrowse = currentYear;
        } else if (year < oldestYear || year > newestYear) {
            throw new Error("Year must be between 100 years ago and 10 years from now");
        } else {
            this.yearOnBrowse = year;
        }

        // Validate month provision
        if (month === null || month === undefined) {
            if (this.yearOnBrowse !== currentYear) {
                this.monthOnBrowse = 1;
            } else {
                this.monthOnBrowse = currentMonth;
            }
        } else if (month < 1 || month > 12) {
            throw new Error("Month must be provided in human-readable format (e.g., 1 for Jan to 12 for Dec)");
        } else {
            this.monthOnBrowse = month;
        }

        this.yearStartFrom = yearStart || oldestYear;
        this.yearEndAt = yearEnd || nextYear;

        // Validate yearStart provision 
        if (this.yearStartFrom < oldestYear) {
            throw new Error("Year start must be between 100 years ago and 10 years from now");
        }

        // Validate yearEnd provision
        if (this.yearEndAt > newestYear) {
            throw new Error("Year end must be between 100 years ago and 10 years from now");
        }

        // Validate purpose
        if (!["showcase", "input"].includes(purpose)) {
            throw new Error("Purpose must be either 'showcase' or 'input'");
        } else {
            this.useAs = purpose;
        }

        this.setFlexible = flexible || false;
        this.setExpanded = expanded || false;

        this.#setCalendar();
    }

    /**
     * Private method to generate the calendar structure and elements.
     * Initializes the calendar container, header, and body sections, setting up navigation and options based on configuration.
     */
    #setCalendar() {

        // lcsCalendar Element
        const calendarMain = document.createElement("div");
        calendarMain.id = "lcsCalendar";
        // Set whether the calendar should be flexible or not
        calendarMain.setAttribute("data-cflexible", this.setFlexible);
        // Set calendar flexibility status
        calendarMain.setAttribute("data-cexpanded", this.setExpanded);
        // Set calendar purpose status
        calendarMain.setAttribute("data-cpurpose", this.useAs);
        // Set calendar year start and year end
        calendarMain.setAttribute("data-cys", this.yearStartFrom);
        calendarMain.setAttribute("data-cye", this.yearEndAt);

        // {calendarHeader element}
        const calendarHeader = document.createElement("div");
        calendarHeader.classList.add("calendarHeader");
        // {{Create calendarHeaderBar1}}
        const calendarHeaderBar1 = document.createElement("div");
        calendarHeaderBar1.classList.add("calendarHeaderBar1");
        // {{{Create and insert list of years/months navigation wrapper to be inserted into calendarHeaderBar1}}}
        const listOfYMNavWrapper = document.createElement("div");
        listOfYMNavWrapper.classList.add("calendarLOYMNWrapper");
        // {{{{Create and insert list of years navigation}}}}
        const listOfYearsNav = document.createElement("nav");
        listOfYearsNav.classList.add("calendarLOYN");
        const listOfYearsWrapper = document.createElement("ul");
        let yearListCount = (this.yearEndAt + 1) - this.yearStartFrom;
        for (let i = 0; i < yearListCount; i++) {
            const yearNumber = this.yearStartFrom++;
            const listOfYear = document.createElement("li");
            const listOfYearButton = document.createElement("button");
            listOfYearButton.classList.add("calendarLOY");
            listOfYearButton.setAttribute("data-loy", yearNumber);
            if (this.useAs === "input") {
                listOfYearButton.setAttribute("data-cyear", yearNumber);
            }
            listOfYearButton.textContent = yearNumber;
            listOfYear.appendChild(listOfYearButton);
            listOfYearsWrapper.appendChild(listOfYear);
        }
        listOfYearsNav.appendChild(listOfYearsWrapper);
        listOfYMNavWrapper.appendChild(listOfYearsNav);
        // {{{{Create and insert list of months navigation}}}}
        const listOfMonthsNav = document.createElement("nav");
        listOfMonthsNav.classList.add("calendarLOMN");
        const listOfMonthsWrapper = document.createElement("ul");
        for (let i = 0; i < monthNames.length; i++) {
            const monthName = monthNames[i];
            const monthNumber = i + 1;
            const listOfMonth = document.createElement("li");
            const listOfMonthButton = document.createElement("button");
            listOfMonthButton.classList.add("calendarLOM");
            listOfMonthButton.setAttribute("data-yob", this.yearOnBrowse);
            listOfMonthButton.setAttribute("data-lom", monthNumber);
            if (this.useAs === "input") {
                listOfMonthButton.setAttribute("data-cmonth", monthNumber);
            }
            listOfMonthButton.textContent = monthName;
            listOfMonth.appendChild(listOfMonthButton);
            listOfMonthsWrapper.appendChild(listOfMonth);
        }
        listOfMonthsNav.appendChild(listOfMonthsWrapper);
        listOfYMNavWrapper.appendChild(listOfMonthsNav);
        calendarHeaderBar1.appendChild(listOfYMNavWrapper);
        // {{{Create flexibility toggle only if setFlexible is true; to be inserted into calendarHeaderBar1}}}
        if (this.setFlexible) {
            const calendarFlexibilityToggleWrapper = document.createElement("div");
            calendarFlexibilityToggleWrapper.classList.add("calendarFlexibilityToggleWrapper");
            const calendarFlexibilityToggle = document.createElement("span");
            calendarFlexibilityToggle.classList.add("calendarFlexibilityToggle");
            const calendarFlexibilityToggleLabel = this.setExpanded ? "Shrink" : "Expand";
            calendarFlexibilityToggle.setAttribute("data-cftl", calendarFlexibilityToggleLabel);
            const calendarFlexibilityToggleIcon = this.setExpanded ? shrinkIcon() : expandIcon();
            calendarFlexibilityToggle.insertAdjacentHTML("beforeend", calendarFlexibilityToggleIcon);
            calendarFlexibilityToggle.insertAdjacentHTML("beforeend", `<span>${calendarFlexibilityToggleLabel}</span>`);
            calendarFlexibilityToggleWrapper.appendChild(calendarFlexibilityToggle);
            calendarHeaderBar1.appendChild(calendarFlexibilityToggleWrapper);
        }
        //
        const calendarHeaderBar2 = document.createElement("div");
        calendarHeaderBar2.classList.add("calendarHeaderBar2");
        // {{{Create and insert today's date info to be inserted into calendarHeaderBar2}}}
        const todaysDateInfo = document.createElement("p");
        todaysDateInfo.innerHTML = `Today is ${dayNames[currentDayByIndex]}, ${currentDate} ${monthNames[currentMonthByIndex]}, ${currentYear}`;
        calendarHeaderBar2.appendChild(todaysDateInfo);
        // Now insert header bars into calendarHeader
        calendarHeader.append(calendarHeaderBar1, calendarHeaderBar2);

        // {calendarBody element}
        const calendarBody = document.createElement("div");
        calendarBody.classList.add("calendarBody");
        calendarBody.setAttribute("data-yob", this.yearOnBrowse);
        calendarBody.setAttribute("data-mob", this.monthOnBrowse);

        let calendarMonthTables = this.setExpanded === true ? 12 : 1;

        for (let i = 0; i < calendarMonthTables; i++) {

            const thisMonth = calendarMonthTables === 1 ? this.monthOnBrowse : i + 1;

            // Create the month
            const calendarMonth = document.createElement("div");
            calendarMonth.classList.add("calendarMonth");

            // Highlight the current month (if expanded). We only highlight if the calendar is expanded
            if (this.setExpanded && thisMonth === currentMonth) {
                calendarMonth.id = "CM";
            }
            
            // Highlight the month on browse (only if it is not the current month). We only highlight if the calendar is expanded
            if (this.setExpanded && thisMonth !== currentMonth && this.monthOnBrowse === thisMonth) {
                calendarMonth.id = "MOB";
            }

            // Create month header
            const calendarMonthHeader = document.createElement("div");
            calendarMonthHeader.classList.add("calendarMonthHeader");
            // {create month name and year display}
            const calendarMonthYearDisplay = document.createElement("div");
            calendarMonthYearDisplay.innerHTML = `${monthNames[thisMonth - 1]} ${this.yearOnBrowse}`;
            calendarMonthHeader.appendChild(calendarMonthYearDisplay);

            // Create month body
            const calendarMonthBody = document.createElement("div");
            calendarMonthBody.classList.add("calendarMonthBody");
                
            // Create the table element
            const calendarMonthTable = document.createElement("table");

            // Set the week names as the table header data
            const calendarMonthTableHeader = document.createElement("thead");
            const calendarMonthTableHeaderRow = document.createElement("tr");
            for (let i = 0; i < dayNames.length; i++) {
                const calendarMonthTableDayName = document.createElement("th");
                calendarMonthTableDayName.setAttribute("data-dfn", dayNames[i]);
                calendarMonthTableDayName.innerText = extractString(dayNames[i], 3);
                calendarMonthTableHeaderRow.appendChild(calendarMonthTableDayName);
            }
            calendarMonthTableHeader.appendChild(calendarMonthTableHeaderRow);

            const daysCount = getDaysCountInAMonth(this.yearOnBrowse, thisMonth);
            let firstDayStart = getDayOfMonthStart(this.yearOnBrowse, thisMonth);

            // Set the dates as the table body data (td)
            const calendarMonthTableBody = document.createElement("tbody");
            if (firstDayStart) {
                // Creating the first row, where the column to start from (set value) is the one corresponding to the first day of the month.
                const calendarMonthTableBodyInitRow = document.createElement("tr");
                let numberOfEmptyCol = firstDayStart - 1;
                let numberOfActiveCol = 7 - numberOfEmptyCol;

                // This works only if numberOfEmptyCol is above 0;
                // The purpose is to properly display dates in col below the day it correctly falls into.
                while (numberOfEmptyCol > 0) {
                    const calendarDateEmptyCol = document.createElement("td");
                    calendarMonthTableBodyInitRow.appendChild(calendarDateEmptyCol);
                    numberOfEmptyCol--;
                }
                for (let i = 0; i < numberOfActiveCol; i++) {
                    const dateNumber = i + 1;
                    const calendarDateActiveCol = document.createElement("td");
                    if (this.useAs === "input") {
                        calendarDateActiveCol.setAttribute("data-cdate", dateNumber);
                        calendarDateActiveCol.classList.add("calendarDate");
                    } 
                    if (dateOfToday(dateNumber, thisMonth, this.yearOnBrowse)) {
                        calendarDateActiveCol.id = "DOT";
                    }
                    calendarDateActiveCol.innerText = dateNumber;
                    calendarMonthTableBodyInitRow.appendChild(calendarDateActiveCol);
                }
                calendarMonthTableBody.appendChild(calendarMonthTableBodyInitRow);
                
                /** 
                 * Now creating the rest of the rows, each row having a minimum of 7 cols (Sunday to Saturday)
                 * To make this work by 7, we check and remove the remainder when rest of days is divided by 7.
                 * i.e. assuming that after initial row above, 31 days remains 26 days (from 6 to 31) as rest of days after 5 days (from 1 to 5) was removed to
                 * serve as cols for the init row. Now dividing 26 by 7 gives us (7 * 3) + 5; so below codes will create 3 rows to
                 * accommodate 21 days (from 6 to 26). Then later we create extra row and fill in 5 cols as the remaining 5 days (from 27 to 31)
                 * 
                 */ 
                const restOfDaysAfterInitRow = daysCount - numberOfActiveCol;
                let restOfDaysBy7AfterInitRowRemainder = restOfDaysAfterInitRow % 7;
                const restOfDaysBy7AfterInitRow = restOfDaysAfterInitRow - restOfDaysBy7AfterInitRowRemainder;
                for (let i = 0; i < restOfDaysBy7AfterInitRow; i++) {
                    if (i % 7 === 0) {
                        const calendarMonthTableBodyRestOfRow = document.createElement("tr");
                        for (let i2 = 0; i2 < 7; i2++) {
                            const dateNumber = ++numberOfActiveCol;
                            const calendarRestOfDateCol = document.createElement("td");
                            if (this.useAs === "input") {
                                calendarRestOfDateCol.setAttribute("data-cdate", dateNumber);
                                calendarRestOfDateCol.classList.add("calendarDate");
                            }
                            if (dateOfToday(dateNumber, thisMonth, this.yearOnBrowse)) {
                                calendarRestOfDateCol.id = "DOT";
                            }
                            calendarRestOfDateCol.innerText = dateNumber;
                            calendarMonthTableBodyRestOfRow.appendChild(calendarRestOfDateCol);
                        }
                        calendarMonthTableBody.appendChild(calendarMonthTableBodyRestOfRow);
                    }
                }
                // When after displaying dates by 7 cols for each rows, 
                if (restOfDaysBy7AfterInitRowRemainder > 0) {
                    const calendarMonthTableBodyRowForRemainder = document.createElement("tr");
                    while (restOfDaysBy7AfterInitRowRemainder > 0) {
                        const dateNumber = ++numberOfActiveCol;
                        const calendarRestOfDateCol = document.createElement("td");
                        if (this.useAs === "input") {
                            calendarRestOfDateCol.setAttribute("data-cdate", dateNumber);
                            calendarRestOfDateCol.classList.add("calendarDate");
                        }
                        if (dateOfToday(dateNumber, thisMonth, this.yearOnBrowse)) {
                            calendarRestOfDateCol.id = "DOT";
                        }
                        calendarRestOfDateCol.innerText = dateNumber;
                        calendarMonthTableBodyRowForRemainder.appendChild(calendarRestOfDateCol);
                        restOfDaysBy7AfterInitRowRemainder--;
                    }
                    calendarMonthTableBody.appendChild(calendarMonthTableBodyRowForRemainder);
                }

            }

            // Set table header and body
            calendarMonthTable.append(calendarMonthTableHeader, calendarMonthTableBody);

            // Insert the calendarMonthTable into calendarMonthBody
            calendarMonthBody.appendChild(calendarMonthTable);

            // Then calendarMonth gets calendarMonthHeader and calendarMonthBody
            calendarMonth.append(calendarMonthHeader, calendarMonthBody);

            // And then calendarMain gets the month(s)
            calendarBody.appendChild(calendarMonth);
        }

        // Active Calendar
        const activeCalendar = document.querySelector("#lcsCalendar.activeCalendar");
        if (activeCalendar) {

            // Insert calendarHeader only if not exist
            const existingCalendarHeader = activeCalendar.querySelector(".calendarHeader");
            if (!existingCalendarHeader) {
                activeCalendar.appendChild(calendarHeader);
            }
            // Insert calendarBody; remove existing if one
            const existingCalendarBody = activeCalendar.querySelector(".calendarBody");
            if (existingCalendarBody) {
                existingCalendarBody.remove(); 
            }
            activeCalendar.appendChild(calendarBody);

            this.calendarElement = activeCalendar;

        } else {
            calendarMain.append(calendarHeader, calendarBody);
            this.calendarElement = calendarMain.outerHTML;
        }
        
    }

    /**
     * Retrieves the HTML representation of the calendar.
     * 
     * @returns {string} The HTML content of the calendar.
     */
    calendarHTML() {
        return this.calendarElement;
    }
    
}



/**
 * User interactions and modifications to the calendar
 * This event listener handles clicks on calendar elements, including year and month selection,
 * as well as toggling between expanded and shrunk views.
 */
document.addEventListener("click", function(event) {

    // Set the calendar to activeCalendar if a click occurs within it
    const targetCalendar = event.target.closest("#lcsCalendar");
    if (targetCalendar) {
        targetCalendar.classList.add("activeCalendar");
    } else {
        const allCalendars = document.querySelectorAll("#lcsCalendar");
        if (allCalendars.length > 0) {
            allCalendars.forEach((thisCalendar) => {
                if (thisCalendar.classList.contains("activeCalendar")) {
                    thisCalendar.classList.remove("activeCalendar");
                }
            });
        }
    }

    // Handle clicks on the year button list
    const cLOYBtarget = event.target.closest(".calendarLOY");
    if (cLOYBtarget) {
        const thisCalendar = cLOYBtarget.closest("#lcsCalendar");
        const selectedYear = parseInt(cLOYBtarget.getAttribute("data-loy"), 10);

        const allMonths = thisCalendar.querySelectorAll(".calendarLOM");
        if (allMonths.length > 0) {
            allMonths.forEach((ML) => {
                ML.setAttribute("data-yob", selectedYear);
            });
        }

        // Create a new instance of lcsCalendar with the selected parameters
        new lcsCalendar({
            year: selectedYear,
            month: selectedYear === currentYear ? currentMonth : 1,
            yearStart: parseInt(thisCalendar.getAttribute("data-cys"), 10),
            yearEnd: parseInt(thisCalendar.getAttribute("data-cye"), 10),
            purpose: thisCalendar.getAttribute("data-cpurpose"),
            flexible: toBoolean(thisCalendar.getAttribute("data-cflexible")),
            expanded: toBoolean(thisCalendar.getAttribute("data-cexpanded"))
        });
    }

    // Handle clicks on the month button list
    const cLOMBtarget = event.target.closest(".calendarLOM");
    if (cLOMBtarget) {
        const thisCalendar = cLOMBtarget.closest("#lcsCalendar");
        const YOB = parseInt(cLOMBtarget.getAttribute("data-yob"), 10);
        const selectedMonth = parseInt(cLOMBtarget.getAttribute("data-lom"), 10);

        // Create a new instance of lcsCalendar with the selected parameters
        new lcsCalendar({
            year: YOB,
            month: selectedMonth,
            yearStart: parseInt(thisCalendar.getAttribute("data-cys"), 10),
            yearEnd: parseInt(thisCalendar.getAttribute("data-cye"), 10),
            purpose: thisCalendar.getAttribute("data-cpurpose"),
            flexible: toBoolean(thisCalendar.getAttribute("data-cflexible")),
            expanded: toBoolean(thisCalendar.getAttribute("data-cexpanded"))
        });
    }

    // Toggle the flexibility (expand/shrink) of the calendar
    const cFT = event.target.closest(".calendarFlexibilityToggle");
    if (cFT) {
        const thisCalendar = cFT.closest("#lcsCalendar");
        let calendarIsExpanded = toBoolean(thisCalendar.getAttribute("data-cexpanded"));

        // Toggle expanded state
        calendarIsExpanded = !calendarIsExpanded;
        thisCalendar.setAttribute("data-cexpanded", calendarIsExpanded);
        cFT.innerHTML = '';
        cFT.insertAdjacentHTML(
            "beforeend",
            (calendarIsExpanded ? shrinkIcon() : expandIcon()) + `<span>${calendarIsExpanded ? 'Shrink' : 'Expand'}</span>`
        );

        // Create a new instance of lcsCalendar with updated expanded state
        new lcsCalendar({
            year: parseInt(thisCalendar.querySelector(".calendarBody").getAttribute("data-yob"), 10),
            month: parseInt(thisCalendar.querySelector(".calendarBody").getAttribute("data-mob"), 10),
            yearStart: parseInt(thisCalendar.getAttribute("data-cys"), 10),
            yearEnd: parseInt(thisCalendar.getAttribute("data-cye"), 10),
            purpose: thisCalendar.getAttribute("data-cpurpose"),
            flexible: toBoolean(thisCalendar.getAttribute("data-cflexible")),
            expanded: calendarIsExpanded
        });
    }

    // Handle year, month, and date selection in input mode
    const yearSelection = event.target.closest(".calendarLOY[data-cyear]");
    if (yearSelection) {
        const yearValue = parseInt(yearSelection.getAttribute("data-cyear"), 10);
        const inputToReceiveYearValue = document.querySelector(".getCalendarYear");
        if (inputToReceiveYearValue) {
            if (!isInputElement(inputToReceiveYearValue)) {
                throw new Error("The element provided to receive the year value must be a valid input element.");
            }
            inputToReceiveYearValue.value = yearValue;
        }
    }

    const monthSelection = event.target.closest(".calendarLOM[data-cmonth]");
    if (monthSelection) {
        const monthValue = parseInt(monthSelection.getAttribute("data-cmonth"), 10);
        const inputToReceiveMonthValue = document.querySelector(".getCalendarMonth");
        if (inputToReceiveMonthValue) {
            if (!isInputElement(inputToReceiveMonthValue)) {
                throw new Error("The element provided to receive the month value must be a valid input element.");
            }
            inputToReceiveMonthValue.value = monthValue;
        }
    }

    const dateSelection = event.target.closest(".calendarDate[data-cdate]");
    if (dateSelection) {
        const dateValue = parseInt(dateSelection.getAttribute("data-cdate"), 10);
        const inputToReceiveDateValue = document.querySelector(".getCalendarDate");
        if (inputToReceiveDateValue) {
            if (!isInputElement(inputToReceiveDateValue)) {
                throw new Error("The element provided to receive the date value must be a valid input element.");
            }
            inputToReceiveDateValue.value = dateValue;
        }
    }
});