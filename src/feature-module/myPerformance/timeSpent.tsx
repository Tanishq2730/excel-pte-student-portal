import React from 'react';

const data = {
  Speaking: [
    { task: 'ANSWER SHORT QUESTION', time: '1 HOUR 14 MIN' },
    { task: 'DESCRIBE IMAGE', time: '17 HOURS 15 MIN' },
    { task: 'RE-TELL LECTURE', time: '6 HOURS 10 MIN' },
    { task: 'READ ALOUD', time: '38 HOURS 29 MIN' },
    { task: 'REPEAT SENTENCE', time: '19 HOURS 33 MIN' },
    { task: 'RESPOND TO SITUATION', time: '4 MIN' }
  ],
  Writing: [
    { task: 'SUMMARIZE WRITTEN TEXT', time: '14 HOURS 16 MIN' },
    { task: 'WRITE EMAIL', time: '37 MIN' },
    { task: 'WRITE ESSAY', time: '16 HOURS 60 MIN' }
  ],
  Listening: [
    { task: 'FILL IN THE BLANKS', time: '23 HOURS 54 MIN' },
    { task: 'HIGHLIGHT CORRECT SUMMARY', time: '2 HOURS 6 MIN' },
    { task: 'HIGHLIGHT INCORRECT WORDS', time: '10 HOURS 45 MIN' },
    { task: 'MC, CHOOSE MULTIPLE ANSWER', time: '3 HOURS 52 MIN' },
    { task: 'MC, CHOOSE SINGLE ANSWER', time: '2 HOURS 36 MIN' },
    { task: 'SELECT MISSING WORD', time: '1 HOUR 27 MIN' },
    { task: 'SUMMARIZE SPOKEN TEXT', time: '33 HOURS 45 MIN' },
    { task: 'WRITE FROM DICTATION', time: '41 HOURS 40 MIN' }
  ],
  Reading: [
    { task: 'MC, CHOOSE MULTIPLE ANSWER', time: '2 HOURS 22 MIN' },
    { task: 'MC, CHOOSE SINGLE ANSWER', time: '39 MIN' },
    { task: 'RE-ORDER PARAGRAPHS', time: '25 HOURS 59 MIN' },
    { task: 'READING AND WRITING-FILL IN THE BLANKS', time: '61 HOURS 56 MIN' },
    { task: 'READING-FILL IN THE BLANKS', time: '36 HOURS 9 MIN' }
  ]
};

const TimeSpent = () => {
  return (
    <div className="card p-4">
      <div className="row text-center mb-4">
        {Object.keys(data).map((section, i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="mb-2">
                  <i className="bi bi-mic" style={{ fontSize: '2rem' }}></i>
                </div>
                <h5>{section}</h5>
                <p className="text-muted">
                  Time Spent: 23Min
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {Object.entries(data).map(([section, tasks], index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title border-bottom pb-2 mb-3">{section}</h5>
                <table className="table table-borderless mb-0">
                  <tbody>
                    {tasks.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.task}</td>
                        <td className="text-end">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSpent;
