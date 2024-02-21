const MailQueue=require('../initializer/mail_queue')

const options={
    delay:1000,
    attempts:5
};

async function add_work(email){
    const data={
        email:email
    };
    
    await MailQueue.add(data,options);
    console.log("The data is ",data);
    console.log("Total jobs remaining",
    await MailQueue.getJobCounts() );

}

module.exports=add_work;