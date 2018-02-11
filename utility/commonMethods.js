module.exports = {
    DATE_FORMATTER: function(date) {
        return new Date(date.substring(0, date.length - 1) + '-08:00');
    }
};