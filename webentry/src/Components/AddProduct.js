import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AddMoreParts from './AddMoreParts';
let emailUser = "";
let todayFormatted = "";
let stallIdNo = "";
let todayStamp = "";
let todayId = "";
let customerSelected = "";
let m = 0;
let memberId1 = "";
let memberId2 = "";
let memberId3 = "";
let memberId4 = "";
let memberId5 = "";
//let memberCount =0;

class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.checkUser();

        this.ref = firebase.firestore().collection("req@gmail.com"); // todo: see if can add doc(stallIdNo) here to force a fixed docId
        this.state = {
            product: [],
            //memberCount: 0,
            whouploadId: '',
            whoupload: '',
            whatUse: '',
            whatModel: '',
            whatPN: '',
            whatQty: '',
            remark: '',
            since: '',
            whenAsk: '',
            tgtPrice: '',
            customer: '',
            stallId: '',
            quotes: '',
            poUploaded: '',
            poStatus: '',
            image: null,
        }



        todayStamp = new Date();
        var dd = String(todayStamp.getDate()).padStart(2, '0');
        var mm = String(todayStamp.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = todayStamp.getFullYear();
        //var tttt = todayStamp.getHours() + ":" + todayStamp.getMinutes() + ":" + todayStamp.getSeconds();
        //today = yyyy + '-' + mm + '-' + dd + " " + tttt;
        var hh = "" + todayStamp.getHours(); if (hh.length === 1){hh="0" + todayStamp.getHours();}
        var mn = "" + todayStamp.getMinutes(); if (mn.length === 1){mn="0" + todayStamp.getMinutes();}
        var ss = "" + todayStamp.getSeconds(); if (ss.length === 1){ss="0" + todayStamp.getSeconds();}
        var tttttt = "" + hh + mn + ss;
        todayId = yyyy + mm + dd + tttttt;
        //todayFormatted = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":" + ss // no need the ss for display purpose
        todayFormatted = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mn

        this.checkMember();
        
    }

    async checkMember ()  {
        const refMember = firebase.firestore().collection("groups").doc("req@gmail.com");
        await refMember.get().then((doc)=>{
            if (doc.exists){
                const document = doc.data();
                this.setState({
                    product: doc.data(),
                    //memberCount: document.memberCount,
                    //whouploadId: document.whouploadId,
                    //key: doc.id,
                    //isLoading: false
                })
            }else{console.log("No such document")}
        });
        for(m=1; m < this.state.product.memberCount + 1; m++){
            //console.log ("memberCount: " + this.state.product.memberCount)
            if (m===1) {memberId1 = this.state.product.member1; console.log("member1 " + memberId1)}
            if (m===2) {memberId2 = this.state.product.member2; console.log("member2 " + memberId2)}
            if (m===3) {memberId3 = this.state.product.member3; console.log("member3 " + memberId3)}
            if (m===4) {memberId4 = this.state.product.member4; console.log("member4 " + memberId4)}
            if (m===5) {memberId5 = this.state.product.member5; console.log("member5 " + memberId5)}
            //whichMember = "member" + String(m);  
            //console.log("member " + m + " =" + this.state.product.$whichMember)
        }
        //this.setState({});
    }

    checkUser () {
        firebase.auth().onAuthStateChanged(user => {
          if(user) {
              //console.log("yes logged in : " + user.email + "  "); // + user.name);
              emailUser = user.email;
              //stallIdNo = user.email+todayStamp
              stallIdNo = todayId+user.email
            }else {
              //console.log("not logged in")
              window.location.replace("/login")
            }
        });
      }


    onChange = (e) => { 
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleChange = async (e) => {
        if(await e.target.files[0]){this.setState({image: e.target.files[0]})}
        const uploadTask = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_0`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot ok')},
        (error) =>{console.log(error);},
        ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_0").getDownloadURL().then(url=>{this.setState({url})
            //this.setState({url}); 
            //console.log("Url: " + url);
        })})
        const uploadTask1 = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_1`).put(this.state.image)
        uploadTask1.on('state_changed', (snapshot)=>{console.log('snapshot_1 ok')},
        (error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})
        ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_1").getDownloadURL().then(url1=>{this.setState({url1})
        //console.log("Url1: " + url1);
        })})  
 
        //console.log(e.target.files[0]);
    }

    // no need this function. can delete
    handleUpload = () => { //used whouploadid (email) + since date as storage folder name
        const {image} = this.state;
        //const uploadTask = firebase.storage().ref(image.name + "_0").put(this.state.image)
        const uploadTask = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_0`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        (error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name + "_0").getDownloadURL().then(url=>{this.setState({url})})})
        ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_0").getDownloadURL().then(url=>{this.setState({url})})})
        
        // here add another pic here to Storage collection with a diff name adding a _1 behind
        //const uploadTask1 = firebase.storage().ref(image.name + "_1").put(this.state.image)
        const uploadTask1 = firebase.storage().ref(`${stallIdNo}/${emailUser}/${stallIdNo}_1`).put(this.state.image)
        uploadTask1.on('state_changed', (snapshot)=>{console.log('snapshot_1')},
        (error) =>{console.log(error);},
        //()=>{firebase.storage().ref().child(image.name + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})
        ()=>{firebase.storage().ref(`${stallIdNo}/${emailUser}`).child(stallIdNo + "_1").getDownloadURL().then(url1=>{this.setState({url1})})})  
    }

    onSubmit = async(e) => {
        // to notify, must write to firebase notification and also must set to gotmail for all member = 1 to turn the PN red at food
        if (this.state.url == null){
            //the default dummy icon picture
            var url = "https://firebasestorage.googleapis.com/v0/b/partswanted-aa4f7.appspot.com/o/partsIcon.png?alt=media&token=69ed115e-862b-452f-bf31-e56baabd20c3"
            //this.setState({url})
            this.state.url = url;
        }
        
        var thisId = "";

        //var today = new Date();
        //var dd = String(today.getDate()).padStart(2, '0');
        //var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        //var yyyy = today.getFullYear();
        //var tttt = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //today = yyyy + '-' + mm + '-' + dd + " " + tttt;
       
        var customerSelect = document.getElementById("customerPicked");
        customerSelected = customerSelect.options[customerSelect.selectedIndex].text;

        e.preventDefault();
        //console.log("url here: " + url)
        //console.log("this state Url: " + url)
        //const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, remark, customer, tgtPrice, stallId, quotes, poUploaded, poStatus} = this.state;
        const {whatUse, whatModel, whatPN, whatQty, remark, tgtPrice, quotes, poUploaded, poStatus} = this.state;
        //console.log("stallId " + stallIdNo + "   emailuser :" +  emailUser + "  todayFormatted: " + todayFormatted + "image: " + this.state.url);
        if (this.state.whatPN != ""){
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).set({whouploadId: emailUser, whoupload:emailUser, whatUse, whatModel, whatPN, whatQty, whenAsk:todayFormatted, remark, since:todayFormatted, image: this.state.url, rating: 2, customer:customerSelected, tgtPrice, stallId: stallIdNo, quotes, poUploaded, poStatus, stage: 1});
            /*   
            .then((docRef) =>{
                    this.setState({ //below is just to setState after added data
                        whouploadId: emailUser,
                        whoupload: emailUser,
                        whatUse: '',
                        whatModel: '',
                        whatQty: '',
                        whenAsk: todayFormatted,
                        remark: '',
                        since: todayFormatted,
                        image: this.state.url,
                        rating: 2,
                        customer: customerSelected,
                        tgtPrice: tgtPrice,
                        stallId: stallIdNo,
                        quotes: '',
                        poUploaded: '',
                        poStatus: '',
                        stage: 1

                    });
                    thisId = docRef.id;
                    this.props.history.push("/list");

                    // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                    firebase.firestore().collection("req@gmail.com").doc(thisId).collection("pictures").add({
                        image: this.state.url1}). then((docRef2)=>{
                    this.setState({image: this.state.url1 });
                        this.props.history.push("/list")
                    })

                })
                .catch ((error) => {console.error("Error adding document: ", error);}) 
                */

                firebase.firestore().collection("NotificationTrigger").add({
                    food: whatPN,
                    groupId:  "req@gmail.com",
                    image: this.state.url,
                    index: -2,
                    place: whatUse,
                    qty: whatQty,
                    remark: remark,
                    stall: whatModel,
                    stallId: stallIdNo
                })

                //const {gotMail} = this.state;
                // 5 members at most (including sender himself)
                if (memberId1 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId1).set({gotMail: 1});
                if (memberId2 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId2).set({gotMail: 1});
                if (memberId3 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId3).set({gotMail: 1});
                if (memberId4 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId4).set({gotMail: 1});
                if (memberId5 != "") firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("mailBox").doc(memberId5).set({gotMail: 1});
        }
        this.props.history.push("/list");

        if (this.state.url1 != null){
            // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                image: this.state.url1}). then((docRef2)=>{
                this.setState({image: this.state.url1 });
                //this.props.history.push("/list")
            })
        }


    }

    
    submitSomeMore = async(e) => {
        if (this.state.whatPN != ""){
            if (this.state.url == null){
                //the default dummy icon picture
                var url = "https://firebasestorage.googleapis.com/v0/b/partswanted-aa4f7.appspot.com/o/partsIcon.png?alt=media&token=69ed115e-862b-452f-bf31-e56baabd20c3"
                //this.setState({url})
                this.state.url = url;
            }
            e.preventDefault();
            //const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, remark, customer, tgtPrice, stallId, quotes, poUploaded, poStatus} = this.state;
            const {whatUse, whatModel, whatPN, whatQty, remark, tgtPrice, quotes, poUploaded, poStatus} = this.state;
            firebase.firestore().collection("req@gmail.com").doc(stallIdNo).set({whouploadId: emailUser, whoupload:emailUser, whatUse, whatModel, whatPN, whatQty, whenAsk:todayFormatted, remark, since:todayFormatted, image: this.state.url, rating: 2, customer:customerSelected, tgtPrice, stallId: stallIdNo, quotes, poUploaded, poStatus, stage: 1});
            firebase.firestore().collection("NotificationTrigger").add({
                food: whatPN,
                groupId:  "req@gmail.com",
                image: this.state.url,
                index: -2,
                place: whatUse,
                qty: whatQty,
                remark: remark,
                stall: whatModel,
                stallId: stallIdNo
            })
            //this.props.history.push("/moreparts");
            //res.render( 'moreparts', { stallIdNo: stallIdNo } );
            
            if (this.state.url1 != null){
                //console.log("here at url1 writing");
                // update the pic collection pic name with a dff name when above additional pict uploading to Storage is done
                firebase.firestore().collection("req@gmail.com").doc(stallIdNo).collection("pictures").add({
                    image: this.state.url1}). then((docRef2)=>{
                this.setState({image: this.state.url1 });
                })
            }
            this.props.history.push({pathname: '/moreparts', state: {docId: stallIdNo, emailId: emailUser}});
        }
    }
        


    render (){
        //const {whouploadId, whoupload, whatUse, whatModel, whatPN, whatQty, remark, since, whenAsk, customer, tgtPrice} = this.state;
        const {whatUse, whatModel, whatPN, whatQty, remark, tgtPrice} = this.state;
        const cardStyles = {
            width: '40rem',
            height: 'auto',
            backgroundColor: 'white',
            margin: 'auto',
            display: 'block',
            marginTop: '60px',
            opacity: 0.8,
            paddingTop: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderStyle: 'outset',
            borderLeft: '20px solid green',
            //borderRadius: '20px'
            }
/*
                <div>
                    <AddMoreParts valueFromAddProduct={"from AddProduct"}/>
                </div>        
*/        
        return(
            <div>

                <card style ={cardStyles}>
                    <div className = "Button">
                        <Link to ="/list"> 
                        <button class ="Edit-Button" >Back</button>
                        </Link>
                    </div>
                    &nbsp;


                    <div>
                        <div class="form-group"></div>
                        <label for="customer">Enter part info below:</label>
                    </div>

                    <select name="customerOption" id="customerPicked">
                        <option value="1">Select customer</option>
                        <option value="2">Courts</option>
                        <option value="3">Harvey Norman</option>
                        <option value="4">Asus</option>
                        <option value="4">B2C</option>
                    </select>

                    <div>
                        <div class="form-group"></div>
                        <label for="whatModel"></label>
                        <textarea class="form-control" name="whatModel" value={whatModel} onChange={this.onChange} placeholder="Model No" cols="80" rows="1">{whatModel}</textarea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatPN"></label>
                        <textarea class="form-control" name="whatPN" value={whatPN} onChange={this.onChange} placeholder="Part No" cols="80" rows="1">{whatPN}</textarea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatQty"></label>
                        <textarea class="form-control" name="whatQty" value={whatQty} onChange={this.onChange} placeholder="Quantity" cols="80" rows="1">{whatQty}</textarea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="whatUse"></label>
                        <textarea class="form-control" name="whatUse" value={whatUse} onChange={this.onChange} placeholder="Ship to" cols="80" rows="1">{whatUse}</textarea>
                    </div>
                    <div>
                        <div class="form-group"></div>
                        <label for="tgtPrice"></label>
                        <textarea class="form-control" name="tgtPrice" value={tgtPrice} onChange={this.onChange} placeholder="Tgt Price" cols="80" rows="1">{tgtPrice}</textarea>
                    </div>

                    <div>
                        <div class="form-group"></div>
                        <label for="remark"></label>
                        <textarea class="form-control" name="remark" value={remark} onChange={this.onChange} placeholder="Desciption" cols="80" rows="3">{remark}</textarea>
                    </div>
                    <div className="upload-data">
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.url} height="200" width="200"/>
                    </div>
                    <div className="button>">
                        <button class="Submit-Button" onClick={this.onSubmit}>Done</button> &nbsp;&nbsp;&nbsp;
                        <button class="Submit-Button" onClick={this.submitSomeMore}>Somemore parts</button> &nbsp;&nbsp;&nbsp;
                        
                    </div>
                    &nbsp;
                </card>
            </div>
        )
    }
}
export default AddProduct
