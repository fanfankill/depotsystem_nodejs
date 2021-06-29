

exports.settime=(time)=>{
    let i=0;
   return setInterval(function(){
       console.log(i++);
 },time)
}