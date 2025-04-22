import { all_routes } from "../router/all_routes";

const historyData = [
  {
    id: 1,
    packageName: "1 Month",
    packageType: "Practice Subscription",
    duration: "VIP 1 Month (03 Mar 2025 to 2025-04-01)",
    transactionDate: "03-03-2025",
    paymentStatus: "Pending",
  },
  {
    id: 2,
    packageName: "Bronze Package",
    packageType: "One To One Class",
    duration: "VIP 1 Month (20 Feb 2025 to 2025-03-20)",
    transactionDate: "20-02-2025",
    paymentStatus: "Successful",
  },
  {
    id: 3,
    packageName: "1 Month",
    packageType: "Practice Subscription",
    duration: "VIP 1 Month (17 Feb 2025 to 2025-03-18)",
    transactionDate: "17-02-2025",
    paymentStatus: "Pending",
  },
  {
    id: 4,
    packageName: "1 Month",
    packageType: "Practice Subscription",
    duration: "VIP 1 Month (17 Feb 2025 to 2025-03-18)",
    transactionDate: "17-02-2025",
    paymentStatus: "Pending",
  },
  {
    id: 5,
    packageName: "1 Month",
    packageType: "Practice Subscription",
    duration: "VIP 1 Month (13 Feb 2025 to 2025-03-14)",
    transactionDate: "13-02-2025",
    paymentStatus: "Pending",
  },
  {
    id: 6,
    packageName: "3 Day Free Trial",
    packageType: "Practice Subscription",
    duration: "VIP 3 Day (12 Feb 2025 to 2025-02-14)",
    transactionDate: "12-02-2025",
    paymentStatus: "Successful",
  },
  // Add more dummy records if needed
];

const History = () => {
  const routes = all_routes;

  return (
    <div className="page-wrapperss">
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Package Name</th>
                      <th>Package Type</th>
                      <th>Duration</th>
                      <th>Transaction Date</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>{index + 1}</td>
                        <td>{entry.packageName}</td>
                        <td>{entry.packageType}</td>
                        <td>{entry.duration}</td>
                        <td>{entry.transactionDate}</td>
                        <td>{entry.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
