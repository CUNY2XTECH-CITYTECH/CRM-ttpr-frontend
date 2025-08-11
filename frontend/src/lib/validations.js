import * as yup from 'yup'
const websiteRegex = '^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$'
const zipRegex = '^\d{5}(-\d{4})?$'
const phoneRegex = '^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$'
const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$'
export const validateCompaniesForm = yup.object().shape({
  // email, mission, industry,website,city, zipcode, street
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  mission: yup.string().max(200),
  industry: yup.string().required(),
  website: yup.string().matches(websiteRegex, "invalid website url"),
  city: yup.string().required(),
  street: yup.string().required(),
  zipcode: yup.string().matches(zipRegex, "invalid zipcode").required()
})

export const validateDepartmentForm = yup.object().shape({
  name: yup.string().min(3).required(),
  room: yup.string().min(3).required()
})


export const validateInternshipForm = yup.object().shape({
  // email, position, industry,website,city, zipcode, street
  name: yup.string().required(),
  position: yup.string().required(),
  salary: yup.string().max(200),
  requirements: yup.string().required(),
  responsibility: yup.string().required().max(500),
  details: yup.string().required(),
  applicationDeadline: yup.string().required(),
  tags: yup.string().required()
})
export const validateRegisterationForm = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password:yup.string().matches(passwordRegex,"Password must be 8 characters long with a digit, a lowercase, an uppercase and a special character").min(8).required(), 
  id:yup.string().matches().required(),
  role:yup.string().required(),
})

export const validateAppointmentForm = yup.object().shape({
  title: yup.string().required("Appointment title is required"),
  description: yup.string().max(500, "Description must be less than 500 characters"),
  date: yup.date().required("Appointment date is required").min(new Date(), "Date must be in the future"),
  time: yup.string().required("Appointment time is required"),
  location: yup.string().required("Location is required"),
  attendees: yup.string().required("Attendees are required")
})


export const validateStudentForm = yup.object().shape({
  lastName: yup.string().min(2).required(),
  firstName: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phoneNumber: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required(),
  age: yup.number().min(18).max(100).required(),
  DOB: yup.date().required(),
  address: yup.string().required(),
  school: yup.string().required(),
  studentId: yup.string().required(),
  graduationYear: yup.number().min(new Date().getFullYear()).max(new Date().getFullYear() + 10).required(),
  resume: yup.mixed().required("Resume is required"),
  LinkedIn: yup.string().url("Invalid LinkedIn URL").optional(),
  GitHub: yup.string().url("Invalid GitHub URL").optional(),
  skills: yup.string().optional()
})


export const validateViewBoard = yup.object().shape({
position: yup.string().required("Position is required"),
  company: yup.string().required("Company is required"),
  location: yup.string().required("Location is required"),
  salary: yup.string().required(),
  description: yup.string().required("Description is required").max(500, "Description must be less than 500 characters"),
  requirements: yup.string().required("Requirements are required"),
  applicationDeadline: yup.date().required("Application deadline is required").min(new Date(), "Deadline must be in the future")
})