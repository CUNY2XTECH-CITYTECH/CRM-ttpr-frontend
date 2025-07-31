import * as yup from 'yup'
const websiteRegex = '^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$'
const zipRegex = '^\d{5}(-\d{4})?$'
export const validateCompaniesForm = yup.object().shape({
  // email, mission, industry,website,city, zipcode, street
  name: yup.string().required(),
  email: yup.string().email().required(),
  mission: yup.string().max(200),
  industry: yup.string().required(),
  website: yup.string().matches(websiteRegex,"invalid website url"),
  city: yup.string().required(),
  street: yup.string().required(),
  zipcode: yup.string().matches(zipRegex,"invalid zipcode").required()
})
