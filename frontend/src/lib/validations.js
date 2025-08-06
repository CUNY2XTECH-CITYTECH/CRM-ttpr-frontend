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

export const validateAppointmentForm = yup.object().shape({
  title: yup.string().required("Appointment title is required"),
  description: yup.string().max(500, "Description must be less than 500 characters"),
  date: yup.date().required("Appointment date is required").min(new Date(), "Date must be in the future"),
  time: yup.string().required("Appointment time is required"),
  location: yup.string().required("Location is required"),
  attendees: yup.string().required("Attendees are required")
})

export const validateSkillsForm = yup.object().shape({
  name: yup.string().required("Skill name is required").min(2, "Skill name must be at least 2 characters"),
  description: yup.string(),
  category: yup.string().required("Category is required")
})