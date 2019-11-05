/**
 * @Author: wyy
 * @Date: 2019/11/5
 * @Description:
 **/
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.scss";

interface indexProps {

}

interface indexState {
  name: string
}

class Index extends React.Component<indexProps, indexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "lle"
    }
  }

  render() {
    return (
      <div>This is a new world you will see</div>
    );
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById("root")
);
