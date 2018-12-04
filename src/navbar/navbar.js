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
    this.showCompose = this.showCompose.bind(this);
    this.applyLabelValue = 'Apply label';
    this.removeLabelValue = 'Remove label';
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
    e.target.value = this.applyLabelValue;
  }

  removeLabel = e => {
    e.preventDefault();
    this.props.removeLabel(e.target.value);
    e.target.value = this.removeLabelValue;
  }

  showCompose () {
    this.props.showCompose();
  }

  render () {

    const unread = this.props.messages.filter(x => {
      return x.read === false;
    }).length;

    const selections = this.props.messages.filter(x => {
      return x.selected === true;
    }).length;

    let style = '';
    if (selections === 0) {
      style = "fa fa-square-o";
    } else if (selections === this.props.messages.length) {
      style = "fa fa-check-square-o";
    } else {
      style = "fa fa-minus-square-o"
    }

    return (
    <div className="row toolbar">
    <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{unread}</span>
      {unread === 1 ? 'unread message' : 'unread messages'}
    </p>

    <button onClick = {this.showCompose} className="btn btn-danger">
      <i className="fa fa-plus"></i>
    </button>

    <button onClick={this.bulkSelect} className="btn btn-default">
      <i className={style}></i>
    </button>

    <button onClick={this.markAsRead} className="btn btn-default">Mark As Read</button>

    <button onClick={this.markAsUnread} className="btn btn-default">Mark As Unread</button>

    <select onChange={this.setLabel} defaultValue = 'Apply label' className="form-control label-select">
      <option disabled>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select onChange={this.removeLabel} defaultValue='Remove label' className="form-control label-select">
      <option disabled>Remove label</option>
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
