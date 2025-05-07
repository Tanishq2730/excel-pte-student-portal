import React from "react";

interface QuestionProps {
  option_type: "checkbox" | "radio";
}

const ChooseBox: React.FC<QuestionProps> = ({ option_type }) => {
  return (
    <div className="choose-box">
      {/* Static Multiple Choice (Checkbox) */}
      {option_type === "checkbox" && (
        <div className="choose-checkbox">
          <label className="quelabel">
            <input
              type="checkbox"
              id="checkbox_a"
              name="checkbox[]"
              value="a"
            />
            Option 1
          </label>
          <br />

          <label className="quelabel">
            <input
              type="checkbox"
              id="checkbox_b"
              name="checkbox[]"
              value="b"
            />
            Option 2
          </label>
          <br />

          <label className="quelabel">
            <input
              type="checkbox"
              id="checkbox_c"
              name="checkbox[]"
              value="c"
            />
            Option 3
          </label>
          <br />

          <label className="quelabel">
            <input
              type="checkbox"
              id="checkbox_d"
              name="checkbox[]"
              value="d"
            />
            Option 4
          </label>
          <br />
        </div>
      )}

      {/* Static Single Choice (Radio) */}
      {option_type === "radio" && (
        <div className="choose-radio">
          <label className="quelabel">
            <input type="radio" id="radio_a" name="radio" value="a" />
            Option 1
          </label>
          <br />

          <label className="quelabel">
            <input type="radio" id="radio_b" name="radio" value="b" />
            Option 2
          </label>
          <br />

          <label className="quelabel">
            <input type="radio" id="radio_c" name="radio" value="c" />
            Option 3
          </label>
          <br />

          <label className="quelabel">
            <input type="radio" id="radio_d" name="radio" value="d" />
            Option 4
          </label>
          <br />
        </div>
      )}
    </div>
  );
};

export default ChooseBox;
