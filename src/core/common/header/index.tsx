import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataLayout,
  setDataTheme,
} from "../../data/redux/themeSettingSlice";
import ImageWithBasePath from "../imageWithBasePath";
import {
  setExpandMenu,
  setMobileSidebar,
  toggleMiniSidebar,
} from "../../data/redux/sidebarSlice";
import { useState } from "react";
import { all_routes } from "../../../feature-module/router/all_routes";
import { logout } from "../../data/redux/authSlice";
import { useNavigate } from "react-router-dom";
import PracticeHeader from "./practiceHeader";

const Header = () => {
  const routes = all_routes;
  const dispatch = useDispatch();
  const dataTheme = useSelector((state: any) => state.themeSetting.dataTheme);
  const dataLayout = useSelector((state: any) => state.themeSetting.dataLayout);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const navigate = useNavigate();

  const mobileSidebar = useSelector(
    (state: any) => state.sidebarSlice.mobileSidebar
  );

  const toggleMobileSidebar = () => {
    dispatch(setMobileSidebar(!mobileSidebar));
  };

  const onMouseEnter = () => {
    dispatch(setExpandMenu(true));
  };
  const onMouseLeave = () => {
    dispatch(setExpandMenu(false));
  };
  const handleToggleMiniSidebar = () => {
    if (dataLayout === "mini_layout") {
      dispatch(setDataLayout("default_layout"));
      localStorage.setItem("dataLayout", "default_layout");
    } else {
      dispatch(toggleMiniSidebar());
    }
  };

  const handleToggleClick = () => {
    if (dataTheme === "default_data_theme") {
      dispatch(setDataTheme("dark_data_theme"));
      // localStorage.setItem(dataTheme,"dark_data_theme")
    } else {
      dispatch(setDataTheme("default_data_theme"));
      // localStorage.removeItem(dataTheme)
    }
  };
  const location = useLocation();
  const toggleNotification = () => {
    setNotificationVisible(!notificationVisible);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {});
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch((err) => {});
        }
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Clear token from Redux & storage
    navigate("/"); // Redirect to login page
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <div
          className="header-left active"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link to={routes.adminDashboard} className="logo logo-normal">
            <ImageWithBasePath src="assets/img/logo-black.png" alt="Logo" />
          </Link>
          <Link to={routes.adminDashboard} className="logo-small">
            <ImageWithBasePath src="assets/img/logo-black.png" alt="Logo" />
          </Link>
          <Link to={routes.adminDashboard} className="dark-logo">
            <ImageWithBasePath src="assets/img/light-logo.png" alt="Logo" />
          </Link>
          <Link id="toggle_btn" to="#" onClick={handleToggleMiniSidebar}>
            <i className="ti ti-menu-deep" />
          </Link>
        </div>
        {/* /Logo */}
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#sidebar"
          onClick={toggleMobileSidebar}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        <div className="header-user">
          <div className="nav user-menu">
            {/* Search */}
            {/* <div className="nav-item nav-search-inputs">
              <div className="top-nav-search">
                <Link to="#" className="responsive-search">
                  <i className="fa fa-search" />
                </Link>
                <form action="#" className="dropdown">
                  <div className="searchinputs" id="dropdownMenuClickable">
                    <input type="text" placeholder="Search" />
                    <div className="search-addon">
                      <button type="submit">
                        <i className="ti ti-command" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
            <div className="navlinks">
              <nav className="navbars">
                <ul className="nav-list">
                  <li className="nav-item">
                    <Link to={routes.adminDashboard}>
                      <span className="sub-menu">Dashboard</span>
                    </Link>
                  </li>
                  <li
                    className="nav-item mega-menu-parent"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <PracticeHeader showMegaMenu={showMegaMenu} />
                  </li>
                  <li className="nav-item">
                    <Link to={routes.community}>
                      <span className="sub-menu">Community</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={routes.studyTool}>
                      <span className="sub-menu">Study Tools</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={routes.subscriptionPlan}>
                      <span className="sub-menu">Subscription</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            {/* /Search */}
            <div className="d-flex align-items-center">
              {/* <div className="dropdown me-2">
                <Link
                  to="#"
                  className="btn btn-outline-light fw-normal bg-white d-flex align-items-center p-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="ti ti-calendar-due me-1" />
                  Academic Year : 2024 / 2025
                </Link>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link
                    to="#"
                    className="dropdown-item d-flex align-items-center"
                  >
                    Academic Year : 2023 / 2024
                  </Link>
                  <Link
                    to="#"
                    className="dropdown-item d-flex align-items-center"
                  >
                    Academic Year : 2022 / 2023
                  </Link>
                  <Link
                    to="#"
                    className="dropdown-item d-flex align-items-center"
                  >
                    Academic Year : 2021 / 2022
                  </Link>
                </div>
              </div> */}
              <div className="search">
                <Link
                  to=""
                  className="freeuser d-flex justify-content-center align-items-center me-1 p-2 px-4  text-white"
                  style={{ width: "8em !important" }}
                >
                  <p style={{ fontWeight: "400" }}>Free User</p>
                </Link>
              </div>
              <div className="search">
                <Link
                  to={routes.search}
                  className="btn btn-outline-light bg-white btn-icon d-flex justify-content-center align-items-center me-1 p-2"
                >
                  <i className="fa fa-search"></i>
                </Link>
              </div>
              <div className="pe-1 ms-1">
                <div className="dropdown">
                  <Link
                    to="#"
                    className="btn btn-outline-light bg-white btn-icon d-flex align-items-center me-1 p-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <ImageWithBasePath
                      src="assets/img/flags/us.png"
                      alt="Language"
                      className="img-fluid rounded-pill"
                    />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link
                      to="#"
                      className="dropdown-item active d-flex align-items-center"
                    >
                      <ImageWithBasePath
                        className="me-2 rounded-pill"
                        src="assets/img/flags/us.png"
                        alt="Img"
                        height={22}
                        width={22}
                      />{" "}
                      English
                    </Link>
                    <Link
                      to="#"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <ImageWithBasePath
                        className="me-2 rounded-pill"
                        src="assets/img/flags/fr.png"
                        alt="Img"
                        height={22}
                        width={22}
                      />{" "}
                      French
                    </Link>
                    <Link
                      to="#"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <ImageWithBasePath
                        className="me-2 rounded-pill"
                        src="assets/img/flags/es.png"
                        alt="Img"
                        height={22}
                        width={22}
                      />{" "}
                      Spanish
                    </Link>
                    <Link
                      to="#"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <ImageWithBasePath
                        className="me-2 rounded-pill"
                        src="assets/img/flags/de.png"
                        alt="Img"
                        height={22}
                        width={22}
                      />{" "}
                      German
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pe-1">
                {!location.pathname.includes("layout-dark") && (
                  <Link
                    onClick={handleToggleClick}
                    to="#"
                    id="dark-mode-toggle"
                    className="dark-mode-toggle activate btn btn-outline-light bg-white btn-icon me-1"
                  >
                    <i
                      className={
                        dataTheme === "default_data_theme"
                          ? "ti ti-moon"
                          : "ti ti-brightness-up"
                      }
                    />
                  </Link>
                )}
              </div>
              <div
                className={`pe-1 ${
                  notificationVisible ? "notification-item-show" : ""
                }`}
                id="notification_item"
              >
                <Link
                  onClick={toggleNotification}
                  to="#"
                  className="btn btn-outline-light bg-white btn-icon position-relative me-1"
                  id="notification_popup"
                >
                  <i className="ti ti-bell" />
                  <span className="notification-status-dot" />
                </Link>
                <div className="dropdown-menu dropdown-menu-end notification-dropdown p-4">
                  <div className="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                    <h4 className="notification-title">Notifications (2)</h4>
                    <div className="d-flex align-items-center">
                      <Link to="#" className="text-primary fs-15 me-3 lh-1">
                        Mark all as read
                      </Link>
                      <div className="dropdown">
                        <Link
                          to="#"
                          className="bg-white dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-calendar-due me-1" />
                          Today
                        </Link>
                        <ul className="dropdown-menu mt-2 p-3">
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              This Week
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              Last Week
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              Last Week
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="noti-content">
                    <div className="d-flex flex-column">
                      <div className="border-bottom mb-3 pb-3">
                        <Link to={routes.activity}>
                          <div className="d-flex">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-27.jpg"
                                alt="Profile"
                              />
                            </span>
                            <div className="flex-grow-1">
                              <p className="mb-1">
                                <span className="text-dark fw-semibold">
                                  Shawn
                                </span>{" "}
                                performance in Math is below the threshold.
                              </p>
                              <span>Just Now</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="border-bottom mb-3 pb-3">
                        <Link to={routes.activity} className="pb-0">
                          <div className="d-flex">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-23.jpg"
                                alt="Profile"
                              />
                            </span>
                            <div className="flex-grow-1">
                              <p className="mb-1">
                                <span className="text-dark fw-semibold">
                                  Sylvia
                                </span>{" "}
                                added appointment on 02:00 PM
                              </p>
                              <span>10 mins ago</span>
                              <div className="d-flex justify-content-start align-items-center mt-1">
                                <span className="btn btn-light btn-sm me-2">
                                  Deny
                                </span>
                                <span className="btn btn-primary btn-sm">
                                  Approve
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="border-bottom mb-3 pb-3">
                        <Link to={routes.activity}>
                          <div className="d-flex">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-25.jpg"
                                alt="Profile"
                              />
                            </span>
                            <div className="flex-grow-1">
                              <p className="mb-1">
                                New student record{" "}
                                <span className="text-dark fw-semibold">
                                  {" "}
                                  George
                                </span>{" "}
                                is created by{" "}
                                <span className="text-dark fw-semibold">
                                  Teressa
                                </span>
                              </p>
                              <span>2 hrs ago</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="border-0 mb-3 pb-0">
                        <Link to={routes.activity}>
                          <div className="d-flex">
                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-01.jpg"
                                alt="Profile"
                              />
                            </span>
                            <div className="flex-grow-1">
                              <p className="mb-1">
                                A new teacher record for{" "}
                                <span className="text-dark fw-semibold">
                                  Elisa
                                </span>
                              </p>
                              <span>09:45 AM</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex p-0">
                    <Link to="#" className="btn btn-light w-100 me-2">
                      Cancel
                    </Link>
                    <Link
                      to={routes.activity}
                      className="btn btn-primary w-100"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
              <div className="dropdown ms-1">
                <Link
                  to="#"
                  className="dropdown-toggle d-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <span className="avatar avatar-md rounded">
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-27.jpg"
                      alt="Img"
                      className="img-fluid"
                    />
                  </span>
                </Link>
                <div className="dropdown-menu">
                  <div className="d-block">
                    <div className="d-flex align-items-center p-2">
                      <span className="avatar avatar-md me-2 online avatar-rounded">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-27.jpg"
                          alt="img"
                        />
                      </span>
                      <div>
                        <h6>Kevin Larry</h6>
                        <p className="text-primary mb-0">Administrator</p>
                      </div>
                    </div>
                    <hr className="m-0" />
                    <Link
                      className="dropdown-item d-inline-flex align-items-center p-2"
                      to={routes.profile}
                    >
                      <i className="ti ti-user-circle me-2" />
                      My Profile
                    </Link>
                    <Link
                      className="dropdown-item d-inline-flex align-items-center p-2"
                      to={routes.profilesettings}
                    >
                      <i className="ti ti-settings me-2" />
                      Settings
                    </Link>
                    <a
                      className="dropdown-item d-inline-flex align-items-center p-2"
                      href="https://api.whatsapp.com/send?phone=610403731363"
                      target="_blank"
                    >
                      <img
                        src="assets/img/whatsappIcon.png"
                        style={{ width: "8%", marginRight: "8px" }}
                      />
                      Whatsapp
                    </a>
                    <Link
                      className="dropdown-item d-inline-flex align-items-center p-2"
                      to={routes.planInfo}
                    >
                      <i className="ion-navigate me-2" />
                      Plan Info
                    </Link>
                    <hr className="m-0" />
                    <button
                      className="dropdown-item d-inline-flex align-items-center p-2"
                      onClick={handleLogout}
                    >
                      <i className="ti ti-login me-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to={routes.profile}>
              My Profile
            </Link>
            <Link className="dropdown-item" to={routes.profilesettings}>
              Settings
            </Link>
            <Link className="dropdown-item" to={routes.login}>
              Logout
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
      {/* /Header */}
    </>
  );
};

export default Header;
