import React, { Component } from 'react';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
    this.markAsUnread = this.markAsUnread.bind(this);
    this.throwAway = this.throwAway.bind(this);
    this.setLabel = this.setLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
    this.bulkSelect = this.bulkSelect.bind(this);
  }

  markAsRead () {
    this.props.markAsRead();
  }

  markAsUnread () {
    this.props.markAsUnread();
  }

  throwAway () {
    this.props.throwAway();
  }

  bulkSelect () {
    this.props.bulkSelect();
  }

  setLabel = (e) => {
    e.preventDefault();
    this.props.setLabel(e.target.value);
  }

  removeLabel = e => {
    e.preventDefault();
    this.props.removeLabel(e.target.value);
  }

  render () {

    const unread = this.props.messages.filter(x => {
      return x.read === false;
    }).length;

    return (
    <div className="row toolbar">
    <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{unread}</span>
      {unread === 1 ? 'unread message' : 'unread messages'}
    </p>

    <button className="btn btn-danger">
      <i className="fa fa-plus"></i>
    </button>

    <button onClick={this.bulkSelect} className="btn btn-default">
      <i className={this.props.selectOn ? "fa fa-check-square-o" : "fa fa-square-o"}></i>
    </button>

    <button onClick={this.markAsRead} className="btn btn-default">Mark As Read</button>

    <button onClick={this.markAsUnread} className="btn btn-default">Mark As Unread</button>

    <select onChange={this.setLabel} className="form-control label-select">
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select onChange={this.removeLabel} className="form-control label-select">
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button onClick={this.throwAway} className="btn btn-default">
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
  </div>
  );
}
}

export default Navbar;
