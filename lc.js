/**
 * I am creating a js library for calender (starting from 100 years ago to 10 Years from now)
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

let lcs_calender_initialized = false;

/**
 * Create the class for using this library
 */
class lcsCalender {

    constructor(
        year = currentYear, // The year to display this calender (default and limit is 100 years (ago) to the current year)
        month = currentMonth, // The month to display (if not expanded on initial display. But if expanded, the month you provided here will be highlighted). Provide this in human readable format e.g. 1 (Jan) to 12 (Dec)
        purpose = 'showcase', // What the calender should be used for. Option is either 'showcase' or 'input'. 'showcase' is if just displaying as a calender. 'input' is when you are displaying as a prompt for users to select date to complete a form/settings (like date of birth, future task scheduling, etc)
        flexible = false, // Whether the calender should be expandedable and shrinkable to show single/all month(s)
        expanded = false, // Whether the calender should be expanded on initial display
        yearStart = oldestYear, // What year the listing of years should start from (default and limit is 100 years (ago) to the current year)
        yearEnd = nextYear // What year the listing of years should end (default is next year and limit is next 10 years)
    ) {

        // Is this calender initialized?
        if (lcs_calender_initialized !== true) {
            lcs_calender_initialized = true;
        }
        
        // Validate year provision
        if (year === null || year === undefined) {
            this.yearOnBrowse = currentYear;
        } else if (year < oldestYear || year > newestYear) {
            throw new Error("Limit is between 100 years ago and 10 years from now");
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
            throw new Error("Month must be provided in human readable format (e.g. 1/Jan to 12/Dec)");
        } else {
            this.monthOnBrowse = month;
        }

        // Validate purpose
        if (!["showcase", "input"].includes(purpose)) {
            throw new Error("Purpose must be either 'showcase' or 'input'");
        } else {
            this.useAs = purpose
        }

        this.setFlexible = flexible || false;
        this.setExpanded = expanded || false;
        this.yearStartFrom = yearStart || oldestYear;
        this.yearEndAt = yearEnd || nextYear;

        // Validate yearStart provision 
        if (this.yearStartFrom < oldestYear) {
            throw new Error("Limit is between 100 years ago and 10 years from now");
        }

        // Validate yearEnd provision
        if (this.yearEndAt > newestYear) {
            throw new Error("Limit is between 100 years ago and 10 years from now");
        }

        this.#setCalender();
    }

    #setCalender() {

        // lcsCalender Element
        const calenderMain = document.createElement("div");
        calenderMain.id = "lcsCalender";
        // Set whether calender should be flexible or not
        calenderMain.setAttribute("data-cflexible", this.setFlexible);
        // Set calender flexibility status
        calenderMain.setAttribute("data-cexpanded", this.setExpanded);
        // Set calender purpose status
        calenderMain.setAttribute("data-cpurpose", this.useAs);
        // Set calender year start and year end
        calenderMain.setAttribute("data-cys", this.yearStartFrom);
        calenderMain.setAttribute("data-cye", this.yearEndAt);

        // {calenderHeader element}
        const calenderHeader = document.createElement("div");
        calenderHeader.classList.add("calenderHeader");
        // {{Create and insert list of years/months nav wrapper}}
        const listOfYMNavWrapper = document.createElement("div");
        listOfYMNavWrapper.classList.add("calenderLOYMNWrapper");
        // {{{Create and insert list of years bar}}}
        const listOfYearsNav = document.createElement("nav");
        listOfYearsNav.classList.add("calenderLOYN");
        const listOfYearsWrapper = document.createElement("ul");
        let yearListCount = (this.yearEndAt + 1) - this.yearStartFrom;
        for (let i = 0; i < yearListCount; i++) {
            const yearNumber = this.yearStartFrom++;
            const listOfYear = document.createElement("li");
            const listOfYearButton = document.createElement("button");
            listOfYearButton.classList.add("calenderLOY");
            listOfYearButton.setAttribute("data-loy", yearNumber);
            listOfYearButton.textContent = yearNumber;
            listOfYear.appendChild(listOfYearButton);
            listOfYearsWrapper.appendChild(listOfYear);
        }
        listOfYearsNav.appendChild(listOfYearsWrapper);
        listOfYMNavWrapper.appendChild(listOfYearsNav);
        calenderHeader.appendChild(listOfYMNavWrapper);
        // {{Create flexibility wrapper only if setFlexible is true}}
        if (this.setFlexible) {
            const calenderFlexibilityToggleWrapper = document.createElement("div");
            calenderFlexibilityToggleWrapper.classList.add("calenderFlexibilityToggleWrapper");
            const calenderFlexibilityToggle = document.createElement("span");
            calenderFlexibilityToggle.classList.add("calenderFlexibilityToggle");
            const calenderFlexibilityToggleLabel = this.setExpanded ? "Shrink" : "Expand";
            calenderFlexibilityToggle.setAttribute("data-cftl", calenderFlexibilityToggleLabel);
            const calenderFlexibilityToggleIcon = this.setExpanded ? shrinkIcon() : expandIcon();
            calenderFlexibilityToggle.insertAdjacentHTML("beforeend", calenderFlexibilityToggleIcon);
            calenderFlexibilityToggle.insertAdjacentHTML("beforeend", `<span>${calenderFlexibilityToggleLabel}</span>`)
            calenderFlexibilityToggleWrapper.appendChild(calenderFlexibilityToggle);
            calenderHeader.appendChild(calenderFlexibilityToggleWrapper);
        }
        // {{Create and insert today's date info into calender Header}}
        const todaysDateInfo = document.createElement("p");
        todaysDateInfo.innerHTML = `Today is ${dayNames[currentDayByIndex]}, ${currentDate} ${monthNames[currentMonthByIndex]}, ${currentYear}`;
        calenderHeader.appendChild(todaysDateInfo);

        // {calenderBody element}
        const calenderBody = document.createElement("div");
        calenderBody.classList.add("calenderBody");
        calenderBody.setAttribute("data-yob", this.yearOnBrowse);
        calenderBody.setAttribute("data-mob", this.monthOnBrowse);

        let calenderMonthTables = this.setExpanded === true ? 12 : 1;

        for (let i = 0; i < calenderMonthTables; i++) {

            const thisMonth = calenderMonthTables === 1 ? this.monthOnBrowse : i + 1;

            // Create the month
            const calenderMonth = document.createElement("div");
            calenderMonth.classList.add("calenderMonth");

            // Hightlight the current month (if expanded). We only highlight if the calender is expanded
            if (this.setExpanded && thisMonth === currentMonth) {
                calenderMonth.classList.add("_hacm");
            }
            
            // Hightlight the month on browse (only if it is not the current month). We only highlight if the calender is expanded
            if (this.setExpanded && thisMonth !== currentMonth && this.monthOnBrowse === thisMonth) {
                calenderMonth.classList.add("_hamob");
            }

            // Create month header
            const calenderMonthHeader = document.createElement("div");
            calenderMonthHeader.classList.add("calenderMonthHeader");
            // {create month name and year display}
            const calenderMonthYearDisplay = document.createElement("div");
            calenderMonthYearDisplay.innerHTML = `${monthNames[thisMonth - 1]} ${this.yearOnBrowse}`;
            calenderMonthHeader.appendChild(calenderMonthYearDisplay);

            // Create month body
            const calenderMonthBody = document.createElement("div");
            calenderMonthBody.classList.add("calenderMonthBody");
                
            // Create the table element
            const calenderMonthTable = document.createElement("table");

            // Set the week names as the table header data
            const calenderMonthTableHeader = document.createElement("thead");
            const calenderMonthTableHeaderRow = document.createElement("tr");
            for (let i = 0; i < dayNames.length; i++) {
                const calenderMonthTableDayName = document.createElement("th");
                calenderMonthTableDayName.setAttribute("data-dfn", dayNames[i]);
                calenderMonthTableDayName.innerText = extractString(dayNames[i], 3);
                calenderMonthTableHeaderRow.appendChild(calenderMonthTableDayName);
            }
            calenderMonthTableHeader.appendChild(calenderMonthTableHeaderRow);


            const daysCount = getDaysCountInAMonth(this.yearOnBrowse, thisMonth);
            let firstDayStart = getDayOfMonthStart(this.yearOnBrowse, thisMonth);

            // Set the dates as the table body data (td)
            const calenderMonthTableBody = document.createElement("tbody");
            if (firstDayStart) {
                // Creating the first row, where the column to start from (set value) is the one corresponding to the first day of the month.
                const calenderMonthTableBodyInitRow = document.createElement("tr");
                let numberOfEmptyCol = firstDayStart - 1;
                let numberOfActiveCol = 7 - numberOfEmptyCol;

                // This works only if numberOfEmptyCol is above 0;
                // The purpose is to properly display dates in col below the day it correctly falls into.
                while (numberOfEmptyCol > 0) {
                    const calenderDateEmptyCol = document.createElement("td");
                    calenderMonthTableBodyInitRow.appendChild(calenderDateEmptyCol);
                    numberOfEmptyCol--;
                }
                for (let i = 0; i < numberOfActiveCol; i++) {
                    const calenderDateActiveCol = document.createElement("td");
                    calenderDateActiveCol.innerText = i + 1;
                    calenderMonthTableBodyInitRow.appendChild(calenderDateActiveCol);
                }
                calenderMonthTableBody.appendChild(calenderMonthTableBodyInitRow);
                
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
                        const calenderMonthTableBodyRestOfRow = document.createElement("tr");
                        for (let i2 = 0; i2 < 7; i2++) {
                            const calenderRestOfDateCol = document.createElement("td");
                            calenderRestOfDateCol.innerText = ++numberOfActiveCol;
                            calenderMonthTableBodyRestOfRow.appendChild(calenderRestOfDateCol);
                        }
                        calenderMonthTableBody.appendChild(calenderMonthTableBodyRestOfRow);
                    }
                }
                // When after displaying dates by 7 cols for each rows, 
                if (restOfDaysBy7AfterInitRowRemainder > 0) {
                    const calenderMonthTableBodyRowForRemainder = document.createElement("tr");
                    while (restOfDaysBy7AfterInitRowRemainder > 0) {
                        const calenderRestOfDateCol = document.createElement("td");
                        calenderRestOfDateCol.innerText = ++numberOfActiveCol;
                        calenderMonthTableBodyRowForRemainder.appendChild(calenderRestOfDateCol);
                        restOfDaysBy7AfterInitRowRemainder--;
                    }
                    calenderMonthTableBody.appendChild(calenderMonthTableBodyRowForRemainder);
                }

            }

            // Set table header and body
            calenderMonthTable.append(calenderMonthTableHeader, calenderMonthTableBody);

            // Insert the calenderMonthTable into calenderMonthBody
            calenderMonthBody.appendChild(calenderMonthTable);

            // Then calenderMonth gets calenderMonthHeader and calenderMonthBody
            calenderMonth.append(calenderMonthHeader, calenderMonthBody);

            // And then calenderMain gets the month(s)
            calenderBody.appendChild(calenderMonth);
        }

        // Active Calender
        const activeCalender = document.querySelector("#lcsCalender.activeCalender");
        if (activeCalender) {

            // Insert calenderHeader only if not exist
            const existingCalenderHeader = activeCalender.querySelector(".calenderHeader");
            if (!existingCalenderHeader) {
                activeCalender.appendChild(calenderHeader);
            }
            // Insert calenderBody; remove existing if one
            const existingCalenderBody = activeCalender.querySelector(".calenderBody");
            if (existingCalenderBody) {
                existingCalenderBody.remove(); 
            }
            activeCalender.appendChild(calenderBody);

            this.calenderElement = activeCalender;

        } else {
            calenderMain.append(calenderHeader, calenderBody);
            this.calenderElement = calenderMain.outerHTML;
        }
        
    }

    calenderHTML() {
        return this.calenderElement;
    }
    
}


/**
 * User interractions and modifications to the calender
 */
document.addEventListener("click", function(event) {

    // Set the calender to activeCalender if inside is clicked
    const targetCalender = event.target.closest("#lcsCalender");
    if (targetCalender) {
        targetCalender.classList.add("activeCalender");
    } else {
        const allCalender = document.querySelectorAll("#lcsCalender");
        if (allCalender.length > 0) {
            allCalender.forEach((thisCalender) => {
                if (thisCalender.classList.contains("activeCalender")) {
                    thisCalender.classList.remove("activeCalender");
                }
            })
        }
    }


    // What happens when the list of year button is clicked
    const cLOYBtarget = event.target.closest(".calenderLOY");
    if (cLOYBtarget) {
        const thisCalender = cLOYBtarget.closest("#lcsCalender");
        const thisCalenderPurpose = thisCalender.getAttribute("data-cpurpose");
        const thisCalenderFlexibility = toBoolean(thisCalender.getAttribute("data-cflexible"));
        const calenderIsExpanded = toBoolean(thisCalender.getAttribute("data-cexpanded"));
        const thisCalenderYearStart = thisCalender.getAttribute("data-cys");
        const thisCalenderYearEnd = thisCalender.getAttribute("data-cye");
        const cLOYMNWrapper = cLOYBtarget.closest(".calenderLOYMNWrapper");
        const selectedYear = parseInt(cLOYBtarget.getAttribute("data-loy"), 10);
        new lcsCalender(
            selectedYear, // Year on browse
            null, // Month on browse
            thisCalenderPurpose, // Calender purpose
            thisCalenderFlexibility, // Whether to be flexible or not
            calenderIsExpanded, // Flexibility status; whether expanded or shrinked
            thisCalenderYearStart, // Year Start
            thisCalenderYearEnd // Year End
        );
        const existingLOMN = cLOYMNWrapper.querySelectorAll(".calenderLOMN");
        if (existingLOMN.length > 0) {
            existingLOMN.forEach((eM) => {
                eM.remove();
            })
        }
        const listOfMonthsNav = document.createElement("nav");
        listOfMonthsNav.classList.add("calenderLOMN");
        const listOfMonthsWrapper = document.createElement("ul");
        for (let i = 0; i < monthNames.length; i++) {
            const monthName = monthNames[i];
            const listOfMonth = document.createElement("li");
            const listOfMonthButton = document.createElement("button");
            listOfMonthButton.classList.add("calenderLOM");
            listOfMonthButton.setAttribute("data-yob", selectedYear);
            listOfMonthButton.setAttribute("data-lom", i + 1);
            listOfMonthButton.textContent = monthName;
            listOfMonth.appendChild(listOfMonthButton);
            listOfMonthsWrapper.appendChild(listOfMonth);
        }
        listOfMonthsNav.appendChild(listOfMonthsWrapper);
        cLOYMNWrapper.appendChild(listOfMonthsNav);
    }


    // What happens when the list of month button is clicked
    const cLOMBtarget = event.target.closest(".calenderLOM");
    if (cLOMBtarget) {
        const thisCalender = cLOMBtarget.closest("#lcsCalender");
        const thisCalenderPurpose = thisCalender.getAttribute("data-cpurpose");
        const thisCalenderFlexibility = toBoolean(thisCalender.getAttribute("data-cflexible"));
        const calenderIsExpanded = toBoolean(thisCalender.getAttribute("data-cexpanded"));
        const thisCalenderYearStart = thisCalender.getAttribute("data-cys");
        const thisCalenderYearEnd = thisCalender.getAttribute("data-cye");
        const YOB = parseInt(cLOMBtarget.getAttribute("data-yob"), 10);
        const selectedMonth = parseInt(cLOMBtarget.getAttribute("data-lom"), 10);
        new lcsCalender(
            YOB, // Year on browse
            selectedMonth, // Month on browse 
            thisCalenderPurpose, // Calender purpose
            thisCalenderFlexibility, // Whether to be flexible or not
            calenderIsExpanded, // Flexibility status; whether expanded or shrinked
            thisCalenderYearStart, // Year Start
            thisCalenderYearEnd // Year End
        );
    }

    // What happens when flexibily toggle is clicked
    const cFT = event.target.closest(".calenderFlexibilityToggle");
    if (cFT) {
        const thisCalender = cFT.closest("#lcsCalender");
        const thisCalenderPurpose = thisCalender.getAttribute("data-cpurpose");
        const thisCalenderFlexibility = toBoolean(thisCalender.getAttribute("data-cflexible"));
        let calenderIsExpanded = toBoolean(thisCalender.getAttribute("data-cexpanded"));
        if (!calenderIsExpanded) {
            calenderIsExpanded = true;
            thisCalender.setAttribute("data-cexpanded", true);
            cFT.innerHTML = '';
            cFT.insertAdjacentHTML("beforeend", shrinkIcon() + '<span>Shrink</span>')
        } else {
            calenderIsExpanded = false;
            thisCalender.setAttribute("data-cexpanded", false);
            cFT.innerHTML = '';
            cFT.insertAdjacentHTML("beforeend", expandIcon() + '<span>Expand</span>')
        }
        const thisCalenderYearStart = thisCalender.getAttribute("data-cys");
        const thisCalenderYearEnd = thisCalender.getAttribute("data-cye");
        const thisCalenderBody = thisCalender.querySelector(".calenderBody");
        const YOB = parseInt(thisCalenderBody.getAttribute("data-yob"), 10);
        const MOB = parseInt(thisCalenderBody.getAttribute("data-mob"), 10);
        new lcsCalender(
            YOB, // Year on browse
            MOB, // Month on browse 
            thisCalenderPurpose, // Calender purpose
            thisCalenderFlexibility, // Whether to be flexible or not
            calenderIsExpanded, // Flexibility status; whether expanded or shrinked
            thisCalenderYearStart, // Year Start
            thisCalenderYearEnd // Year End
        );
    }


});





document.addEventListener("DOMContentLoaded", () => {
    const calender = new lcsCalender(
        null, 
        2, 
        'showcase', 
        true, 
        false, 
        2020, 
        2034
    );
    document.querySelector(".testBox").innerHTML = calender.calenderHTML();
});



