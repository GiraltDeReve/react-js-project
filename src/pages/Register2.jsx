import axios from 'axios'
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function Register (props) {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=300&sort=libcog')
      .then(result => setCountries(result.data.records))
  }, [])
  const navigate = useNavigate()
  return (
    <div className="d-flex justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-4">
        <h1 className="text-center">Inscription avec Formik</h1>
        <Formik
          initialValues={{ name: '', email: '', password: '', country: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, 'Votre nom doit comporter au moins 2 caractères')
              .max(50, 'Votre nom doit comporter moins de 50 caractères'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post('https://jsonplaceholder.typicode.com/users', values)
              navigate('/')
              props.setUser(values.name)
              setSubmitting(false)
            } catch (error) {
              console.error(error)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <Field type="text" className="form-control" id="name" name="name"/>
                <ErrorMessage name="name" component="div" class="alert alert-warning"/>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="text" className="form-control" id="email" name="email"/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <Field type="password" className="form-control" id="password" name="password"/>
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Pays</label>
                <Field component="select" className="form-select" id="country" name="country">
                  <option value=""></option>
                  {countries.map((country, index) =>
                    <option key={index} value={country.fields.libcog}>{country.fields.libcog}</option>,
                  )}
                </Field>
              </div>
              <div className="d-grid gap">
                <button type="button" className="btn btn-primary btn-expand" disabled={isSubmitting}>Valider</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

Register.propTypes = {
  setUser: propTypes.func.isRequired,
}

export default Register
