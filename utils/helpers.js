module.exports = {
    format_date: (date) => {
        // Check if date is a Date object
        if (date instanceof Date) {
            return date.toLocaleDateString(); // Correct method name
        }
        return date; // Return the date as is if it's not a Date object
    },
    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },
    is_my_page: (pageUser, userId) => {
        return pageUser === userId;
    },
};
