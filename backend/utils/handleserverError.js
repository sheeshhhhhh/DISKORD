
/**  
 * Responsible for handling server errors
 * @param {string} res - your res function
 * @param {string} message - message that you want to say
 * @param {int} status - the status code(default 400)
 * @param {string} [controllerSection] - optional but when you want to print the error
*/

const handleError = (res, message, status, controllerSection) => {
    try {
        if (controllerSection) {
            console.error("Error in the " + controllerSection);
            res.status(status || 500).json({ error: "Internal Server Error" });
        } else {
            res.status(status || 400).json({ error: message });
        }
    } catch (error) {
        console.error("Error in the handleError function:", error.message);
    }
}

export default handleError