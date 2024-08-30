// import { PrismaClient } from "@prisma/client";
// import sendEmail from "../../../components/SendMail"; // Import your email sending utility

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   console.log("Request method:", req.method); // Log the incoming method
//   console.log("Request body:", req.body); // Log the incoming request body

//   switch (req.method) {
//     case "GET":
//       console.log("GET request received");
//       try {
//         const tasks = await prisma.task.findMany();
//         res.status(200).json(tasks);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         res.status(500).json({ error: "Failed to fetch tasks" });
//       }
//       break;

//     case "POST":
//       console.log("POST request received");
//       try {
//         const newTask = await prisma.task.create({
//           data: req.body,
//         });
//         res.status(201).json(newTask);
//       } catch (error) {
//         console.error("Error creating task:", error);
//         res.status(500).json({ error: "Failed to create task" });
//       }
//       break;

//     case "PUT":
//       console.log("PUT request received with body:", req.body);
//       try {
//         const {
//           id,
//           customerName,
//           customerEmail,
//           completed,
//           task: taskName,
//         } = req.body;

//         // Update the task in the database
//         const updatedTask = await prisma.task.update({
//           where: { id: Number(id) },
//           data: { customerName, customerEmail, task: taskName, completed },
//         });
//         console.log("Task updated successfully:", updatedTask);

//         // Send email notification if the task is marked as completed
//         if (completed) {
//           const task = await prisma.task.findUnique({
//             where: { id: Number(id) },
//           });
//           const emailData = {
//             to: customerEmail,
//             subject: "Task Completed",
//             message: `Dear ${customerName},\n\nYour task: "${task.task}" has been marked as completed.`,
//           };

//           try {
//             await sendEmail(emailData.to, emailData.subject, emailData.message);
//             console.log("Email sent successfully to:", customerEmail);
//           } catch (error) {
//             console.error("Error sending email:", error);
//             res.status(500).json({ error: "Failed to send email" });
//             return; // Exit after sending an error response
//           }
//         }

//         res.status(200).json(updatedTask);
//       } catch (error) {
//         console.error("Error updating task:", error);
//         res.status(500).json({ error: "Failed to update task" });
//       }
//       break;

//     case "DELETE":
//       console.log("DELETE request received");
//       try {
//         const { id } = req.query;
//         const taskId = parseInt(id, 10); // Convert the id to a number

//         if (!taskId || isNaN(taskId)) {
//           res.status(400).json({ message: "Invalid task ID" });
//           break;
//         }

//         await prisma.task.delete({
//           where: { id: taskId },
//         });

//         res.status(200).json({ message: "Task deleted successfully" });
//       } catch (error) {
//         console.error("Failed to delete task:", error);
//         res.status(500).json({ message: "Failed to delete task" });
//       }
//       break;

//     default:
//       console.log(`Method ${req.method} not allowed.`);
//       res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// --------

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("Request method:", req.method); // Log the incoming method
  console.log("Request body:", req.body); // Log the incoming request body

  switch (req.method) {
    case "GET":
      console.log("GET request received");
      try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
      }
      break;

    case "POST":
      console.log("POST request received");
      try {
        const newTask = await prisma.task.create({
          data: req.body,
        });
        res.status(201).json(newTask);
      } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
