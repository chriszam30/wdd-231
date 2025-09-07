// Menu functionality
const menu = document.querySelector(".burger-menu");
const mobileMenu = document.querySelector(".menu-mobile");

const toggleMenu = () => {
  mobileMenu.style.display = mobileMenu.style.display === "none" ? "block" : "none";
};
menu.addEventListener("click", toggleMenu);


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];


const updateFooterDates = () => {
  const currentYear = new Date().getFullYear();
  const copyright = document.querySelector(".footer");
  copyright.innerHTML = copyright.innerHTML.replace("2025", currentYear);

  const lastMod = document.querySelector(".lastmodification");
  lastMod.textContent = `Last Modification: ${document.lastModified}`;
};


const courseList = document.querySelector(".certificates ol");
const filterButtons = document.querySelectorAll(".certificates ul li");

const displayCourses = (filteredCourses) => {
  courseList.innerHTML = "";
  filteredCourses.forEach(course => {
    const li = document.createElement("li");
    const courseCode = `${course.subject} ${course.number}`;
    li.textContent = `${courseCode} - ${course.title} (${course.credits} credits)`;
    
    // Add tooltip with course description and technologies
    li.title = `${course.description}\nTechnologies: ${course.technology.join(', ')}`;
    
    if (course.completed) {
      li.style.color = "#4CAF50";  
    }
    courseList.appendChild(li);
  });

  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  document.querySelector(".total-credits").textContent = 
    `The total credits for the courses listed above is ${totalCredits}`;
};


filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.textContent;
    let filteredCourses;

    if (filter === "All") {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter(course => course.subject === filter);
    }

    displayCourses(filteredCourses);
  });
});


updateFooterDates();
displayCourses(courses);
