React Resource Calendar
A modern, interactive resource calendar built with React and Tailwind CSS. This calendar allows you to manage and visualize events across different resources with features like drag-and-drop scheduling and event resizing.

Features:-
1-Monthly calendar view with resource rows
2-Drag and drop events between dates and resources
3-Resize events to adjust duration
4-Delete events
5-Mini calendar popup for quick date navigation
6-Color-coded events for better visualization
7-Current date highlighting
8-Responsive design with horizontal scrolling for many resources

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

Event Management:-
Moving Events:
Click and drag an event to move it to a different date or resource
The event maintains its duration when moved

Resizing Events:
Hover over an event to reveal resize handles on both ends
Click and drag the handles to adjust the event's duration


Deleting Events:
Hover over an event to reveal the delete (×) button
Click the button and confirm to delete the event


Resources:
Resources can be modified by updating the initialResources array in the component.
Styling
The calendar uses Tailwind CSS classes for styling. Modify the classes in the component to customize the appearance.
License
This project is licensed under the MIT License - see the LICENSE file for details.