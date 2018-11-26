import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class AddMessage extends Component {

  constructor (props) {
    super(props);
    this.subject = '';
    this.body = '';
  }

  postMessage = e => {
    e.preventDefault();
    const { callback } = this.props;
    callback(this.subject, this.body);
  }

  subjName = e => {
    this.subject = e.target.value;
  }

  bodyName = e => {
    this.body = e.target.value;
  }

  render () {
    return (
      <form className="form-horizontal well" onSubmit={this.postMessage}>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
    <div className="col-sm-8">
      <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange = {this.subjName}></input>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
      <textarea name="body" id="body" className="form-control" onChange={this.bodyName}></textarea>
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <input type="submit" value="Send" className="btn btn-primary"></input>
    </div>
  </div>
</form>
    );
  }
}

export default AddMessage;
