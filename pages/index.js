// import Head from "next/head";
// import { useEffect, useState } from "react";
// import TaskForm from "../components/TaskForm";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Home() {
//   return (
//     <div>
//       <Head>
//         <title>Maintenance Task Form</title>
//         <meta name="description" content="Submit maintenance tasks easily" />
//         <link rel="icon" href="/favicon.ico" />
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
//         />
//       </Head>
//       <TaskForm />
//     </div>
//   );
// }

import Head from "next/head";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div>
      <Head>
        <title>Maintenance Task Form</title>
        <meta name="description" content="Submit maintenance tasks easily" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      <TaskForm />
      {tasks.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
}
