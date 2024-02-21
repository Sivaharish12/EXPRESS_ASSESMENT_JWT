const Failqueue=require('../initializer/fail_queue')
const nodemailer=require('nodemailer')

Failqueue.process(async (job)=>{
    console.log({email: job.data.email});
    return await send_fail_mail(job.data.email)
})

function send_fail_mail(email){
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",email);
    return new Promise((resolve,resject)=>{
        let mailOptions={
            from:'harishsiva2141@gmail.com',
            to:'harishsiva24112002@gmail.com',
            subject:'Error',
            text:"error happened"
        };

        let mailconfig={
            service:'gmail',
            auth:{
                user:'harishsiva2141@gmail.com',
                pass:'sppw ysbe qoke ilxf'
            }
        };

        nodemailer.createTransport(mailconfig).sendMail(mailOptions,(err,info)=>{
            if(err) console.log(err);
            else console.log(info);
        })

    })
}