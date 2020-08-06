import React from 'react';
import classes from './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
            <span>
                <strong>1.</strong>&nbsp;
                {props.question}
            </span>
                <small>4 из 12</small>
            </p>

            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
            />
        </div>
    );
};

export default ActiveQuiz;