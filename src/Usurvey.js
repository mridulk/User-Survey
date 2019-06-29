import React, { Component } from 'react'
var firebase=require('firebase');
var uuid =require('uuid');
var firebaseConfig = {
    apiKey: "AIzaSyB1Lv9SmsN7Mpk3u_Nu987GOxpTwumXjH0",
    authDomain: "usurvey-5538f.firebaseapp.com",
    databaseURL: "https://usurvey-5538f.firebaseio.com",
    projectId: "usurvey-5538f",
    storageBucket: "",
    messagingSenderId: "754929257599",
    appId: "1:754929257599:web:39470e4d16b7e271"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
class Usurvey extends Component {
    nameSubmit(event){
        var studentName=this.refs.name.value;
        this.setState({
            studentName:studentName
        },
        function(){
            console.log(this.state);
        });
    }
    answerSelected(event){
        var answers=this.state.answers;
        if(event.target.name==='answer1'){
            answers.answer1=event.target.value
        }
        else if(event.target.name==='answer2'){
            answers.answer2=event.target.value
        }
        else if(event.target.name==='answer3'){
            answers.answer3=event.target.value
        }
        this.setState({
            answers:answers
        },
        function(){
            console.log(this.state)
        })
    }
    questionSubmit(){
        firebase.database().ref('uSurvey/'+this.state.uid).set({
            studentName:this.state.studentName,
            answers:this.state.answers
        });
        this.setState({
            isSubmitted:true
        })
    }
    constructor(props) {
        super(props)
    
        this.state = {
             uid:uuid.v1(),
             studentName:'',
             answers:{
                 answer1:'',
                 answer2:'',
                 answer3:''
             },
             isSubmitted:false
        }
        this.nameSubmit=this.nameSubmit.bind(this)
        this.answerSelected=this.answerSelected.bind(this)
        this.questionSubmit=this.questionSubmit.bind(this)
    }
    
    render() {
        var studentName;
        var questions;
        if(this.state.studentName === '' & this.state.isSubmitted ===false){
            studentName=<div>
                <h1>Hey,Please let us your name</h1>
                <form onSubmit={this.nameSubmit}>
                    <input  className="input-class" type="text" placeholder="Enter Your Name" ref="name"/>
                </form>
            </div>;
            questions=''
        }
        else if(this.state.studentName!=='' && this.state.isSubmitted===false){
            studentName=<div>Welcome to U-survey ,{this.state.studentName}</div>;
            questions=<div>
                <h2>Here Are Some questions:</h2>
                <form>
                    <div className="card">
                        <label>What kind of Courses would you prefer ?</label><br></br>
                        <input type="radio" name="answer1" value="MERN stack" onChange={this.answerSelected}/>MERN stack
                        <input type="radio" name="answer1" value="MEAN Stack" onChange={this.answerSelected}/>MEAN Stack<br></br>
                        <input type="radio" name="answer1" value="SQL database" onChange={this.answerSelected}/>SQL database
                        <input type="radio" name="answer1" value="Full Stack" onChange={this.answerSelected}/>Full Stack
                    </div>
                    <div className="card">
                        <label>Your Education ?</label><br></br>
                        <input type="radio" name="answer2" value="Secondary School" onChange={this.answerSelected}/>Secondary School
                        <input type="radio" name="answer2" value="Graduated" onChange={this.answerSelected}/>Graduated <br></br>
                        <input type="radio" name="answer2" value="Post Graduated" onChange={this.answerSelected}/>Post-Graduated
                        <input type="radio" name="answer2" value="Fresher" onChange={this.answerSelected}/>Fresher
                    </div>
                    <div className="card">
                        <label>Course Duration ?</label><br></br>
                        <input type="radio" name="answer3" value="1 month" onChange={this.answerSelected}/>1 month
                        <input type="radio" name="answer3" value="2 month" onChange={this.answerSelected}/>2 month <br></br>
                        <input type="radio" name="answer3" value="6 month" onChange={this.answerSelected}/>6 month
                        <input type="radio" name="answer3" value="12 months" onChange={this.answerSelected}/>12 months
                    </div>
                    <input onClick={this.questionSubmit} type="submit" value="submit" className="feedback-button"/>
                </form>
            </div>
        }
        else if(this.state.studentName!=='' && this.state.isSubmitted===true){
            studentName=<div><h1>Thank You ,For The Survey {this.state.studentName}</h1></div>;
            questions=''
        }
        return (
            <div>
               {studentName}
               ---------------------------------------------------------
               {questions}
            </div>
        )
    }
}

export default Usurvey
