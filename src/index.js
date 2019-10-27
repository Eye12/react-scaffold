import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./global.scss";

class Index extends Component {
    render() {
        return (
           <div>This is a new world you will see</div>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById("root"));
