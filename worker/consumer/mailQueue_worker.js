const MailQueue=require('../initializer/mail_queue')
const nodemailer=require('nodemailer')
const Failqueue=require('../initializer/fail_queue');

MailQueue.process(async job=> {
    console.log(job.data.email);
    return await sendmail(job.data.email);
});

MailQueue.on('failed', async (job, err) => {
    const options = {
        delay: 1000,
        attempts: 5  
    };
    const data = {
        email: "harishsiva2141@gmail.com"
    };
    await Failqueue.add(data, options);
});


async function sendmail(email){
    console.log("Total jobs remaining",
    await MailQueue.getJobCounts() );
    return new Promise((resolve,reject)=>{
        let mailOptions={
            from:'harishsiva2141@gmail.com',
            to:email,
            subject:'Verification',
            html: '<div><h2>Click here to <a href="http://localhost:5000/user/email/' + email + '">verify</a></h2></div>'
};

        let mailconfig={
            service:'gmail',
            auth:{
                user:'harishsiva2141@gmail.com',
                pass:'sppw ysbe qoke ilxf'
            }
        };

        nodemailer.createTransport(mailconfig).sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else console.log(info);
            resolve(info);
        })

    })
}


