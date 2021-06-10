import React from "react";
import Header from "./Header";
import Form from "./Form";


class App extends React.Component {

  constructor(props) {
      super(props);

      this.handleSubmission = this.handleSubmission.bind(this);
  };

  handleSubmission(event) {
    // survivor 1
    const survivor1 = document.querySelector("#survivor1");
    const survivor1Contents = JSON.stringify({
      perks: [
        survivor1.querySelector("#perk1").value,
        survivor1.querySelector("#perk2").value,
        survivor1.querySelector("#perk3").value,
        survivor1.querySelector("#perk4").value
      ],
      item: survivor1.querySelector("#item").value,
      escaped: survivor1.querySelector("#escaped").checked
    });

    // survivor 2
    const survivor2 = document.querySelector("#survivor2");
    const survivor2Contents = JSON.stringify({
      perks: [
        survivor2.querySelector("#perk1").value,
        survivor2.querySelector("#perk2").value,
        survivor2.querySelector("#perk3").value,
        survivor2.querySelector("#perk4").value
      ],
      item: survivor2.querySelector("#item").value,
      escaped: survivor2.querySelector("#escaped").checked
    });

    // survivor 3
    const survivor3 = document.querySelector("#survivor3");
    const survivor3Contents = JSON.stringify({
      perks: [
        survivor3.querySelector("#perk1").value,
        survivor3.querySelector("#perk2").value,
        survivor3.querySelector("#perk3").value,
        survivor3.querySelector("#perk4").value
      ],
      item: survivor3.querySelector("#item").value,
      escaped: survivor3.querySelector("#escaped").checked
    });

    // survivor 4
    const survivor4 = document.querySelector("#survivor4");
    const survivor4Contents = JSON.stringify({
      perks: [
        survivor4.querySelector("#perk1").value,
        survivor4.querySelector("#perk2").value,
        survivor4.querySelector("#perk3").value,
        survivor4.querySelector("#perk4").value
      ],
      item: survivor4.querySelector("#item").value,
      escaped: survivor4.querySelector("#escaped").checked
    });

    // post survivors
    // console.log("Posting...");
    fetch('http://dbd-stat-tracker.herokuapp.com/survivors', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: [
        survivor1Contents,
        survivor2Contents,
        survivor3Contents,
        survivor4Contents
      ]
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(() => {
        console.log("Didn't connect to herokuapp.");
      })
    
    // killer
    const killer = document.querySelector("#killer");
    const killerContents = JSON.stringify({
      perks: [
        killer.querySelector("#perk1").value,
        killer.querySelector("#perk2").value,
        killer.querySelector("#perk3").value,
        killer.querySelector("#perk4").value
      ],
      power: killer.querySelector("#power").value,
      kills: killer.querySelector("#kills").value
    });

    // post killer
    // console.log("Posting killer...");
    fetch('http://dbd-stat-tracker.herokuapp.com/killers', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: killerContents
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(() => {
        console.log("Didn't connect to herokuapp.");
      })
  }

  render () {
      return (
          <div className="container">

            {/* header component */}
            <Header title="Data by Daylight" />

            <main className="main">
              <Form handleSubmission={this.handleSubmission}/>
            </main>
          </div>
      );
  }
}

export default App;
