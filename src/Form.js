import React from 'react';

class Form extends React.Component {  

    render () {
        const handleSubmission = this.props.handleSubmission;
        return (
            <form>
                <table>
                    <tr>
                        <th>Player</th>
                        <th>Perk 1</th>
                        <th>Perk 2</th>
                        <th>Perk 3</th>
                        <th>Perk 4</th>
                        <th>Item/Power</th>
                        <th>Escaped?/Kills</th>
                    </tr>
                    <tr id="survivor1">
                        <th>
                            Survivor1
                        </th>
                        <th>
                            <input type="text" id="perk1"></input>
                        </th>
                        <th>
                            <input type="text" id="perk2"></input>
                        </th>
                        <th>
                            <input type="text" id="perk3"></input>
                        </th>
                        <th>
                            <input type="text" id="perk4"></input>
                        </th>
                        <th>
                            <input type="text" id="item"></input>
                        </th>
                        <th>
                            <input type="checkbox" id="escaped"></input>
                        </th>
                    </tr>
                    <tr id="survivor2">
                        <th>
                            Survivor2
                        </th>
                        <th>
                            <input type="text" id="perk1"></input>
                        </th>
                        <th>
                            <input type="text" id="perk2"></input>
                        </th>
                        <th>
                            <input type="text" id="perk3"></input>
                        </th>
                        <th>
                            <input type="text" id="perk4"></input>
                        </th>
                        <th>
                            <input type="text" id="item"></input>
                        </th>
                        <th>
                            <input type="checkbox" id="escaped"></input>
                        </th>
                    </tr>
                    <tr id="survivor3">
                        <th>
                            Survivor3
                        </th>
                        <th>
                            <input type="text" id="perk1"></input>
                        </th>
                        <th>
                            <input type="text" id="perk2"></input>
                        </th>
                        <th>
                            <input type="text" id="perk3"></input>
                        </th>
                        <th>
                            <input type="text" id="perk4"></input>
                        </th>
                        <th>
                            <input type="text" id="item"></input>
                        </th>
                        <th>
                            <input type="checkbox" id="escaped"></input>
                        </th>
                    </tr>
                    <tr id="survivor4">
                        <th>
                            Survivor4
                        </th>
                        <th>
                            <input type="text" id="perk1"></input>
                        </th>
                        <th>
                            <input type="text" id="perk2"></input>
                        </th>
                        <th>
                            <input type="text" id="perk3"></input>
                        </th>
                        <th>
                            <input type="text" id="perk4"></input>
                        </th>
                        <th>
                            <input type="text" id="item"></input>
                        </th>
                        <th>
                            <input type="checkbox" id="escaped"></input>
                        </th>
                    </tr>
                    <tr id="killer">
                        <th>
                            Killer
                        </th>
                        <th>
                            <input type="text" id="perk1"></input>
                        </th>
                        <th>
                            <input type="text" id="perk2"></input>
                        </th>
                        <th>
                            <input type="text" id="perk3"></input>
                        </th>
                        <th>
                            <input type="text" id="perk4"></input>
                        </th>
                        <th>
                            <input type="text" id="power"></input>
                        </th>
                        <th>
                            <input type="range" id="kills" min="0" max="4" step="1"></input>
                        </th>
                    </tr>
                </table>
                <br></br>
                <a href="/#" onClick={handleSubmission}>Submit</a>
            </form>

        );
    }
}

export default Form;