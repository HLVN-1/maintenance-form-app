import React, { useState } from "react";
// import { useState, useEffect } from "react";

export default function TaskForm() {
  const [taskInput, setTaskInput] = useState("");
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [customerEmailInput, setCustomerEmailInput] = useState("");
  const [customerPhoneInput, setCustomerPhoneInput] = useState("");
  const [receiveDateInput, setReceiveDateInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [productColorInput, setProductColorInput] = useState("");
  const [productBrandInput, setProductBrandInput] = useState("");
  const [productTypeInput, setProductTypeInput] = useState("");
  const [problemFoundInput, setProblemFoundInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const receiveDate = new Date("2024-12-31T00:00:00.000Z");
  const formattedDate = receiveDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  //function to return date of submission
  function formatDateString(dateString) {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${month}/${day}/${year}`;
  }

  // Function to check if the date is in the past
  function isPastDate(date) {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate < today.setHours(0, 0, 0, 0);
  }

  // Function to validate email
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Function to validate phone number
  function isValidPhone(phone) {
    const phonePattern = /^\+?[0-9]{7,15}$/;
    return phonePattern.test(phone);
  }

  // Add a task to the list
  async function addTask() {
    // Input validation
    if (taskInput === "") {
      alert("Please enter a task description.");
      return;
    }

    if (customerNameInput === "") {
      alert("Please enter the customer name.");
      return;
    }

    if (receiveDateInput === "") {
      alert("Please select a receive date.");
      return;
    }

    if (priorityInput === "") {
      alert("Please select a priority level.");
      return;
    }

    if (!isValidEmail(customerEmailInput)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(customerPhoneInput)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (isPastDate(receiveDateInput)) {
      alert(
        "The selected receive date is in the past. Please choose a valid date."
      );
      return;
    }

    // Create a new task item
    const taskItem = {
      task: taskInput,
      customerName: customerNameInput,
      customerEmail: customerEmailInput,
      customerPhone: customerPhoneInput,
      receiveDate: new Date(receiveDateInput),
      priority: priorityInput,
      productColor: productColorInput,
      productBrand: productBrandInput,
      productType: productTypeInput,
      problemFound: problemFoundInput,
      completed: false,
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);

      // Clear inputs
      setTaskInput("");
      setCustomerNameInput("");
      setCustomerEmailInput("");
      setCustomerPhoneInput("");
      setReceiveDateInput("");
      setPriorityInput("");
      setProductColorInput("");
      setProductBrandInput("");
      setProductTypeInput("");
      setProblemFoundInput("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("There was an error adding the task. Please try again.");
    }
  }

  // Mark a task as completed
  async function markCompleted(index) {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);

    const response = await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTasks),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }
  }

  // Delete a task from the list
  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  // Filter tasks based on search input and dropdowns
  function filterTasks() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value;
    const priorityFilter = document.getElementById("priorityFilter").value;

    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach((task) => {
      const taskText = task.textContent.toLowerCase();
      const isCompleted = task.classList.contains("completed");

      let matchesSearch = taskText.includes(searchInput);
      let matchesStatus =
        (statusFilter === "completed" && isCompleted) ||
        (statusFilter === "pending" && !isCompleted) ||
        statusFilter === "";
      let matchesPriority =
        priorityFilter === "" ||
        taskText.includes(priorityFilter.toLowerCase());

      if (matchesSearch && matchesStatus && matchesPriority) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  }

  // Dark Mode Toggle
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  return (
    <div className="container">
      <h1>Maintenance Task Tracker</h1>
      <div className="task-form">
        <input
          type="text"
          id="taskInput"
          placeholder="Task Description"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input
          type="text"
          id="customerNameInput"
          placeholder="Customer Name"
          value={customerNameInput}
          onChange={(e) => setCustomerNameInput(e.target.value)}
        />
        <input
          type="email"
          id="customerEmailInput"
          placeholder="Customer Email"
          value={customerEmailInput}
          onChange={(e) => setCustomerEmailInput(e.target.value)}
        />
        <input
          type="tel"
          id="customerPhoneInput"
          placeholder="Customer Phone"
          value={customerPhoneInput}
          onChange={(e) => setCustomerPhoneInput(e.target.value)}
        />
        <input
          type="date"
          id="receiveDateInput"
          placeholder="Receive Date"
          value={receiveDateInput}
          onChange={(e) => setReceiveDateInput(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
        <select
          id="priorityInput"
          value={priorityInput}
          onChange={(e) => setPriorityInput(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {/* Product Information */}
        <input
          type="text"
          id="productColorInput"
          placeholder="Product Color"
          value={productColorInput}
          onChange={(e) => setProductColorInput(e.target.value)}
        />
        <input
          type="text"
          id="productBrandInput"
          placeholder="Product Brand"
          value={productBrandInput}
          onChange={(e) => setProductBrandInput(e.target.value)}
        />
        <input
          type="text"
          id="productTypeInput"
          placeholder="Product Type"
          value={productTypeInput}
          onChange={(e) => setProductTypeInput(e.target.value)}
        />
        <input
          type="text"
          id="problemFoundInput"
          placeholder="Problem Found"
          value={problemFoundInput}
          onChange={(e) => setProblemFoundInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filters">
        <input
          type="text"
          id="searchInput"
          placeholder="Search tasks"
          onKeyUp={filterTasks}
        />
        <select id="statusFilter" onChange={filterTasks}>
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <select id="priorityFilter" onChange={filterTasks}>
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <ul id="taskList">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div>
              <strong>Task:</strong> {task.task}
              <br />
              <strong>Customer Name:</strong> {task.customerName}
              <br />
              <strong>Email:</strong> {task.customerEmail}
              <br />
              <strong>Phone:</strong> {task.customerPhone}
              <br />
              <strong>Receive Date:</strong> {task.receiveDate.split("T")[0]}
              <br />
              <strong>Priority:</strong> {task.priority}
              <br />
              <strong>Product Color:</strong> {task.productColor}
              <br />
              <strong>Product Brand:</strong> {task.productBrand}
              <br />
              <strong>Product Type:</strong> {task.productType}
              <br />
              <strong>Problem Found:</strong> {task.problemFound}
            </div>
            <div className="actions">
              <button onClick={() => markCompleted(index)}>
                {task.completed ? "Unmark" : "Complete"}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
      {/* Footer Component */}
      <footer className="footer">
        <div className="social-links">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="" alt="Twitter" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/facebook-icon.png" alt="Facebook" />
          </a>
        </div>
        <div className="company-info">
          <p>© 2024 Maintenance Solutions Inc. All Rights Reserved.</p>
          <p>Contact us at support@maintenancesolutions.com</p>
        </div>
      </footer>
    </div>
  );
}
