import { all_routes } from "../router/all_routes";

const Faq = () => {
  return (
    <div className="page-wrapperss">
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div
                className="accordion accordion-primary"
                id="accordionPrimaryExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingPrimaryOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePrimaryOne"
                      aria-expanded="true"
                      aria-controls="collapsePrimaryOne"
                    >
                      How can I pay?
                    </button>
                  </h2>
                  <div
                    id="collapsePrimaryOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingPrimaryOne"
                    data-bs-parent="#accordionPrimaryExample"
                  >
                    <div className="accordion-body">
                      In the VIP section, you can click the 'Buy' button and
                      choose from any of the different packages available for
                      online classes, mock tests, or VIP plans. This will take
                      you to the payment screen. Your account will automatically
                      be updated with the purchased item as soon as payment is
                      received.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingPrimaryTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePrimaryTwo"
                      aria-expanded="false"
                      aria-controls="collapsePrimaryTwo"
                    >
                      I successfully made the payment, but I was unable to
                      access the account.
                    </button>
                  </h2>
                  <div
                    id="collapsePrimaryTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingPrimaryTwo"
                    data-bs-parent="#accordionPrimaryExample"
                  >
                    <div className="accordion-body">
                      Please provide the payment confirmation email or receipt
                      to our support team at info@excelpte.com or via WhatsApp
                      at +61 403 731 363.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingPrimaryThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePrimaryThree"
                      aria-expanded="false"
                      aria-controls="collapsePrimaryThree"
                    >
                      Where can I view my payment history?
                    </button>
                  </h2>
                  <div
                    id="collapsePrimaryThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingPrimaryThree"
                    data-bs-parent="#accordionPrimaryExample"
                  >
                    <div className="accordion-body">
                      You can view your payment history from the Payment History
                      tab in the VIP section.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Why is my payment not processed?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionPrimaryExample"
                  >
                    <div className="accordion-body">
                      Your Bank or Credit Card may not authorize you to make
                      international payments. In such situations, you can try
                      paying from another card or contact your bank.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Once my VIP subscription expires, what happens next?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionPrimaryExample"
                  >
                    <div className="accordion-body">
                      As soon as your Premium subscription expires, your account
                      will be converted to a free account, and all premium
                      features will be removed.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
