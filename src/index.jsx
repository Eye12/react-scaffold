import React, {Component} from "react";
import ReactDOM from "react-dom";

class Index extends Component {
    render() {
        return (
            <div>
                <span>This is a new world you can see</span>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById("root"));
