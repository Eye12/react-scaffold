import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";

class Index extends Component {
    render() {
        console.log("=========>>>", 9999);
        return (
           <div>This is a new world you will see</div>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById("root"));
