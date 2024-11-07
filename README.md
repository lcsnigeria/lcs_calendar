# lcsCalendar Library Documentation

`lcsCalendar` is a versatile, dynamic calendar library designed for ease of use in web projects, with flexible display options and customizable features. The library supports dates ranging from 100 years in the past to 10 years in the future, making it ideal for both display and date selection.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Options](#options)
5. [API](#api)
6. [Event Handling](#event-handling)
7. [Examples](#examples)
8. [Customization](#customization)
9. [Contributing](#contributing)

---

### Features
- **Dynamic Date Range**: Displays dates across a 110-year range.
- **Flexible View Options**: Toggle between expanded (12-month) and compact (1-month) views.
- **Selectable Purpose**: Choose between "showcase" (static display) and "input" (interactive date selection).
- **Callback Support**: In input mode, trigger a specified callback when a date is selected.
- **Intuitive Date Handling**: Highlights today’s date and handles leap years.
- **User-Friendly Navigation**: Year and month navigation with custom SVG icons.

### Installation
You can include `lcsCalendar` in your project using either a CDN or npm.

#### CDN

1. **Specific Version** (e.g., `lcs_calendar@1.0.0`)
   ```html
   <script src="https://cdn.jsdelivr.net/npm/lcs_calendar@1.0.0/dist/lc.min.js"></script>
   ```

2. **Latest Version**
   ```html
   <script src="https://cdn.jsdelivr.net/npm/lcs_calendar/dist/lc.min.js"></script>
   ```

   **Note**: If you are using version `1.0.0`, you will need to include the CSS file separately:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lcs_calendar/dist/lc.min.css">
   ```

#### NPM
To install `lcsCalendar` via npm, run the following command in your project directory:

```bash
npm install lcs_calendar
```

**Note**: After installing via npm, ensure you import both the JavaScript and CSS files in your project if you're using version `1.0.0`:
```javascript
import 'lcs_calendar/dist/lc.min.css';  // Import CSS
import lcsCalendar from 'lcs_calendar';  // Import JavaScript
```

### Basic Usage
To use `lcsCalendar`, create an instance and render it in the desired HTML container:
```html
<div id="calendarContainer"></div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const calendar = new lcsCalendar({
      year: 2024,
      month: 10,
      purpose: "input",
      flexible: true,
      expanded: false,
    });
    document.getElementById("calendarContainer").innerHTML = calendar.calendarHTML();
  });
</script>
```

### Options
The constructor accepts several parameters to configure calendar behavior:

| Parameter         | Type    | Description |
|-------------------|---------|-------------|
| `year`            | Number  | Initial year to display (defaults to the current year). |
| `month`           | Number  | Initial month to display (1-12; defaults to the current month). |
| `yearStart`       | Number  | Start year for selection (default: 100 years ago). |
| `yearEnd`         | Number  | End year for selection (default: 10 years into the future). |
| `purpose`         | String  | Purpose of the calendar (`"showcase"` or `"input"`). |
| `flexible`        | Boolean | Enables expand/shrink functionality between views. |
| `expanded`        | Boolean | If true, displays a 12-month view initially. |
| `conclusionCallback` | String | (Input mode) Name of a callback function triggered on date selection completion. |

### API

#### `lcsCalendar` Constructor
Creates a new `lcsCalendar` instance.
```javascript
const calendar = new lcsCalendar({
    year: 2024,
    month: 10,
    yearStart: 1924,
    yearEnd: 2034,
    purpose: 'input',
    flexible: true,
    expanded: false,
    conclusionCallback: 'handleDateSelection'
});
```

#### `calendarHTML()`
Generates and returns the HTML for the calendar. Use this method to insert the calendar into the DOM.
```javascript
document.getElementById("calendarContainer").innerHTML = calendar.calendarHTML();
```

### Event Handling
The library includes built-in event listeners for common interactions:

1. **Year and Month Selection**: Updates the displayed year or month.
2. **Expand/Shrink Toggle**: Switches between single-month and full-year views (if `flexible` is true).
3. **Date Selection (Input Mode)**: Captures and passes selected date values to associated input fields or triggers a custom callback function.

### Examples

#### Display-Only Calendar
Create a static calendar display for showcasing.
```javascript
const displayCalendar = new lcsCalendar({
  year: 2024,
  month: 1,
  purpose: "showcase",
  flexible: false,
});
document.getElementById("displayCalendarContainer").innerHTML = displayCalendar.calendarHTML();
```

#### Input Calendar with Flexible View
Create an interactive calendar that allows date selection with expand/shrink functionality.
```javascript
const inputCalendar = new lcsCalendar({
  year: 2024,
  month: 2,
  purpose: "input",
  flexible: true,
  expanded: true,
  conclusionCallback: 'handleDateSelection'
});
document.getElementById("inputCalendarContainer").innerHTML = inputCalendar.calendarHTML();
```

### Automatic Date Population (Input Mode)

In **input mode**, `lcsCalendar` populates selected dates automatically when specified input fields are given specific classes:

1. **Year Input**: Use `.getCalendarSelectedYear` to receive the selected year.
2. **Month Input**: Use `.getCalendarSelectedMonth` to receive the selected month.
3. **Date Input**: Use `.getCalendarSelectedDate` to receive the selected date.
4. **Full Date Input**: Use `.getCalendarSelectionValue` for a complete date string.

#### Example
```html
<div id="calendarContainer"></div>

<input class="getCalendarSelectedYear" placeholder="Selected Year" />
<input class="getCalendarSelectedMonth" placeholder="Selected Month" />
<input class="getCalendarSelectedDate" placeholder="Selected Date" />
<input class="getCalendarSelectionValue" placeholder="Selected Full Date (DD-MM-YYYY)" />

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const calendar = new lcsCalendar({
      year: 2024,
      month: 10,
      purpose: "input",
      flexible: true,
      expanded: false,
    });
    document.getElementById("calendarContainer").innerHTML = calendar.calendarHTML();
  });
</script>
```

When users select a date, the values populate the respective fields automatically, enabling seamless form integration.

### Customization
1. **CSS Styling**: Customize appearance using classes such as `.calendarHeader`, `.calendarMonth`, and `.calendarDate`.
2. **SVG Icons**: Modify default SVG icons for expand, shrink, and navigation as needed.

### Contributing
To contribute:
- Fork the repository on GitHub.
- Make and test your changes.
- Submit a pull request with a clear description of your improvements or fixes.

#### Issues
Report any bugs or feature requests in the GitHub repository’s Issues section.