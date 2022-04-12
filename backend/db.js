const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs ,doc,getDoc,updateDoc} = require('firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyDmIcrJedQRaqSaUw_Pa1OJ5uq7dgEVipg",
    authDomain: "stripetest-dbacd.firebaseapp.com",
    projectId: "stripetest-dbacd",
    storageBucket: "stripetest-dbacd.appspot.com",
    messagingSenderId: "1020480673719",
    appId: "1:1020480673719:web:12109985e62511e819fa32",
    measurementId: "G-NBKXX1VRB5"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  find = async(id,collection_name)=>{
    return await (await getDoc(doc(db,collection_name,id))).data();
  }
  update= async(id,newObj,collection_name)=>{
    return await updateDoc(doc(db,collection_name,id),newObj);
  }
 module.exports= {
     find,update
 };