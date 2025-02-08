React Resource Calendar
A modern, interactive resource calendar built with React and Tailwind CSS. This calendar allows you to manage and visualize events across different resources with features like drag-and-drop scheduling and event resizing.
Features

Monthly calendar view with resource rows
Interactive event management:

Drag and drop events between dates and resources
Resize events to adjust duration
Delete events


Mini calendar popup for quick date navigation
Color-coded events for better visualization
Current date highlighting
Responsive design with horizontal scrolling for many resources

Prerequisites

Node.js (v14.0.0 or higher)
npm (v6.0.0 or higher)

Installation

Clone the repository:

git clone <repository-url>
cd react-resource-calendar

Install the dependencies:
npm install
Required dependencies:
jsonCopy{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@/components/ui": "latest",
    "tailwindcss": "^3.0.0"
  }
}

Start the development server:

npm run dev
The application should now be running at http://localhost:3000
Usage
Calendar Navigation

Click the month/year text to toggle the mini calendar
Use the arrow buttons to navigate between months
Click "Today" to return to the current month

Event Management

Moving Events

Click and drag an event to move it to a different date or resource
The event maintains its duration when moved


Resizing Events

Hover over an event to reveal resize handles on both ends
Click and drag the handles to adjust the event's duration


Deleting Events

Hover over an event to reveal the delete (×) button
Click the button and confirm to delete the event



Component Structure
The calendar consists of these main parts:

Calendar Header

Month/year display
Navigation controls
Mini calendar toggle


Resource Grid

Resource names in the first column
Days of the month across the top
Event blocks in the corresponding cells


Event Display

Title
Time duration
Color coding
Resize handles
Delete button



Customization
Colors
Events use these default colors, which can be modified in the initialEvents array:

Light red: #ffcdd2
Light blue: #bbdefb
Light pink: #f8bbd0
Light green: #c8e6c9
Light yellow: #fff9c4
Light cyan: #b2ebf2

Resources
Resources can be modified by updating the initialResources array in the component.
Styling
The calendar uses Tailwind CSS classes for styling. Modify the classes in the component to customize the appearance.
License
This project is licensed under the MIT License - see the LICENSE file for details.