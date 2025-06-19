import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../image/icon-1.png';
import image2 from '../image/icon-2.png';
import image3 from '../image/icon-3.png';
import image4 from '../image/icon-4.png';
import image5 from '../image/icon-5.png';
import image6 from '../image/icon-6.png';
import image7 from '../image/flask-logo-svg-vector.svg';
import image8 from '../image/kotin2.png';
import '../css/course.css';

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  reviewButton: {
    backgroundColor: '#2196F3',
    color: 'white',
  },
  removeButton: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  box: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px',
    position: 'relative',
    display: 'inline-block',
    width: '200px',
    verticalAlign: 'top',
  },
  img: {
    width: '100px',
    height: '100px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '14px',
    color: '#555',
  },
  price: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  author: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#555',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
  },
  modalHeader: {
    marginBottom: '10px',
  },
  formGroup: {
    marginBottom: '10px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
  },
  formInput: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  signOutButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#f44336',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  reviewSection: {
    marginTop: '40px',
  },
  reviewBox: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px',
    position: 'relative',
    display: 'inline-block',
    width: '200px',
    verticalAlign: 'top',
  },
};

export default function AdminPanel() {
  const [coursesData, setCoursesData] = useState([
    {
      image: image1,
      title: "HTML 5",
      description: "Learn the latest HTML5 standards to create modern, responsive web pages.",
      price: 100,
      slug: "html5",
    },
    {
      image: image2,
      title: "CSS 3",
      description: "Master the art of styling and layout with CSS3, including Flexbox and Grid.",
      price: 200,
      slug: "css3",
    },
    {
      image: image3,
      title: "JavaScript",
      description: "Dive into JavaScript, the language of the web, and build dynamic, interactive websites.",
      price: 0,
      slug: "javascript",
    },
    {
      image: image4,
      title: "SASS",
      description: "Learn SASS, a powerful CSS preprocessor that makes your styling more efficient.",
      price: 130,
      slug: "sass",
    },
    {
      image: image5,
      title: "JQuery",
      description: "Simplify JavaScript with jQuery, the popular library for streamlined coding.",
      price: 150,
      slug: "jquery",
    },
    {
      image: image6,
      title: "React.js",
      description: "Build modern web applications with React.js, the leading front-end library.",
      price: 25,
      slug: "reactjs",
    },
    {
      image: image7,
      title: "Django and Flask",
      description: "Get started with Django and Flask, two of the most popular Python web frameworks.",
      price: 99,
      slug: "django-flask",
    },
    {
      image: image8,
      title: "Kotlin",
      description: "Learn Kotlin, the official language for Android development, and create powerful mobile apps.",
      price: 69.99,
      slug: "kotlin",
    }
  ]);

  const [reviewCourses, setReviewCourses] = useState([
    {
      image: image1,
      title: "HTML",
      description: "Learn HTML language with this comprehensive course.",
      price: 100,
      slug: "htmlprogramming",
      author: "Ashim Paudel",
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    slug: '',
    video: null,
    photo: null,
  });

  const handleAddCourse = (course) => {
    const newCourseData = {
      ...course,
      price: parseFloat(course.price),
      video: course.video ? URL.createObjectURL(course.video) : null,
      photo: course.photo ? URL.createObjectURL(course.photo) : null,
    };

    setCoursesData([...coursesData, newCourseData]);
  };

  const handleRemoveCourse = (slug, isReview = false) => {
    if (isReview) {
      setReviewCourses(prevCourses => prevCourses.filter(course => course.slug !== slug));
    } else {
      setCoursesData(prevCourses => prevCourses.filter(course => course.slug !== slug));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCourse(newCourse);
    setIsAddModalOpen(false);
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = '/login'; // Adjust the route as needed
  };

  const handleAddReviewCourse = (course) => {
    handleAddCourse(course);
    handleRemoveCourse(course.slug, true);
  };

  return (
    <div style={styles.container}>
      <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
      <h1 style={styles.header}>Admin Panel</h1>
      <div style={styles.buttonContainer}>
        <button onClick={() => setIsAddModalOpen(true)} style={{ ...styles.button, ...styles.addButton }}>Add Course</button>
      </div>
      <div>
        <h2 style={styles.header}>Courses List</h2>
        {coursesData.map((course, index) => (
          <div key={index} style={styles.box}>
            <img src={course.photo || course.image} alt={course.title} style={styles.img} />
            <h3 style={styles.title}>{course.title}</h3>
            <p style={styles.description}>{course.description}</p>
            <div style={styles.price}>Rs.{course.price}</div>
            <button onClick={() => handleRemoveCourse(course.slug)} style={{ ...styles.button, ...styles.removeButton }}>Remove Course</button>
            <Link to={`/course/${course.slug}`} className="courses-btn">View Course</Link>
          </div>
        ))}
      </div>
      <div style={styles.reviewSection}>
        <h2 style={styles.header}>Review New Courses</h2>
        {reviewCourses.map((course, index) => (
          <div key={index} style={styles.reviewBox}>
            <img src={course.image} alt={course.title} style={styles.img} />
            <h3 style={styles.title}>{course.title}</h3>
            <p style={styles.description}>{course.description}</p>
            <div style={styles.price}>Rs.{course.price}</div>
            <div style={styles.author}>Author: {course.author}</div>
            <button onClick={() => handleAddReviewCourse(course)} style={{ ...styles.button, ...styles.addButton }}>Add Course</button>
            <button onClick={() => handleRemoveCourse(course.slug, true)} style={{ ...styles.button, ...styles.removeButton }}>Remove Course</button>
            <button style={{ ...styles.button, ...styles.reviewButton }}>Review Course</button>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeader}>Add New Course</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleChange}
                  style={styles.formInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleChange}
                  style={styles.formInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newCourse.price}
                  onChange={handleChange}
                  style={styles.formInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="slug">Slug</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={newCourse.slug}
                  onChange={handleChange}
                  style={styles.formInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="video">Video File</label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  onChange={handleChange}
                  style={styles.formInput}
                  accept="video/*"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="photo">Programming Photo</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleChange}
                  style={styles.formInput}
                  accept="image/*"
                  required
                />
              </div>
              <button type="submit" style={{ ...styles.button, ...styles.addButton }}>Add Course</button>
              <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ ...styles.button, ...styles.removeButton }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
