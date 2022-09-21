import React from "react";
import Redirectbutton from "./redirectbutton";
function Lastcolumn() {
    const [tags, setTags] = React.useState([]);

    function handleCheck(event) {
        const name = event.target.name;
        if (event.target.checked) {
            setTags((prev) => {
                return [...prev, name];
            });
        }
        else {
            setTags((prev) => {
                return prev.filter((tag) => tag != name);
            });
        }
    }

    function handleFilter() {
        var mytags = "";
        for (var i = 0; i < tags.length; i++) {
            if (i == 0)
                mytags = tags[i]
            else
                mytags = mytags + "+" + tags[i];
        }

        window.location = "/filtered/" + mytags;


    }
    return (
        <div class="col-2 global-third-col">
            <h6>Tags</h6>
            <table>
                <tr>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={handleCheck} name="Entertainment"></input>
                            <label class="form-check-label" for="inlineCheckbox1">Entertainment</label>
                        </div></td>
                    <td>  <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" onChange={handleCheck} name="Politics" ></input>
                        <label class="form-check-label" for="inlineCheckbox3">Politics</label>
                    </div>
                    </td>

                </tr>
                <tr>
                    <td><div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" onChange={handleCheck} name="Technology"></input>
                        <label class="form-check-label" for="inlineCheckbox2">Technology</label>
                    </div></td>
                    <td><div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" onChange={handleCheck} name="Sports" ></input>
                        <label class="form-check-label" for="inlineCheckbox4">Sports</label>
                    </div></td>
                </tr>
                <tr>
                    <td>   <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5" onChange={handleCheck} name="Health" ></input>
                        <label class="form-check-label" for="inlineCheckbox">Health</label>
                    </div></td>
                    <td><div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option6" onChange={handleCheck} name="Food" ></input>
                        <label class="form-check-label" for="inlineCheckbox6">Food</label>
                    </div></td>
                </tr>
                <tr>
                    <td>  <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox7" value="option7" onChange={handleCheck} name="Sarcasm" ></input>
                        <label class="form-check-label" for="inlineCheckbox4">Sarcasm</label>
                    </div></td>
                    <td>   <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="option8" onChange={handleCheck} name="Religion"></input>
                        <label class="form-check-label" for="inlineCheckbox4">Religion</label>
                    </div></td>
                </tr>

                <tr>
                    <td> <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox9" value="option9" onChange={handleCheck} name="Nature"></input>
                        <label class="form-check-label" for="inlineCheckbox9">Nature</label>
                    </div></td>
                    <td> <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox9" value="option9" onChange={handleCheck} name="Science"></input>
                        <label class="form-check-label" for="inlineCheckbox9">Science</label>
                    </div></td>
                </tr>





            </table>
            <button className="filter" onClick={handleFilter}>F i l t e r ☑️</button>
        </div>
    )

}

export default Lastcolumn;