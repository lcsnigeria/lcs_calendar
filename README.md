# lcsCalendar Library Documentation

`lcsCalendar` is a flexible, dynamic calendar library built for ease of use in web projects, providing options for display, date selection, and customization. The library supports dates ranging from 100 years in the past to 10 years in the future and can be used both as a display calendar and as a date selection tool.

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
- **Flexible Date Range**: Covers a date range from 100 years ago to 10 years in the future.
- **Dynamic Layout**: Supports month navigation, expandable views, and current date highlights.
- **Selectable Purpose**: Choose between display-only or user-input modes.
- **Expand and Shrink**: Allows users to toggle between a single month and a full-year view.
- **Easy Integration**: Simple to include in any web project.

### Installation
You can include `lcsCalendar` in your project either by downloading the script or by using a CDN:
```html
<script src="path-to-lcsCalendar.min.js"></script>
```
Or add it to your project from NPM:
```bash
npm install lcsCalendar
```

### Basic Usage
To use `lcsCalendar`, create an instance and render it in the desired HTML container.
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
The library constructor takes several optional parameters:

| Parameter      | Type    | Description |
|----------------|---------|-------------|
| `year`         | Number  | Initial year to display (defaults to current year). |
| `month`        | Number  | Initial month to display in 1-12 format (defaults to current month). |
| `yearStart`    | Number  | Start year for year selection (default: current year - 100). |
| `yearEnd`      | Number  | End year for year selection (default: next year; limit: current year + 10). |
| `purpose`      | String  | Purpose of the calendar (`"showcase"` or `"input"`). |
| `flexible`     | Boolean | Whether the calendar can expand and shrink between month and year views. |
| `expanded`     | Boolean | Whether the calendar should be expanded on initial load. |

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
});
```

#### `calendarHTML()`
Returns the generated HTML for the calendar. Use this method to render the calendar in the DOM.
```javascript
document.getElementById("calendarContainer").innerHTML = calendar.calendarHTML();
```

### Event Handling
The library has default event listeners for user interaction with the calendar:

1. **Year Navigation**: Clicking a year updates the displayed year.
2. **Month Navigation**: Clicking a month updates the displayed month.
3. **Expand/Shrink Toggle**: Expands to show the full year or shrinks to show a single month if `flexible` is set to `true`.
4. **Date Selection (Input Mode)**: In `input` mode, clicking on a date allows the date to populate an associated input field.

### Examples

#### Display-Only Calendar
Create a calendar that is display-only (cannot be used for input) and loads as a single month view.
```javascript
const displayCalendar = new lcsCalendar({
  year: 2024,
  month: 1,
  purpose: "showcase",
  flexible: false,
});
document.getElementById("displayCalendarContainer").innerHTML = displayCalendar.calendarHTML();
```

#### Input Calendar
Create a calendar for date selection with a flexible, expandable view. 
```javascript
const inputCalendar = new lcsCalendar({
  year: 2024,
  month: 2,
  purpose: "input",
  flexible: true,
  expanded: true,
});
document.getElementById("inputCalendarContainer").innerHTML = inputCalendar.calendarHTML();
```

### Capturing User-Selected Values (for Input Mode)

In **input mode**, `lcsCalendar` allows you to automatically capture user-selected date values by adding specific class names to your desired input elements. This setup requires no additional code to read the values—simply add the classes to input fields for year, month, and date as shown below:

1. **Year Input**: Add the class `getCalendarYear` to any input element to automatically receive the selected year.
2. **Month Input**: Add the class `getCalendarMonth` to any input element to receive the selected month.
3. **Date Input**: Add the class `getCalendarDate` to any input element to receive the selected date.

#### Example

In this example, clicking on a date, month, or year within the calendar automatically populates the corresponding input field.

```html
<div id="calendarContainer"></div>

<input class="getCalendarYear" placeholder="Selected Year" />
<input class="getCalendarMonth" placeholder="Selected Month" />
<input class="getCalendarDate" placeholder="Selected Date" />

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

Now, when a user clicks a year, month, or date in the calendar, the selected value will automatically populate the corresponding input field. This makes it easy to integrate `lcsCalendar` into forms or scheduling features where user input is required.

### Customization
1. **CSS Styles**: Customize calendar styles using CSS. Target elements with classes like `.calendarHeader`, `.calendarMonth`, and `.calendarDate`.
2. **Icons**: By default, the library includes SVG icons for expand and shrink. Modify the SVGs if custom icons are needed.

### Contributing
To contribute:
- Fork the repository on GitHub.
- Make changes to the codebase.
- Submit a pull request with a description of your changes.

#### Issues
Report any bugs or feature requests in the GitHub repository’s issues section.