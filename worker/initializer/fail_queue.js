const Queue=require('bull');
const failQueue=new Queue('fail_mail',{redis:{port:6379,host:'127.0.0.1'}});

module.exports=failQueue;