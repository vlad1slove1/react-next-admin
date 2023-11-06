import * as yup from 'yup'

export const schema = yup.object({
  about: yup
    .string()
    .required('About is required')
    .min(10, 'Ten characters minimum'),
  address: yup
    .string()
    .required('Address is required')
    .min(4, 'Four characters minimum'),
  author: yup
    .string()
    .required('Author is required')
    .min(4, 'For characters minimum'),
  company: yup
    .string()
    .required('Company is required')
    .min(4, 'Four characters minimum'),
  contact: yup
    .string()
    .required('Contact is required')
    .min(4, 'Four characters minimum'),
  createdAt: yup.date().required('Date is required'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),
  price: yup
    .number()
    .required('Price is required')
    .min(1, 'At least one dollar'),
  id: yup.number()
})

export type FormData = yup.InferType<typeof schema>
