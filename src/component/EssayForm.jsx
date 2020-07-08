import React from 'react';

export class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Your essay title here...',
      body: 'Your essay here...',
    };
  }
  handleChange = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <form>
        <label className="field">
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label className="field">
          Body:
          <textarea name="body" value={this.state.body} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}
