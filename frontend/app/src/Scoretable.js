import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyle = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Scoretable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false,
            scores: [],
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        Modal.setAppElement('body');
    }

    openModal(){
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal(){
        this.getScores();
    }

    closeModal(){
        this.setState({ modalIsOpen: false });
    }

    getScores = () => {
        axios
        .get(`http://localhost:8080/api/trivia/getscores`)
        .then(res => {
            console.log(res);
            this.setState({ scores: res.data }, console.log(this.state.scores));
        });
    }

    deleteScores = () => {
        axios.delete(`http://localhost:8080/api/trivia/deletescores`)
        .then(res => {
            console.log(res);
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.openModal}>High Scores</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyle}
                    contentLabel="High Scores"
                >
                    <button onClick={this.closeModal}>Close</button>
                    <button onClick={this.deleteScores}>Delete Scores</button>
                    <div><h2>High Scores</h2></div>
                    <div>{this.state.scores.map(score => (
                        <p key={score._id}>
                            {score.name}  ---   {score.score}
                        </p>
                    ))}</div>
                </Modal>
            </div>
        )
    }
}

export default Scoretable;