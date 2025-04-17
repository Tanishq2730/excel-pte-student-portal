import React, { useEffect } from "react";

const Structure: React.FC = () => {

//   const logout = () => {
//     window.location = "https://excelpte.com/admin/logout";
//   };

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       logout();
//     }
//   }, []);

  return (
    <div className="container">
      <div className="mockInfoContent">
      <p className="font-weight-bold">The test is approximately 2 hours</p>
      <table className="table table-bordered" style={{ width: "auto" }}>
        <thead>
          <tr>
            <th>Part</th>
            <th>Content</th>
            <th>Time allowed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Intro</td>
            <td>Introduction</td>
            <td>1 minute</td>
          </tr>

          <tr>
            <td>Part 1</td>
            <td>Speaking and writing</td>
            <td>54-67 minutes</td>
          </tr>

          <tr>
            <td>Part 2</td>
            <td>Reading</td>
            <td>29-30 minutes</td>
          </tr>

          <tr>
            <td>Part 3</td>
            <td>Listening</td>
            <td>30-43 minutes</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Structure;
