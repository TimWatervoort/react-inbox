import React, { Component } from 'react';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
    this.markAsUnread = this.markAsUnread.bind(this);
    this.throwAway = this.throwAway.bind(this);
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

  render () {
    return (
    <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">2</span>
      unread messages
    </p>

    <button className="btn btn-danger">
      <i className="fa fa-plus"></i>
    </button>

    <button className="btn btn-default">
      <i className="fa fa-minus-square-o"></i>
    </button>

    <button onClick={this.markAsRead} className="btn btn-default">Mark As Read</button>

    <button onClick={this.markAsUnread} className="btn btn-default">Mark As Unread</button>

    <select className="form-control label-select">
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select">
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
