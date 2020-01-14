
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
// var obj={};

var d = new Date();
var getDate = d.getDate();
var month = d.getMonth();
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var MonthName = months[month];


    
function saveData(){

    var category = document.getElementById("category").value;
    var location = document.getElementById("location").value;
    var contact = document.getElementById("contact").value;
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var date = MonthName + ' ' + getDate;
    var photo = document.getElementById("photos").value;
    var file = document.getElementById('photos').files[0];

   

    
    
    console.log('category: ', category);
    console.log('location: ', location);
    console.log('contact: ', contact);
    console.log('name: ', name);
    console.log('description: ', description);
    console.log('price: ', price);
    console.log('date: ', date);
    // console.log('imgURL: ', imgURL);

// saving image to firebase Storage

console.log('file: ', file);
     
storageRef.child(`images/${file.name}`).put(file).then(()=>{

    console.log('file saved at Firebase Storage');
    
       // getting image URL

    storageRef.child(`images/${file.name}`).getDownloadURL().then((url)=>{
        // obj.url = url;
        // console.log('url: ', url.toString());
        const ownerID = JSON.parse(localStorage.getItem('user')); 
        console.log('ownerID: ', ownerID.uid);

      var  obj = {
            category,
            location,
            contact, 
            name,
            description,
            price,
            date,
            url,
            ownerId: ownerID.uid
        
            
        }
        
        console.log(obj);

         saveAtFirestore(obj);
       

    })
})

   
    

}

saveAtFirestore = (data) =>{
    
    db.collection("ads").add(data).then((docRef)=>{
        alert("Ad Post Succesfully !");
        window.location.href = "./olx.html"
        console.log('Data sent to firestore:', docRef);

    }).catch((err)=>{
        console.log('error caught:', err);
    })


}

// var saveImg =(file)=>{

//      //  imgPath = storgaeRef.child();
     
//     //  var imgName = ;
//      console.log('file: ', file);
     
//      storageRef.child(`images/${file.name}`).put(file).then(()=>{

//          console.log('file saved at Firebase Storage');
         
//          storageRef.child(`images/${file.name}`).getDownloadURL().then((url)=>{
//              console.log('url: ', url.toString());
//              imgURL = url;

//                 console.log(obj);
            

//          })
//      })
//     //  getUrl();
//     }
// var getUrl=()=>{

//     var file = document.getElementById('photos').files[0];

//     firebase.storage().ref('/images/').put(file).snapshot.ref.getDownloadURL().then( 
//         function(downloadURL) { 

//        // You get your url from here 
//         console.log('File available at', downloadURL);
//         })
// }
// storageRef.child(`images/${file.name}`).getDownloadURL().then((url)=>{
//     console.log('url: ', url);

// })