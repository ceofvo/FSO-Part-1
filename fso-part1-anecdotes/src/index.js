import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    );
};

const Mostvoted = (props) => {
  if (props.maxVoted === 0) {
      return (
        <div>
          <p>No anecdotes have been voted for. Please cast your vote :)</p>
        </div>
      );
  };
      return(
        <div>
          <p>{props.maxVotedAnecdote}</p>
          <p>Has {props.maxVoted} votes</p>
        </div>
      );
};


const App = () => {
  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
  // save clicks of each button to own state
  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(points)

  const currentVotes = voted[selected] === 0 ? 0 : voted[selected];

  //Get the value of anecdotes with the highest votes
  const arr = Object.values(voted);
  const maxVoted = Math.max(...arr);

  // Get the anecdotes with highest vote
  let maxVotedAnecdote;
  const entries = Object.entries(voted);
  for (const [key, value] of entries) {
     if(value === maxVoted){
       maxVotedAnecdote = anecdotes[key];
     }
  }


  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleClick = () => {
    const randomValue = getRandom(0, anecdotes.length-1);
    setSelected(randomValue);
  }

  const handleVote = () => {
    const copy = { ...voted };
    copy[selected] += 1 ;
    setVoted(copy);
  };   


  return (
    <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>Has {currentVotes} votes</p>
        <Button handleClick={handleVote} text="Vote" />
        <Button handleClick={handleClick} text="Next Anecdote" />
        <h2>Anecdote with most votes</h2>
        <Mostvoted maxVoted = {maxVoted} maxVotedAnecdote = {maxVotedAnecdote}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
