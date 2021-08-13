const express = require('express');
const router = express.Router()
const connection = require("../config/database");

//user
router.get('/user', (req,res,next)=>{
  const user=[]
  const q = `SELECT *, DATE_FORMAT(timestamp, '%D %M %Y') as date FROM haji_users`
  connection.query(q,(err,results)=>{
    if(err){
      console.log(err)
    }

    // console.log(results)
    results.forEach((result)=>{
      if(result.role !=='admin'){
        const userDetail = {
          // 1. username
          // 2. email
          // 3. id
          // 4. topics
            userID : result.id,
            username : result.userName,
            email : result.email,
            date : result.date
          }
          user.push(userDetail)
      }
    })
    res.json(user)
    // console.log(user)

    // ret = JSON.stringify(user);
    // res.header("Content-Type", "application/json; charset=utf-8");
    // res.send(user);
  })
})

//user with topic
router.get('/user-topic', (req,res,next)=>{
  const user=[]
  const q = `SELECT * FROM haji_users INNER JOIN haji_topics ON haji_users.id=haji_topics.userID`
  connection.query(q,(err,results)=>{
    // console.log(results)
    results.forEach((result)=>{
      if(result.role !=='admin'){
        const userDetail = {
          // 1. username
          // 2. email
          // 3. id
          // 4. topics
            userID : result.id,
            username : result.userName,
            email : result.email,
            topics : result.topics,
            deviceID : result.deviceID
          }
          user.push(userDetail)
      }
    })
    res.json(user)
    // console.log(user)

    // ret = JSON.stringify(user);
    // res.header("Content-Type", "application/json; charset=utf-8");
    // res.send(user);
  })
})


//delete topic
router.delete('/user-topic', (req,res,next)=>{
  const {userID, topics} = req.body
  // console.log(userID)
  // console.log(topics)
  // const user=[]
  const q = `DELETE FROM haji_topics WHERE userID ="${userID}" AND topics="${topics}" `
  connection.query(q,(err,results)=>{
    // console.log(results)
    // results.forEach((result)=>{
    //   if(result.role !=='admin'){
    //     const userDetail = {
    //       // 1. username
    //       // 2. email
    //       // 3. id
    //       // 4. topics
    //         userID : result.id,
    //         username : result.userName,
    //         email : result.email,
    //         topics : result.topics
    //       }
    //       user.push(userDetail)
    //   }
    // })
    res.json('deleted')
    // console.log(user)

    // ret = JSON.stringify(user);
    // res.header("Content-Type", "application/json; charset=utf-8");
    // res.send(user);
  })
  // res.json('deleted')
})

//update topic
router.put('/user-topic', (req,res,next)=>{
  const {userID, oldTopic, newTopic, oldDeviceID, newDeviceID} = req.body.data
  // console.log(req.body)
  // console.log(userID)
  // console.log(oldTopic)
  // console.log(newTopic)
  // const user=[]
  const q = `UPDATE haji_topics SET topics="${newTopic}", deviceID="${newDeviceID}" WHERE userID ="${userID}" AND topics="${oldTopic}" AND deviceID="${oldDeviceID}" `
  connection.query(q,(err,results)=>{
    console.log(err)
    // console.log(results)
    // results.forEach((result)=>{
    //   if(result.role !=='admin'){
    //     const userDetail = {
    //       // 1. username
    //       // 2. email
    //       // 3. id
    //       // 4. topics
    //         userID : result.id,
    //         username : result.userName,
    //         email : result.email,
    //         topics : result.topics
    //       }
    //       user.push(userDetail)
    //   }
    // })
    // console.log('here')
    res.json('updated')
    // console.log(user)

    // ret = JSON.stringify(user);
    // res.header("Content-Type", "application/json; charset=utf-8");
    // res.send(user);
  })
  // res.json('updated')
})



router.post('/register', (req,res,next)=>{
  const userID = req.body.userID;
  const topic = req.body.topic;
  const deviceID = req.body.deviceID
  console.log(deviceID)
  const error=[]
  const newTopic={
    userID: userID,
    deviceID: deviceID,
    topics: topic
  }
  const queryCheckUser = `SELECT * FROM haji_users WHERE id='${userID}'`;
  const queryInsertNewTopic = `INSERT INTO haji_topics SET ?`;
  connection.query(queryCheckUser, (err,results)=>{
    if(err){
      console.log(err)
      error.push( { msg: 'Error. Please try again.'})
      res.send(error)
    } 
    if(results.length==0){

      error.push( { msg: 'Invalid userID.'})
      res.send(error)
    }else if(results.length>0){
      // console.log(results)
      connection.query(
        queryInsertNewTopic,
        newTopic,
        (err,results) =>{
          if(err) {
            error.push( { msg: 'Error. Please try again.'})
            res.send(error)
          }
          if(results){
            error.push( { msg: 'Success'})
            res.send(error)
          } 
        }
      )
    }

  })

})

module.exports = router