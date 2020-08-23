import React from 'react';

class AddFactsForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputText: '',
			selectedValidity: null,
		};

		this.updateInput = this.updateInput.bind(this);
		this.submit = this.submit.bind(this);
		this.updateValidity = this.updateValidity.bind(this);
	}

	updateInput(event) {
		event.preventDefault();

		this.setState({
			inputText: event.target.value
		});
	}

	submit(event) {
		event.preventDefault();

		if (this.state.inputText.length === 0 || this.state.selectedValidity === null) {
			// TODO: Display some kind of error message
			return;
		}

		this.props.onSubmit(this.state.inputText, this.state.selectedValidity.toLowerCase());

		this.setState({
			inputText: '',
			selectedValidity: null
		});
	}

	updateValidity(validity) {
		this.setState({
			selectedValidity: validity
		});
	}

	render() {
		return (
			<div id="addFactsFormContainer">
				<h3 className="m-2">Add Your Own Question</h3>
				<form onSubmit={this.submit}>
					<div className="form-group">
						<label htmlFor="newFactInput">Your new statement</label>
		         	<input id="newFactInput" type="text" className="form-control" placeholder="Lions are mammals..." onChange={this.updateInput} value={this.state.inputText} />
					</div>
					<div className="form-group">
						<label htmlFor="validityInput">Is this statement true or false?</label>
			         <div className="dropdown" id="validityInput">
			         	<button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
			         		{this.state.selectedValidity === null ? '------' : this.state.selectedValidity}
			         	</button>
			         	<div className="dropdown-menu">
			         		<a className="dropdown-item" href="#" onClick={() => this.updateValidity('True')}>True</a>
			         		<a className="dropdown-item" href="#" onClick={() => this.updateValidity('False')}>False</a>
			         	</div>
			         </div>
					</div>
		         <div className="form-group row mb-0">
                  <div className="col-sm-6 offset-sm-6 col-form-label text-right">
                     <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
               </div>
		      </form>
			</div>
		);
	}
}

export default AddFactsForm;