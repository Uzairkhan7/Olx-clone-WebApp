var db = firebase.firestore();
var docRef = firebase.storage().ref();

var renderData = async () => {
  var ads = [];
  db.collection("ads").onSnapshot(function(doc) {
    ads=[]
    doc.forEach(doc => {
      ads.push({...doc.data(), adID: doc.id});

      console.log("doc.data(): ", doc.data());
      console.log('doc: ', doc);
    });
    console.log("ads: ", ads);
    renderCard(ads)
    
  });

  
};

renderCard = (ads)=>{
    var main = document.getElementById("row1");
    // main.innerHTML = ""
    for (var i = 0; i < ads.length; i++) {
        console.log("ads[]: ", ads[i]);
    
    
        var ad_box = document.createElement("div");
        ad_box.setAttribute("class", "ad_box");
    
        var img_div = document.createElement("div");
        img_div.setAttribute("class", "img");
    
        var img = document.createElement("img");
        img.setAttribute("src", ads[i].url);
    
        img_div.appendChild(img);
    
        var text_div = document.createElement("div");
        text_div.setAttribute("class", "text");

        var iconDiv = document.createElement('div');
            iconDiv.setAttribute('class','chatIcon')
        var i_tag = document.createElement('i')
            i_tag.setAttribute('class', 'far fa-comment-alt')
            i_tag.setAttribute('onclick','openChat(this)')
            i_tag.id = ads[i].adID
            iconDiv.appendChild(i_tag)
    
        var b = document.createElement("b");
        b.innerHTML = "Rs " + ads[i].price;
        var p = document.createElement("p");
        p.innerHTML = ads[i].description;
    
        var location_div = document.createElement("div");
        location_div.setAttribute("class", "location");
    
        var section1 = document.createElement("section");
        section1.setAttribute("class", "loc");
        section1.innerHTML = ads[i].location;
    
        var section2 = document.createElement("section");
        section2.setAttribute("class", "loc");
        section2.innerHTML = ads[i].date;
    
        location_div.appendChild(section1);
        location_div.appendChild(section2);
    
        text_div.appendChild(b);
        text_div.appendChild(p);
        text_div.appendChild(iconDiv);
        text_div.appendChild(location_div);
    
        ad_box.appendChild(img_div);
        ad_box.appendChild(text_div);
    
        main.appendChild(ad_box);
      }
};

async function openChat(e){
  const userData = JSON.parse(localStorage.getItem('user')); 
  console.log('userData: ', userData);
  if(userData === null){
    console.log('if');
    alert('Please Login First !')
    return
  }
console.log('e.id', e.id);

const response = await db
    .collection('ads')  
    .doc(e.id)
    .get();

console.log('response: ', response.data());
console.log('response: ', response.id);
const adData = {...response.data(), adID: e.id}
console.log('adData: ', adData);
localStorage.setItem("adData", JSON.stringify(adData));
window.location.href = "./chat.html";

}
async function loadChat(){
  const adData = JSON.parse(localStorage.getItem('adData'));
  const user = JSON.parse(localStorage.getItem('user'));

  const chatRes = await db
  .collection("chatRooms")
  .where(adData.ownerId, "==", true)
  .where(adData.adID, "==", true)
  .where(user.uid, "==", true)
  .get();
  console.log('chatRes: ', chatRes.size);
  if(!chatRes.size){
    createChatCollection(adData, user);
    return
  }
  const allMsg = [];
  chatRes.forEach(async doc =>{
    console.log('doc: ', doc.data());
    const msgRes = await db
    .collection("chatRooms") 
    .doc(doc.id)
    .collection("msg")
    .get();
    msgRes.forEach(docs => {
      allMsg.push(docs.data());
    });

// var renderData = async () => {
//   var ads = [];
//   db.collection("ads").onSnapshot(function(doc) {
//     ads=[]
//     doc.forEach(doc => {
//       ads.push({...doc.data(), adID: doc.id});

//       console.log("doc.data(): ", doc.data());
//       console.log('doc: ', doc);
//     });
//     console.log("ads: ", ads);
//     renderCard(ads)
    
//   });

    console.log('allMsg: ', allMsg);
    console.log('msgLength: ', allMsg.length);

    const chatArea = document.getElementById('chatArea');
          chatArea.innerHTML = '';
          
    for(var i=0; i<allMsg.length; i++){


      
      
      if(allMsg[i].uid == user.uid){
        const sentMsgDiv = document.createElement('div');
        sentMsgDiv.setAttribute('class','sentMsg');
        const sentMsgBox = document.createElement('span');
        sentMsgBox.setAttribute('class', 'sentMsgBox')
        sentMsgBox.innerHTML = allMsg[i].msg;

        sentMsgDiv.appendChild(sentMsgBox);
        chatArea.appendChild(sentMsgDiv);

      }
      else{
        
        const rcvMsgDiv = document.createElement('div');
        rcvMsgDiv.setAttribute('class','rcvMsg')
        const rcvMsgBox = document.createElement('span');
        rcvMsgBox.setAttribute('class', 'rcvMsgBox')
        rcvMsgBox.innerHTML = allMsg[i].msg;

        rcvMsgDiv.appendChild(rcvMsgBox);
         chatArea.appendChild(rcvMsgDiv);
      }      
      

      
      
      


      // if(user.uid == allMsg.uid){
        
      //   sentMsg.innerHTML = allMsg[i].msg

      // }
    }
    
    
  })

}
async function  createChatCollection(adData, user){
  
  console.log('createChatCollection: ');
  await db
  .collection("chatRooms")
  .add({
      [adData.ownerId]: true,
      [adData.adID]: true,
      [user.uid]: true,
  })
  .then(()=> {
    loadChat();
  })

};

async function sentMsg(){
  console.log('sentMsg: ', );

  const inputVal = document.getElementById('textBox').value; 
  const adData = JSON.parse(localStorage.getItem('adData')) 
  const user = JSON.parse(localStorage.getItem('user'))
  const chatRes = await db
  .collection("chatRooms")
  .where(adData.ownerId, "==", true)
  .where(adData.adID, "==", true)
  .where(user.uid, "==", true)
  .get();
console.log("where pass", chatRes.size);
  chatRes.forEach(async doc => {
    console.log("doc", doc.id);
    db
    .collection("chatRooms")
    .doc(doc.id)
    .collection("msg")
    .add({
      msg: inputVal,
      uid: user.uid,
      createdAt: Date.now()
    }).then(()=>{
      loadChat()
      document.getElementById('textBox').value = ''
      console.log('inputVal: ', inputVal);
    })
  })
}


renderData();