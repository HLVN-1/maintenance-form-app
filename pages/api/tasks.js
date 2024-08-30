import { PrismaClient } from "@prisma/client";
import sendEmail from "../../components/SendMail"; // Import your email sending utility
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Fetch all tasks
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
      break;
    case "POST":
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
    case "PUT":
      console.log("req.body in PUT", req.body);

      const {
        id,
        customerName,
        customerEmail,
        completed,
        task: taskName,
      } = req.body;

      // Update the task in the database
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { customerName, customerEmail, task: taskName, completed },
      });
      console.log(completed);

      // Send email notification if the task is marked as completed
      if (completed) {
        const task = await prisma.task.findUnique({
          where: { id: Number(id) },
        });
        const emailData = {
          to: customerEmail,
          subject: "Task Completed",
          message: `Dear ${customerName},\n\nYour task: "${task.task}" has been marked as completed.`,
        };

        try {
          await sendEmail(emailData.to, emailData.subject, emailData.message);
          console.log("Email sent successfully");
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }

      res.status(200).json(updatedTask);
      break;
    case "DELETE":
      // Delete a task
      const { taskId } = req.query.id;
      if (!taskId || isNaN(Number(taskId))) {
        res.status(400).json({ message: "Invalid task ID" });
        break;
      }

      try {
        const task = await prisma.task.findUnique({
          where: { id: Number(taskId) },
        });
        if (!task) {
          console.log(`Task with ID ${taskId} not found`);
          res.status(404).json({ message: "Task not found" });
        } else {
          await prisma.task.delete({ where: { id: Number(taskId) } });
          res.status(204).end();
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting task" });
      }
      break;
  }
}
