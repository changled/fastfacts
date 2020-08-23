import GameBoard from './GameBoard.jsx';
import AddFactsForm from './AddFactsForm.jsx';

class App extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         // 0 = start screen, 1 = game in session, 2 = game over
         gameState: 0,
         currentFact: 0,
         facts: [],
      };

      this.changeGameState = this.changeGameState.bind(this);
      this.getNextFact = this.getNextFact.bind(this);
      this.addFact = this.addFact.bind(this);
   }

   componentDidMount() {
      fetch('http://localhost:3000/facts', {
         method: 'GET',
      })
      .then(response => response.json())
      .then(facts => {
         this.setState({facts});
      });
   }

   changeGameState(event, newState) {
      event.preventDefault();
      if (newState in [0, 1, 2] === false) {
         return;
      }

      this.setState({gameState: newState});
   }

   getNextFact() {
      this.setState(({currentFact}) => {
         const gameFinished = currentFact >= this.state.facts.length - 1;

         return {
            currentFact: gameFinished ? 0 :  currentFact + 1,
            gameState: gameFinished ? 2 : 1
         };
      });
   }

   addFact(fact, validity) {
      fetch('http://localhost:3000/addFact/', {
         method: 'POST',
         headers: {
            'Content-Type':'application/json'
         },
         body: JSON.stringify({
            'fact': fact,
            'validity': validity,
         }),
      });
   }

   render() {
      return (
         <div>
            <header>
               <h2 className="m-4">FastFacts</h2>
            </header>

            <AddFactsForm onSubmit={this.addFact} />

            <div id="gameBoard">
               <h3 className="m-2">Test Your FastFacts Skills</h3>

               {this.state.gameState === 0 && (
                  <button type="button" className="btn btn-primary centerContent" onClick={(e) => this.changeGameState(e, 1)}>Start</button>
               )}

               {this.state.gameState === 1 && this.state.currentFact < this.state.facts.length && (
                  <GameBoard
                     fact={this.state.facts[this.state.currentFact].fact}
                     validity={Boolean(this.state.facts[this.state.currentFact].validity)}
                     getNext={this.getNextFact}
                  />
               )}

               {this.state.gameState === 2 && (
                  <div>
                     <div class="centerContent font-weight-bold">Game Over</div>
                     <button className="btn centerContent" type="button" onClick={(e) => this.changeGameState(e, 0)}>Try again</button>
                  </div>
               )}
            </div>
         </div>
      );
   }
}

export default App;