import { name } from 'ejs'
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
  empId:yup.string().matches().required(),
  role:yup.string().required(),
})
