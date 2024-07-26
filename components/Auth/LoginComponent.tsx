import Link from 'next/link';
import Image from 'next/image';
import { Formik, Form as FormikForm, ErrorMessage, useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import useLoginHook from '../../hooks/AuthHooks/useLoginHook';
import logo from '../../public/assets/images/logo.png';
import LoginStyles from '../../styles/components/login.module.scss';

const validation = Yup.object().shape({
  usr: Yup.string().email(' Enter valid email').required(' Email field is required'),
  pwd: Yup.string().required(' Password field is required').min(6, ' Password is too short - should be 6 chars minimum.'),
});

function LoginComponent() {
  const { passwordHidden, togglePasswordIcon, fetchToken } = useLoginHook();

  return (
    <div>
      <Formik
        initialValues={{
          usr: '',
          pwd: '',
        }}
        // validationSchema={validation}
        onSubmit={(values: any) => {
          fetchToken(values);
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <FormikForm>
            <div className="form-wrapper" id="wrapper-login">
              <div className="content-wrapper" id="content-signin">
                <div className="row justify-content-center">
                  <div className={`col-lg-3 col-md-4 ${LoginStyles.main_column}`}>
                    <div className="row ">
                      <div className="col-12">
                        <div className="img">
                          <Link href="/" className="navbar-brand">
                            <Image src={logo} alt="logo" width={60} className="img-fluid mx-auto d-block mb-4 h-auto" priority={true} />
                          </Link>
                        </div>
                        <Form.Group controlId="formEmail">
                          <Form.Label>Email ID </Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            type="text"
                            name="usr"
                            placeholder="Enter Email"
                            className={`${LoginStyles.emailfield}`}
                            onBlur={handleBlur}
                          />
                          <div className={`${LoginStyles.empty} mt-1`}>
                            <ErrorMessage name="usr" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row mt-1 ">
                      <div className="col-12 mt-2">
                        <Form.Group controlId="formPassword">
                          <Form.Label>Password </Form.Label>
                          <div className={`${LoginStyles.input_group}`}>
                            <Form.Control
                              onChange={handleChange}
                              type={passwordHidden ? 'password' : 'text'}
                              name="pwd"
                              placeholder="Enter Password"
                              onBlur={handleBlur}
                            />
                            <span className="input-group-text">
                              {passwordHidden ? (
                                <i className="fa fa-eye-slash" onClick={(e: any) => togglePasswordIcon(e)} />
                              ) : (
                                <i className="fa fa-eye" onClick={(e: any) => togglePasswordIcon(e)} />
                              )}
                            </span>
                          </div>
                          <div className="empty">
                            <ErrorMessage name="pwd" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 d-flex justify-content-center">
                        <button type="submit" className={`${LoginStyles.btn_login} mb-2 mt-2`}>
                          LOGIN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}

export default LoginComponent;
