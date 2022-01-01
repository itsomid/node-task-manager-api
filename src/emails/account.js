const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{

    sgMail.send({
        to: email,
        from: 'me@omidshabani.com',
        subject: 'Thanks for joining us!',
        text: `Welcom ${name}`
    })
}

const sendCancelationEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'me@omidshabani.com', 
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}`
    })
}

module.exports = {
    sendWelcomeEmail
}