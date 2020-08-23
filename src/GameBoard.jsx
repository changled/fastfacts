import React from 'react';

class GameBoard extends React.Component {
	constructor(props) {
	  	super(props);

	  	this.state = {
	    	response: null,
	  	};

	  	this.selectResponse = this.selectResponse.bind(this);
	}

	componentDidUpdate(prevProps) {
	  	if (prevProps === this.props) {
	    	return;
	  	}

	  	this.setState({response: null});
	}

	selectResponse(event, response) {
	  	event.preventDefault();
	  	this.setState({response});
	}

	render() {
	  	return (
	    	<div className="centerContent" id="gameBoardContent">
      		<div className="font-weight-bold mb-3">Fact: {this.props.fact}</div>
      		{this.state.response === null && (
	        		<div>
	          		<button className="btn mr-1" type="button" onClick={(e) => this.selectResponse(e, true)}>True</button>
	          		<button className="btn" type="button" onClick={(e) => this.selectResponse(e, false)}>False</button>
	        		</div>
      		)}
      		{this.state.response !== null && (
	        		<div>
	       			<h3>{this.state.response === this.props.validity ? 'Correct' : 'Wrong'}, that's {this.props.validity ? '' : 'not '}a fact!</h3>
	          		<button className="btn" type="button" onClick={this.props.getNext}>Next fact</button>
	        		</div>
      		)}
	    	</div>
	  	);
	}
}

export default GameBoard;