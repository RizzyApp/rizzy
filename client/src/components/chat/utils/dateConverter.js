const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;


const dateConverter = (lastActiveTimestamp, prefix) => {
    const now = new Date();
    const elapsed = now - new Date(lastActiveTimestamp);

    let addedTime;

    if (elapsed < second * 5) {
        addedTime = "just now";
    } else if (elapsed < minute) {
        const seconds = Math.floor(elapsed / second);
        addedTime = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    } else if (elapsed < hour) {
        const minutes = Math.floor(elapsed / minute);
        addedTime = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (elapsed < day) {
        const hours = Math.floor(elapsed / hour);
        addedTime = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (elapsed < day * 2) {
        addedTime = "yesterday";
    } else if (elapsed < day * 6){
        const days = Math.floor(elapsed / day);
        addedTime = `${days} days ago`;
    }
    else {
        const date = new Date(lastActiveTimestamp);
        addedTime = `on ${date.toLocaleDateString()}`;
    }

    return prefix + addedTime;
}

export default dateConverter;