import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { sendOTP, VerifyOTP, changePassword } from "../../../api/authAPI";

const ForgotPassword = () => {
  const routes = all_routes;
  const navigation = useNavigate();

  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await sendOTP({ email: formData.email,"type":"forgot" });
    if (response.success) {
      setAlert({ type: "success", message: "OTP sent to your email." });
      setStep("otp");
    } else {
      setAlert({ type: "danger", message: response.message || "Failed to send OTP" });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await VerifyOTP({ email: formData.email, otp: formData.otp });
    if (response.success) {
      setAlert({ type: "success", message: "OTP verified. You can now reset password." });
      setStep("reset");
    } else {
      setAlert({ type: "danger", message: response.message || "Invalid OTP" });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match!" });
      return;
    }

    const response = await changePassword({
      email: formData.email,
      newPassword: formData.password,
    });

    if (response.success) {
      setAlert({ type: "success", message: "Password reset successfully!" });
      setTimeout(() => navigation(routes.login), 2000);
    } else {
      setAlert({ type: "danger", message: response.message || "Failed to reset password" });
    }
  };

  const renderAlert = () =>
    alert && (
      <div className={`alert alert-${alert.type}`} role="alert">
        {alert.message}
      </div>
    );

  return (
    <div className="container-fuild">
      <div className="login-wrapper w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row">
        <div className="col-lg-6">
          <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-lg-block d-none flex-wrap vh-100 overflowy-auto">
            <div>
              <ImageWithBasePath
                src="assets/img/authentication/authentication-03.jpg"
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
                <Link to="#">
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
                <Link to="#">
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
                <Link to="#">
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
                <Link to="#">
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
                <Link to="#">
                  <i className="ti ti-chevrons-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>

          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
              <div className="col-md-8 mx-auto p-4">
                <form onSubmit={
                  step === "email"
                    ? handleSendOTP
                    : step === "otp"
                    ? handleVerifyOTP
                    : handleChangePassword
                }>
                  <div className="text-center mb-5">
                    <ImageWithBasePath
                      src="assets/img/authentication/authentication-logo.svg"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </div>
                  <div className="card">
                    <div className="card-body p-4">
                      <h2 className="mb-2 text-center">Forgot Password</h2>
                      {renderAlert()}

                      {step === "email" && (
                        <div className="mb-3">
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      )}

                      {step === "otp" && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">OTP</label>
                            <input
                              type="text"
                              name="otp"
                              className="form-control"
                              value={formData.otp}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </>
                      )}

                      {step === "reset" && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </>
                      )}

                      <div className="mb-3">
                        <button type="submit" className="btn btn-primary w-100">
                          {step === "email"
                            ? "Send OTP"
                            : step === "otp"
                            ? "Verify OTP"
                            : "Reset Password"}
                        </button>
                      </div>

                      <div className="text-center">
                        <h6 className="fw-normal text-dark mb-0">
                          Return to <Link to={routes.login}>Login</Link>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <p className="mb-0">© 2024 - Preskool</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
