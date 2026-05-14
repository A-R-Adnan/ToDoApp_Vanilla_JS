# Advanced Todo App

A responsive todo application built with HTML, Tailwind CSS, and vanilla JavaScript. It lets users add, edit, delete, complete, filter, and search tasks, with all task data saved in localStorage.

## Features

- Add new tasks
- Edit tasks inline
- Delete tasks
- Mark tasks as complete or active
- Filter tasks by All, Active, and Completed
- Search tasks by title
- Show total, active, and completed task counts
- Show empty states for no tasks and no matching results
- Save and load tasks with localStorage
- Clear Completed Tasks
- Responsive layout using Tailwind CSS

## Technologies Used

- HTML
- Tailwind CSS
- JavaScript
- localStorage

## Project Structure

```txt
todo-app/
  index.html
  script.js
  package.json
  package-lock.json
  src/
    input.css
    output.css
```

## How To Run

Install dependencies:

```bash
npm install
```

Start Tailwind CLI watch mode:

```bash
npm run dev
```

Then open `index.html` in the browser.

## Main Learning Goals

This project was built to practice:

- DOM selection and manipulation
- Event handling
- Array methods like `forEach`, `filter`, and `includes`
- Object-based task data
- Dynamic rendering
- UI state management
- localStorage persistence
- Responsive design with Tailwind CSS

## Task Object Example

```js
{
  id: 1715610000000,
  title: "Learn JavaScript",
  completed: false,
  createdAt: "5/14/2026"
}
```

## Future Improvements

- Add task priority
- Add due dates
- Add sort by newest or oldest
- Add toast messages
- Improve keyboard accessibility

