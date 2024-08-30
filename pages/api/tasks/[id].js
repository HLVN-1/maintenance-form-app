// import { PrismaClient } from "@prisma/client";
// import sendEmail from "../../../components/SendMail";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   console.log("Request received at dynamic route with method:", req.method);
//   // Extract task ID from the URL path
//   const { id } = req.query;
//   const taskId = parseInt(id, 10); // Convert ID to an integer

//   if (isNaN(taskId)) {
//     res.status(400).json({ message: "Invalid task ID" });
//     return;
//   }

//   switch (req.method) {
//     case "GET":
//       try {
//         // Fetch a single task by ID
//         const task = await prisma.task.findUnique({
//           where: { id: taskId },
//         });

//         if (!task) {
//           res.status(404).json({ message: "Task not found" });
//         } else {
//           res.status(200).json(task);
//         }
//       } catch (error) {
//         console.error("Error fetching task:", error);
//         res.status(500).json({ error: "Failed to fetch task" });
//       }
//       break;

//     case "PUT":
//       try {
//         const {
//           customerName,
//           customerEmail,
//           completed,
//           task: taskName,
//         } = req.body;

//         // Update the task in the database
//         const updatedTask = await prisma.task.update({
//           where: { id: taskId },
//           data: { customerName, customerEmail, task: taskName, completed },
//         });

//         res.status(200).json(updatedTask);
//       } catch (error) {
//         console.error("Error updating task:", error);
//         res.status(500).json({ error: "Failed to update task" });
//       }
//       break;

//     case "DELETE":
//       try {
//         // Delete the task
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
//       res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// --------

import { PrismaClient } from "@prisma/client";
import sendEmail from "../../../components/SendMail";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("Request received at dynamic route with method:", req.method);
  const { id } = req.query;
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    res.status(400).json({ message: "Invalid task ID" });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const task = await prisma.task.findUnique({
          where: { id: taskId },
        });
        if (!task) {
          res.status(404).json({ message: "Task not found" });
        } else {
          res.status(200).json(task);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Failed to fetch task" });
      }
      break;

    case "PUT":
      try {
        const {
          customerName,
          customerEmail,
          completed,
          task: taskName,
        } = req.body;
        const updatedTask = await prisma.task.update({
          where: { id: taskId },
          data: { customerName, customerEmail, task: taskName, completed },
        });

        // Send email if completed
        if (completed) {
          const emailData = {
            to: customerEmail,
            subject: "Task Completed",
            message: `Dear ${customerName},\n\nYour task: "${taskName}" has been marked as completed.`,
          };
          await sendEmail(emailData.to, emailData.subject, emailData.message);
        }

        res.status(200).json(updatedTask);
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task" });
      }
      break;

    case "DELETE":
      try {
        await prisma.task.delete({
          where: { id: taskId },
        });
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (error) {
        console.error("Failed to delete task:", error);
        res.status(500).json({ message: "Failed to delete task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
