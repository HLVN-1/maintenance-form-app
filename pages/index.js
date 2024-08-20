import Head from 'next/head';
import TaskForm from '../components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Maintenance Task Tracker</title>
        <meta name="description" content="Track maintenance tasks easily" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      <TaskForm />
    </div>
  );
}
