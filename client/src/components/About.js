import React from 'react';
import developer1 from '../assets/jai.png';
import developer2 from "../assets/taskier_nowords_orange.png";

const containerStyles = "flex justify-center items-center min-h-screen bg-gradient-to-r from-green-900 to-teal-200";

const cardStyles = "bg-white w-full sm:w-[80vw] p-8 rounded-lg shadow-md";

const titleStyles = "text-2xl font-bold mb-4";
const textStyles = "text-lg mb-4";
const buttonStyles = "inline-block px-4 py-2 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600 transition duration-300";

function About() {
  const developers = [
    {
      name: 'Jai Stellmacher',
      image: developer1,
      link: 'https://github.com/jstellmacher',
    },
    {
      name: 'Matt Roche',
      image: developer2,
      link: 'https://github.com/matthew-j-roche',
    },
    // Add more developers as needed
  ];

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <h1 className={titleStyles}>About Taskier</h1>
        <p className={textStyles}>
          Taskier is a superb task management app designed to streamline and simplify your daily workflow. With its intuitive interface and powerful features, Taskier empowers users to efficiently manage their tasks and boost productivity.
        </p>
        <p className={textStyles}>
          One of Taskier's standout features is its user-centric approach. It provides a personalized experience by allowing users to create an account, access their tasks, and track their progress. Whether you're a professional seeking better task organization or an individual striving to stay on top of personal commitments, Taskier offers a seamless solution tailored to your needs.
        </p>
        <p className={textStyles}>
          In today's fast-paced world, where time management is essential, Taskier is a much-needed tool. With the increasing complexity of work and personal responsibilities, keeping track of tasks and staying organized can be overwhelming. Taskier simplifies this process by providing a centralized platform where users can effortlessly create, manage, and prioritize tasks.
        </p>
        <p className={textStyles}>
          The ability to assign tasks to specific users, set deadlines, and track progress fosters collaboration and ensures effective teamwork. Moreover, Taskier's real-time updates and notifications keep users informed about task updates, ensuring that nothing falls through the cracks. By leveraging Taskier, individuals and teams can achieve better task management, improve efficiency, and ultimately accomplish more in less time.
        </p>

        <div className="flex justify-center mt-8">
          {developers.map((developer, index) => (
            <div key={index} className="text-center mx-4">
              <div className="w-[25vh] h-[25vh] rounded-full overflow-hidden mx-auto mb-2">
                <img src={developer.image} alt={developer.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-lg font-bold mb-2">{developer.name}</p>
              <a href={developer.link} className={buttonStyles} target="_blank" rel="noopener noreferrer">
                Visit GitHub
              </a>
            </div>
          ))}
        </div>

        <p className="text-lg mt-8">
          The Taskier app was developed by Jai Stellmacher and Matt Roche. Both developers put in extensive hours to bring Taskier to life. Matt focused on implementing various functionalities and components, while Jai handled the backend logic and styling. Their combined efforts resulted in a powerful and visually appealing task management solution.
        </p>
      </div>
    </div>
  );
}

export default About;
