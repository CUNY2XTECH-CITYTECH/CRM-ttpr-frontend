import { name } from 'ejs'
import * as yup from 'yup'
const websiteRegex = '^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$'
const zipRegex = '^\d{5}(-\d{4})?$'
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
