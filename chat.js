





// getAllRooms = async () => {
//     console.log("getAllRooms: ", getAllRooms);
//     const userID = "1212";
//     const res = await db
//       .collection("chatRooms")
//       .where(userID, "==", true)
//       .get();
  
//     res.forEach(function(doc, i){
//       console.log("doc.data()", doc.data(), doc.id);
//       let button = document.createElement("button");
//       button.innerHTML = `room`;
//       button.value = doc.id
//       button.setAttribute("onclick", `sentMsg(this)`);
//       document.getElementById("chat").appendChild(button);
//     });
//   };
//   getAllRooms();
  
//   sentMsg = (e) => {
//       console.log('sentMsg: ', e.value);
//       db.collection("chatRooms")
//       .doc(e.value)
//       .collection("msg")
//       .add({msg:"Ayan1"})
//   };
  