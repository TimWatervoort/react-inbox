import React, { Component } from 'react';
import Label from '../labels/labels';

class Message extends Component {

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.selected = false;
  }

  star = e => {
    const { setStar } = this.props;
    setStar(e.target.id);
  }

  select = e => {
    this.selected = !this.selected;
    const { setSelect } = this.props;
    const y = e.target.id.replace('select', '');
    setSelect(y);
  }

  render() {
    if (this.props.selected === true) {
      this.selected = true;
    }
    const { message } = this.props;
    const labelList = message.labels.map((x, i) => <Label key={i} label={x} />)
    return (
      <div className={message.read ? "row message read" : "row message unread"}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input checked={!!this.selected} type="checkbox" id={`select${message.id}`} onChange={this.select}/>
            </div>
            <div onClick={this.star} className="col-xs-2">
              <i className={message.starred ? "star fa fa-star" : "star fa fa-star-o"} id={message.id}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {labelList}
          <span>
            {message.subject}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;
