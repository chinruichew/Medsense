const nodemailer = require('nodemailer');

const UserLevelScheme = require('../models/UserLevelScheme');
const ContributionLevelScheme = require('../models/ContributionLevelScheme');

const keys = require('../config/keys');

module.exports = {
    ISO_DATE_FORMATTER: async(date) => {
        return new Date(date.substring(0, date.length - 1) + '-08:00');
    },
    UTC_DATE_FORMATTER: async(date) => {
        return new Date(date.substring(0, date.length - 1) + '+08:00');
    },
    CALCULATE_USER_LEVEL: async(xp) => {
        let level;
        if (xp<480){
            level = 1;
        } else {
            level = Math.floor((120 + Math.sqrt(120**2-4*120*(240-xp)))/(2*120));
        }
        return level;
    },
    CALCULATE_USER_RANK: async(level) => {
        const userLevelSchemes = await UserLevelScheme.find().sort({level: -1});
        let userRank = '';
        for(let i = 0; i < userLevelSchemes.length; i++) {
            const userLevelScheme = userLevelSchemes[i];
            if(userLevelScheme.level <= level) {
                userRank = userLevelScheme.rank;
                break;
            }
        }
        return userRank;
    },
    CALCULATE_CONTRIBUTION_RANK: async(points) => {
        const contributionSchemes = await ContributionLevelScheme.find().sort({point: -1});
        let rank = '';
        for(let i = 0; i < contributionSchemes.length; i++) {
            const contributionScheme = contributionSchemes[i];
            if(contributionScheme.point <= points) {
                rank = contributionScheme.rank;
                break;
            }
        }
        return rank;
    },
    SEND_AUTOMATED_EMAIL: async(email, subject, htmlText) => {
        // Generate email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: keys.medsenseEmailUsername,
                pass: keys.medsenseEmailPassword
            }
        });
        const mailOptions = {
            from: keys.medsenseEmailUsername,
            to: email,
            subject: subject,
            html: htmlText
        };
        transporter.sendMail(mailOptions, function(err, info){
            if (err) {
                throw(err);
            }

            // Do not erase - Production Logging
            console.log('Email sent: ' + info.response);
        });
    }
};