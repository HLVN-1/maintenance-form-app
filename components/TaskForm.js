import React, { useState, useEffect } from "react";
// import { useState, useEffect } from "react";

export default function TaskForm() {
  const [taskInput, setTaskInput] = useState("");
  const [customerNameInput, setCustomerNameInput] = useState("");
  const [customerEmailInput, setCustomerEmailInput] = useState("");
  const [customerPhoneInput, setCustomerPhoneInput] = useState("");
  const [customerAddressInput, setCustomerAddressInput] = useState("");
  const [customerHoursInput, setCustomerHoursInput] = useState("");
  const [receiveDateInput, setReceiveDateInput] = useState("");
  const [routeInput, setRouteInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [productColorInput, setProductColorInput] = useState("");
  const [productBrandInput, setProductBrandInput] = useState("");
  const [productTypeInput, setProductTypeInput] = useState("");
  const [productQuantityInput, setProductQuantityInput] = useState("");
  const [problemFoundInput, setProblemFoundInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const receiveDate = new Date("2024-12-31T00:00:00.000Z");
  const formattedDate = receiveDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("/api/tasks");
      const tasks = await response.json();
      setTasks(tasks);
    }

    fetchTasks();
  }, []);

  //function to return date of submission
  function formatDateString(dateString) {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${month}/${day}/${year}`;
  }

  // Function to check if the date is in the past
  function isPastDate(dateString) {
    const dateParts = dateString.split("-");
    const selectedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return selectedDate < startOfDay;
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
      alert("Please select a submission date.");
      return;
    }

    if (priorityInput === "") {
      alert("Please select a priority level.");
      return;
    }

    // if (!isValidEmail(customerEmailInput)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }

    // if (!isValidPhone(customerPhoneInput)) {
    //   alert("Please enter a valid phone number.");
    //   return;
    // }

    if (isPastDate(receiveDateInput)) {
      alert(
        "The selected submission date is in the past. Please choose a valid date."
      );
      return;
    }

    // Create a new task item with only non-empty fields
    // const taskItem = {};
    // if (taskInput) taskItem.task = taskInput;
    // if (customerNameInput) taskItem.customerName = customerNameInput;
    // if (customerEmailInput) taskItem.customerEmail = customerEmailInput;
    // if (customerAddressInput) taskItem.customerAddress = customerAddressInput;
    // if (customerHoursInput) taskItem.customerHours = customerHoursInput;
    // if (customerPhoneInput) taskItem.customerPhone = customerPhoneInput;
    // if (routeInput) taskItem.route = routeInput;
    // if (receiveDateInput) taskItem.receiveDate = new Date(receiveDateInput);
    // if (priorityInput) taskItem.priority = priorityInput;
    // if (productColorInput) taskItem.productColor = productColorInput;
    // if (productBrandInput) taskItem.productBrand = productBrandInput;
    // if (productTypeInput) taskItem.productType = productTypeInput;
    // if (productQuantityInput) taskItem.productQuantity = productQuantityInput;
    // if (problemFoundInput) taskItem.problemFound = problemFoundInput;
    // taskItem.completed = false;

    const taskItem = {
      task: taskInput,
      customerName: customerNameInput,
      customerEmail: customerEmailInput,
      customerAddress: customerAddressInput,
      customerHours: customerHoursInput,
      customerPhone: customerPhoneInput,
      route: routeInput,
      receiveDate: new Date(receiveDateInput),
      priority: priorityInput,
      productColor: productColorInput,
      productBrand: productBrandInput,
      productType: productTypeInput,
      productQuantity: productQuantityInput,
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
      setCustomerHoursInput("");
      setCustomerAddressInput("");
      setRouteInput("");
      setReceiveDateInput("");
      setPriorityInput("");
      setProductColorInput("");
      setProductBrandInput("");
      setProductTypeInput("");
      setProductQuantityInput("");
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

    const taskId = newTasks[index].id;
    const updatedTask = { id: taskId, completed: newTasks[index].completed };

    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update task: ${response.status} ${response.statusText}`
      );
    }
  }

  // Delete a task from the list
  async function deleteTask(index) {
    const taskId = tasks[index].id;
    console.log(`Deleting task with ID ${taskId}`);
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);
    if (!response.ok) {
      throw new Error(
        `Failed to delete task: ${response.status} ${response.statusText}`
      );
    }

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
      <h1>Maintenance Task Form</h1>
      <div className="task-form">
        <div className="form-group">
          <label>Contact Name*</label>
          <input
            type="text"
            id="customerNameInput"
            placeholder="Enter contact's name"
            value={customerNameInput}
            onChange={(e) => setCustomerNameInput(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Your Email</label>
          <input
            type="email"
            id="customerEmailInput"
            placeholder="Enter your email if you want confirmation"
            value={customerEmailInput}
            onChange={(e) => setCustomerEmailInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Customer's Address*</label>
          <input
            type="text"
            // id="customerAddressInput"
            placeholder="Enter the address"
            value={customerAddressInput}
            onChange={(e) => setCustomerAddressInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Customer Hours</label>
          <input
            type="text"
            id="customerHours"
            placeholder="Customer's hours?"
            value={customerHoursInput}
            onChange={(e) => setCustomerHoursInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date of Form Submission</label>
          <input
            type="date"
            id="receiveDateInput"
            placeholder="Select submission date"
            value={receiveDateInput}
            onChange={(e) => setReceiveDateInput(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="form-group">
          <label>Route #</label>
          <input
            type="text"
            id="routeInput"
            placeholder="Enter route #"
            value={routeInput}
            onChange={(e) => setRouteInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Brand</label>
          <input
            type="text"
            id="productBrandInput"
            placeholder="Sanis/Sig"
            value={productBrandInput}
            onChange={(e) => setProductBrandInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Type</label>
          <input
            type="text"
            id="productTypeInput"
            placeholder="JRT, Auto Soap, etc"
            value={productTypeInput}
            onChange={(e) => setProductTypeInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Color</label>
          <input
            type="text"
            id="productColorInput"
            placeholder="Indigo, Black, etc"
            value={productColorInput}
            onChange={(e) => setProductColorInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="text"
            id="productQuantityInput"
            placeholder="How many?"
            value={productQuantityInput}
            onChange={(e) => setProductQuantityInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>What do you need done?</label>
          <textarea
            type="text"
            className="mobile-text-field"
            id="taskInput"
            placeholder="Enter task description"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
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
        </div>

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
              <strong>Priority:</strong> {task.priority}
              <br />
              <strong>Submission Date:</strong> {task.receiveDate.split("T")[0]}
              <br />
              <strong>Contact Name:</strong> {task.customerName}
              <br />
              <strong>Customer's Address:</strong> {task.customerAddress}
              <br />
              <strong>Customer Hours:</strong> {task.customerHours}
              <br />
              <strong>Email:</strong> {task.customerEmail}
              <br />
              <strong>Phone:</strong> {task.customerPhone}
              <br />
              <strong>Route #:</strong> {task.route}
              <br />
              <strong>Product Color:</strong> {task.productColor}
              <br />
              <strong>Product Brand:</strong> {task.productBrand}
              <br />
              <strong>Product Type:</strong> {task.productType}
              <br />
              <strong>Product Quantity:</strong> {task.productQuantity}
              <br />
              <strong>Task:</strong> {task.task}
              <br />
              {/* <strong>Problem Found:</strong> {task.problemFound} */}
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
        {/* <div className="social-links">
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
        </div> */}
        <div className="company-info">
          <p>© 2024 Maintenance Solutions Inc. All Rights Reserved.</p>
          <p>Contact us at maintenance.form.app@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
