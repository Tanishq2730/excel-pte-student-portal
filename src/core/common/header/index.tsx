import { useEffect, useState } from "react";
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
import { all_routes } from "../../../feature-module/router/all_routes";
import { logout } from "../../data/redux/authSlice";
import { useNavigate } from "react-router-dom";
import PracticeHeader from "./practiceHeader";
import { fetchBookingData } from "../../../core/data/redux/bookingSlice"; // adjust path as needed
import { RootState } from "../../../core/data/redux/store";
import { AppDispatch } from "../../../core/data/redux/store";

const Header = () => {
  const routes = all_routes;
  // const dispatch = useDispatch();
  const dataTheme = useSelector((state: any) => state.themeSetting.dataTheme);
  const dataLayout = useSelector((state: any) => state.themeSetting.dataLayout);
  const userData = useSelector((state: any) => state.auth);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const { bookingData, loading, error } = useSelector((state: RootState) => state.bookingData);

  useEffect(() => {
    dispatch(fetchBookingData());
  }, [dispatch]);

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
                    <PracticeHeader
                      showMegaMenu={showMegaMenu}
                      setShowMegaMenu={setShowMegaMenu}
                    />
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
              
              <div className="search">
                <Link
                  to=""
                  className="freeuser d-flex justify-content-center align-items-center me-2 p-2 px-4  text-white"
                  style={{ width: "8em !important" }}
                >
                 <p style={{ fontWeight: "400" }}>
                  {
                    bookingData?.latestBooking && bookingData?.pendingDays > 0
                      ? "Premium User"
                      : "Free User"
                  }
                </p>
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
                  <div className=" btn btn-outline-light bg-white btn-icon position-relative me-1">
                    <i
                      className="ion-person headerpersonicon text-white m-auto"
                      style={{ color: "#000 !important" }}
                    ></i>
                  </div>
                </Link>
                <div className="dropdown-menu">
                  <div className="d-block">
                    <div className="d-flex align-items-center p-2">
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
                      <svg
                        width="8%"
                        style={{ marginRight: "6px" }}
                        viewBox="0 0 128 129"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.73131 63.7281C2.72831 74.5666 5.56031 85.1496 10.9453 94.4776L2.21631 126.349L34.8323 117.797C43.8535 122.708 53.961 125.281 64.2323 125.282H64.2593C98.1668 125.282 125.768 97.6901 125.783 63.7766C125.789 47.3431 119.395 31.8901 107.778 20.2641C96.1633 8.63907 80.7158 2.23357 64.2568 2.22607C30.3453 2.22607 2.74581 29.8161 2.73181 63.7281"
                          fill="url(#paint0_linear_33_9)"
                        />
                        <path
                          d="M0.535 63.708C0.5315 74.9365 3.465 85.898 9.042 95.56L0 128.574L33.7855 119.715C43.0945 124.79 53.5755 127.466 64.2405 127.47H64.268C99.392 127.47 127.985 98.8865 128 63.759C128.006 46.735 121.382 30.7265 109.35 18.684C97.3165 6.643 81.3165 0.007 64.268 0C29.138 0 0.549 28.58 0.535 63.708ZM20.6555 93.896L19.394 91.8935C14.091 83.4615 11.292 73.7175 11.296 63.712C11.307 34.5145 35.069 10.76 64.288 10.76C78.438 10.766 91.736 16.282 101.738 26.29C111.739 36.299 117.243 49.604 117.24 63.755C117.227 92.9525 93.464 116.71 64.268 116.71H64.247C54.7405 116.705 45.417 114.152 37.286 109.327L35.351 108.18L15.302 113.437L20.6555 93.896Z"
                          fill="url(#paint1_linear_33_9)"
                        />
                        <path
                          d="M48.3388 37.0742C47.1458 34.4227 45.8903 34.3692 44.7558 34.3227C43.8268 34.2827 42.7648 34.2857 41.7038 34.2857C40.6418 34.2857 38.9163 34.6852 37.4578 36.2777C35.9978 37.8717 31.8838 41.7237 31.8838 49.5582C31.8838 57.3927 37.5903 64.9647 38.3858 66.0282C39.1823 67.0897 49.4023 83.6817 65.5883 90.0647C79.0403 95.3692 81.7778 94.3142 84.6973 94.0482C87.6173 93.7832 94.1193 90.1972 95.4458 86.4787C96.7733 82.7607 96.7733 79.5737 96.3753 78.9077C95.9773 78.2442 94.9153 77.8457 93.3228 77.0497C91.7303 76.2537 83.9008 72.4007 82.4413 71.8692C80.9813 71.3382 79.9198 71.0732 78.8578 72.6677C77.7958 74.2597 74.7463 77.8457 73.8168 78.9077C72.8883 79.9722 71.9588 80.1047 70.3668 79.3082C68.7733 78.5092 63.6448 76.8297 57.5603 71.4052C52.8263 67.1842 49.6303 61.9717 48.7013 60.3772C47.7723 58.7852 48.6018 57.9222 49.4003 57.1287C50.1158 56.4152 50.9933 55.2692 51.7903 54.3397C52.5843 53.4097 52.8493 52.7462 53.3803 51.6842C53.9118 50.6212 53.6458 49.6912 53.2483 48.8947C52.8493 48.0982 49.7548 40.2227 48.3388 37.0742Z"
                          fill="white"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_33_9"
                            x1="6180.54"
                            y1="12414.5"
                            x2="6180.54"
                            y2="2.22607"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#1FAF38" />
                            <stop offset="1" stop-color="#60D669" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_33_9"
                            x1="6400"
                            y1="12857.4"
                            x2="6400"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#F9F9F9" />
                            <stop offset="1" stop-color="white" />
                          </linearGradient>
                        </defs>
                      </svg>
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
