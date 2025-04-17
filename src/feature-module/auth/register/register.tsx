import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { fetchAllCountries, fetchStatesByCountryCode } from "../../../api/commonAPI";
import { register } from "../../../api/authAPI";
import AlertComponent from "../../../core/common/AlertComponent";
type PasswordField = "password" | "confirmPassword";

const Register = () => {
  
  const routes = all_routes;
  const navigation = useNavigate();

  const navigationPath = () => {
    navigation(routes.login);
  };
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    mobileNo: string;
    country_id: number | null;
    state_id: string;
    country_code: string;
    password?: string;
    confirmPassword?: string;
  }>({
    name: "",
    email: "",
    mobileNo: "",
    country_id: null,
    state_id: "",
    country_code: "",
    password: "",
    confirmPassword: "",
  });

  const [countries, setCountries] = useState<{ id: number; name: string; cca2: string; code: string }[]>([]);
  const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await fetchAllCountries();
      if (response.success) {
        setCountries(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch countries" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while fetching countries." });
    }
  };

    // ✅ Fetch states when a country is selected
    const loadStates = async (countryCode: string) => {
      try {
        const response = await fetchStatesByCountryCode(countryCode);
        if (response.success && Array.isArray(response.data)) {
          setStates(response.data);
        } else {
          setStates([]);
          setAlert({ type: "danger", message: response.message || "No states found for this country." });
        }
      } catch (error) {
        setStates([]);
        setAlert({ type: "danger", message: "An error occurred while fetching states." });
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
    
      setFormData((prevFormData) => {
        let updatedForm = { ...prevFormData, [name]: value };
    
        // ✅ If country is changed, fetch its states and reset state_id
        if (name === "country_id") {
          const selectedCountry = countries.find((c) => c.id.toString() === value);
          if (selectedCountry) {
            loadStates(selectedCountry.cca2);
            updatedForm = {
              ...updatedForm,
              country_id: selectedCountry.id,
              state_id: "",
            };
          }
        }
    
        // ✅ Validate password and confirmPassword match
        if (
          (name === "password" || name === "confirmPassword") &&
          updatedForm.password &&
          updatedForm.confirmPassword
        ) {
          if (updatedForm.password !== updatedForm.confirmPassword) {
            setPasswordError("Passwords do not match");
          } else {
            setPasswordError("");
          }
        }
    
        return updatedForm;
      });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
  
      try {
        const { confirmPassword, ...dataToSubmit } = formData; 

        const submissionData = {
          ...dataToSubmit,
          country_id: Number(formData.country_id), // ✅ ensure correct type
        };
        
        const response = await register(submissionData); // ✅ Call API       
  
        if (!response.success) {
          if (response.errors) {
            const errorMessage = Array.isArray(response.errors)
              ? response.errors.join(", ")
              : response.errors; // ✅ fallback to single string
        
            setAlert({ type: "danger", message: errorMessage });
          } else {
            setAlert({
              type: "danger",
              message: response.error || "Failed to add user",
            });
          }
          return;
        }
  
        setAlert({ type: "success", message: "User added successfully!" });
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          country_id: 0, // or 0 if number
          state_id: "",
          country_code: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => navigation(routes.login), 2000);
      } catch (error) {
        setAlert({ type: "danger", message: "An error occurred while adding the user." });
      }
    };

  return (
    <>
      <div className="container-fuild">
      {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        <div className="login-wrapper w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row">
            <div className="col-lg-6">
              <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-lg-block d-none flex-wrap vh-100 overflowy-auto">
                <div>
                  <ImageWithBasePath
                    src="assets/img/authentication/authentication-01.jpg"
                    alt="Img"
                  />
                </div>
                <div className="authen-overlay-item  w-100 p-4">
                  <h4 className="text-white mb-3">
                    What's New on Preskool !!!
                  </h4>
                  <div className="d-flex align-items-center flex-row mb-3 justify-content-between p-3 br-5 gap-3 card">
                    <div>
                      <h6>Summer Vacation Holiday Homework</h6>
                      <p className="mb-0 text-truncate">
                        The school will remain closed from April 20th to June...
                      </p>
                    </div>
                    <Link to="3">
                      <i className="ti ti-chevrons-right" />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center flex-row mb-3 justify-content-between p-3 br-5 gap-3 card">
                    <div>
                      <h6>New Academic Session Admission Start(2024-25)</h6>
                      <p className="mb-0 text-truncate">
                        An academic term is a portion of an academic year, the
                        time ....
                      </p>
                    </div>
                    <Link to="3">
                      <i className="ti ti-chevrons-right" />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center flex-row mb-3 justify-content-between p-3 br-5 gap-3 card">
                    <div>
                      <h6>Date sheet Final Exam Nursery to Sr.Kg</h6>
                      <p className="mb-0 text-truncate">
                        Dear Parents, As the final examination for the session
                        2024-25 is ...
                      </p>
                    </div>
                    <Link to="3">
                      <i className="ti ti-chevrons-right" />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center flex-row mb-3 justify-content-between p-3 br-5 gap-3 card">
                    <div>
                      <h6>Annual Day Function</h6>
                      <p className="mb-0 text-truncate">
                        Annual functions provide a platform for students to
                        showcase their...
                      </p>
                    </div>
                    <Link to="3">
                      <i className="ti ti-chevrons-right" />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center flex-row mb-0 justify-content-between p-3 br-5 gap-3 card">
                    <div>
                      <h6>Summer Vacation Holiday Homework</h6>
                      <p className="mb-0 text-truncate">
                        The school will remain closed from April 20th to June
                        15th for summer...
                      </p>
                    </div>
                    <Link to="3">
                      <i className="ti ti-chevrons-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
                <div className="col-md-8 mx-auto p-4">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div className=" mx-auto mb-5 text-center">
                        <ImageWithBasePath
                          src="assets/img/authentication/authentication-logo.svg"
                          className="img-fluid"
                          alt="Logo"
                        />
                      </div>
                      <div className="card">
                        <div className="card-body p-4">
                          <div className=" mb-4">
                            <h2 className="mb-2">Register</h2>
                            <p className="mb-0">
                              Please enter your details to sign up
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="d-flex align-items-center justify-content-center flex-wrap">
                              <div className="text-center me-2 flex-fill">
                                <Link
                                  to="3"
                                  className="bg-primary br-10 p-2 btn btn-primary  d-flex align-items-center justify-content-center"
                                >
                                  <ImageWithBasePath
                                    className="img-fluid m-1"
                                    src="assets/img/icons/facebook-logo.svg"
                                    alt="Facebook"
                                  />
                                </Link>
                              </div>
                              <div className="text-center me-2 flex-fill">
                                <Link
                                  to="3"
                                  className=" br-10 p-2 btn btn-outline-light  d-flex align-items-center justify-content-center"
                                >
                                  <ImageWithBasePath
                                    className="img-fluid  m-1"
                                    src="assets/img/icons/google-logo.svg"
                                    alt="Facebook"
                                  />
                                </Link>
                              </div>
                              <div className="text-center flex-fill">
                                <Link
                                  to="3"
                                  className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center"
                                >
                                  <ImageWithBasePath
                                    className="img-fluid  m-1"
                                    src="assets/img/icons/apple-logo.svg"
                                    alt="Apple"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="login-or">
                              <span className="span-or">Or</span>
                            </div>
                            <div className="mb-3 ">
                              <label className="form-label">Name</label>
                              <div className="input-icon mb-3 position-relative">
                                <span className="input-icon-addon">
                                  <i className="ti ti-user" />
                                </span>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                              </div>
                              <label className="form-label">
                                Email Address
                              </label>                              
                              <div className="input-icon mb-3 position-relative">
                                <span className="input-icon-addon">
                                  <i className="ti ti-mail" />
                                </span>
                                <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                              </div>
                              <label className="form-label">Country Code</label>
                              <div className="input-icon mb-3 position-relative">
                                <span className="input-icon-addon">
                                  <i className="ti ti-flag" />
                                </span>
                                <select className="form-control" name="country_code" value={formData.country_code} onChange={handleChange} required >
                                <option value="">Select Country Code</option>
                                  {countries.map((country) => (
                                    <option key={country.id} value={country.code}>
                                      {country.name} (+{country.code})
                                    </option>
                                  ))}
                                  {/* Add more as needed */}
                                </select>
                              </div>
                              <label className="form-label">
                                Phone Number
                              </label>
                              <div className="input-icon mb-3 position-relative">
                                <span className="input-icon-addon">
                                  <i className="ti ti-phone" />
                                </span>
                                <input type="text" className="form-control" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
                              </div>
                              <label className="form-label">Country</label>
                              <div className="input-icon mb-3 position-relative">
                                <span className="input-icon-addon">
                                  <i className="ti ti-world" />
                                </span>
                                <select className="form-control" name="country_id" value={formData.country_id ?? ""} onChange={handleChange} required >
                                <option value="">Select Country</option>
                                  {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                      {country.name}
                                    </option>
                                  ))}
                                  {/* Populate dynamically if needed */}
                                </select>
                              </div>
                              <label className="form-label">State</label>
                                <div className="input-icon mb-3 position-relative">
                                  <span className="input-icon-addon">
                                    <i className="ti ti-map" />
                                  </span>
                                  <select className="form-control" name="state_id" value={formData.state_id} onChange={handleChange} required >
                                  <option value="">Select State</option>
                                  {states.map((state) => (
                                    <option key={state.id} value={state.id}>
                                      {state.name}
                                    </option>
                                  ))}
                                    {/* Populate dynamically based on selected country */}
                                  </select>
                                </div>
                              <label className="form-label">Password</label>
                              <div className="pass-group mb-3">
                                <input
                                  type={
                                    passwordVisibility.password
                                      ? "text"
                                      : "password"
                                  }
                                  className="pass-input form-control"
                                  name="password" value={formData.password} onChange={handleChange} required
                                />
                                <span
                                  className={`ti toggle-passwords ${
                                    passwordVisibility.password
                                      ? "ti-eye"
                                      : "ti-eye-off"
                                  }`}
                                  onClick={() =>
                                    togglePasswordVisibility("password")
                                  }
                                ></span>
                              </div>
                              <label className="form-label">
                                Confirm Password
                              </label>
                              <div className="pass-group">
                                <input
                                  type={
                                    passwordVisibility.confirmPassword
                                      ? "text"
                                      : "password"
                                  }
                                  className="pass-input form-control"
                                  name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
                                />
                                <span
                                  className={`ti toggle-passwords ${
                                    passwordVisibility.confirmPassword
                                      ? "ti-eye"
                                      : "ti-eye-off"
                                  }`}
                                  onClick={() =>
                                    togglePasswordVisibility("confirmPassword")
                                  }
                                ></span>
                                {passwordError && (
                                  <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
                                    {passwordError}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="form-wrap form-wrap-checkbox mb-3">
                              <div className="d-flex align-items-center">
                                <div className="form-check form-check-md mb-0 me-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                  />
                                </div>
                                <h6 className="fw-normal text-dark mb-0">
                                  I Agree to
                                  <Link to="#" className="hover-a ">
                                    {" "}
                                    Terms &amp; Privacy
                                  </Link>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button                              
                              type="submit"
                              className="btn btn-primary w-100"
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Already have an account?
                              <Link to={routes.login} className="hover-a ">
                                {" "}
                                Sign In
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 text-center">
                        <p className="mb-0 ">Copyright © 2024 - Preskool</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
