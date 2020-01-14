var db = firebase.firestore();

function PasswordMatch() {
  sEmail = document.getElementById("sEmail").value;
  sPass = document.getElementById("sPass").value;
  RetypePass = document.getElementById("Retype_Pass").value;

  console.log("Email:", sEmail);
  console.log("sPass", sPass);
  console.log("RetypePass", RetypePass);

  if (sPass === RetypePass) {
    signUpFunc();
  } else {
    alert("Your Password is mismatched");
  }
}

                // SIGN UP 

function signUpFunc() {
  firebase
    .auth()
    .createUserWithEmailAndPassword(sEmail, sPass)
    .then(data => {
      console.log(data);
      var userData = {
        email: data.user.email,
        uid: data.user.uid
      };
      saveUser(userData);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });
}
                // SIGN UP END 
                

                // LOGIN 

function loginFunc() {
  let lEmail = document.getElementById("lEmail").value;
  let lPass = document.getElementById("lPass").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(lEmail, lPass)
    .then(data => {
      console.log(data);
      alert("Sign in succesful with this Email: " + data.user.email);

      var obj = {
        email: data.user.email,
        uid: data.user.uid
      };
      var stringData = JSON.stringify(obj);
      localStorage.setItem("user", stringData);

      window.location.href = "./olx.html"

    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });
}

                // LOGIN END


// saveUser =(data = {name: "Uzair"})=>{
//     console.log(data)

//     db.collection("User").add(data).then(()=>{console.log("then")}).catch((err)=>{console.log(err)})
// }

saveUser = data => {
  console.log("saveUser: ", data);

  db.collection("user")
    .doc(data.uid)
    .set(data)
    .then(() => {
      console.log("then");
    })
    .catch(err => {
      console.log("err ", err);
    });
};
getFromLocalStorage = () => {
  var user = localStorage.getItem("user");
  var userObj = JSON.parse(user);
  console.log("getFromLocalStorage: ", user);
  console.log("getFromLocalStorage: ", userObj);

  db.collection("user")
    .doc(userObj.uid)
    .get()
    .then(doc => {
      console.log("getFromLocalStorage: ", doc);
      console.log("getFromLocalStorage: ", doc.data());
    })
    .catch(err => {
      alert(err.message);
    });
};

// getAllRooms = async () => {
//   console.log("getAllRooms: ", getAllRooms);
//   const userID = "1212";
//   const res = await db
//     .collection("chatRooms")
//     .where(userID, "==", true)
//     .get();

//   res.forEach(function(doc, i){
//     console.log("doc.data()", doc.data(), doc.id);
//     let button = document.createElement("button");
//     button.innerHTML = `room`;
//     button.value = doc.id
//     button.setAttribute("onclick", `sentMsg(this)`);
//     document.getElementById("chat").appendChild(button);
//   });
// };
// getAllRooms();

// sentMsg = (e) => {
//     console.log('sentMsg: ', e.value);
//     db.collection("chatRooms")
//     .doc(e.value)
//     .collection("msg")
//     .add({msg:"Ayan1"})
// };
