import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResumeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState([{ company: '', year: '', designation: '' }]);
  const [experience, setExperience] = useState([{ company: '', year: '', designation: '' }]);
  const [skills, setSkills] = useState([]);

  const handleAddEducation = () => {
    setEducation([...education, { company: '', year: '', designation: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { company: '', year: '', designation: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const handleSkillsChange = (skills) => {
    setSkills(skills);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Address: ${address}`, 10, 30);
    doc.text(`Phone: ${phone}`, 10, 40);
    doc.text('Education:', 10, 50);
    education.forEach((edu, index) => {
      doc.text(`${index + 1}. Company / Institute: ${edu.company}`, 15, 60 + index * 20);
      doc.text(`   Year: ${edu.year}`, 15, 70 + index * 20);
      doc.text(`   Designation / Degree: ${edu.designation}`, 15, 80 + index * 20);
    });
    doc.text('Experience:', 10, 100 + education.length * 20);
    experience.forEach((exp, index) => {
      doc.text(`${index + 1}. Company / Institute: ${exp.company}`, 15, 110 + education.length * 20 + index * 20);
      doc.text(`   Year: ${exp.year}`, 15, 120 + education.length * 20 + index * 20);
      doc.text(`   Designation / Degree: ${exp.designation}`, 15, 130 + education.length * 20 + index * 20);
    });
    doc.text(`Skills: ${skills.join(', ')}`, 10, 150 + education.length * 20 + experience.length * 20);
    doc.save('resume.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="container">
      <h1>Resume Builder</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Education:</Form.Label>
          {education.map((edu, index) => (
            <div key={index}>
              <Form.Group controlId={`education-company-${index}`}>
                <Form.Control
                  type="text"
                  placeholder="Company / Institute"
                  value={edu.company}
                  onChange={(e) => handleEducationChange(index, 'company', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={`education-year-${index}`}>
                <Form.Control
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={`education-designation-${index}`}>
                <Form.Control
                  type="text"
                  placeholder="Designation / Degree"
                  value={edu.designation}
                  onChange={(e) => handleEducationChange(index, 'designation', e.target.value)}
                />
              </Form.Group>
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => handleRemoveEducation(index)}
                  className="mb-3"
                >
                  Remove Education
                </Button>
              )}
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddEducation} className="mb-3">
            Add Education
          </Button>
        </Form.Group>

        <Form.Group>
          <Form.Label>Experience:</Form.Label>
          {experience.map((exp, index) => (
            <div key={index}>
              <Form.Group controlId={`experience-company-${index}`}>
                <Form.Control
                  type="text"
                  placeholder="Company / Institute"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={`experience-year-${index}`}>
                <Form.Control
                  type="text"
                  placeholder="Year"
                  value={exp.year}
                  onChange={(e) => handleExperienceChange(index, 'year', e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId={`experience-designation-${index}`}>
                <Form.Control
                  type="text"
                  placeholder="Designation / Degree"
                  value={exp.designation}
                  onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
                />
              </Form.Group>
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => handleRemoveExperience(index)}
                  className="mb-3"
                >
                  Remove Experience
                </Button>
              )}
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddExperience} className="mb-3">
            Add Experience
          </Button>
        </Form.Group>

        <Form.Group controlId="skills">
          <Form.Label>Skills:</Form.Label>
          <TagsInput value={skills} onChange={handleSkillsChange} />
        </Form.Group>

        <Button type="submit" variant="primary">
          Generate PDF
        </Button>
      </Form>
    </div>
  );
};

export default ResumeForm;
