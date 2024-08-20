import { PrismaClient } from '@prisma/client';
import sendEmail from '../../components/SendMail'; // Import your email sending utility

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Fetch all tasks
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
      break;
    case 'POST':
      // Add a new task
      const newTask = await prisma.task.create({
        data: req.body,
      });
      res.status(201).json(newTask);
      break;
    case 'PUT':

      console.log('req.body in PUT', req.body)
     
      let updatedData = req.body[0];
      let task = req.body[0]
      let id = req.body[0].id;
      let customerName = req.body[0].customerName;
      let customerEmail = req.body[0].customerEmail;
      let completed = req.body[0].completed;


      // Update the task in the database
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { ...updatedData, completed },
      });
      console.log(completed)

      // Send email notification if the task is marked as completed
      if (completed) {
        const task = await prisma.task.findUnique({ where: { id: Number(id) } });
        const emailData = {
          to: customerEmail,
          subject: 'Task Completed',
          message: `Dear ${customerName},\n\nYour task: "${task.task}" has been marked as completed.`,
        };

        try {
          await sendEmail(emailData.to, emailData.subject, emailData.message);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }

      res.status(200).json(updatedTask);
      break;
    case 'DELETE':
      // Delete a task
      const { taskId } = req.query;
      await prisma.task.delete({
        where: { id: Number(taskId) },
      });
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
