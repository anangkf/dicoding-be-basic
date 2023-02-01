const checkAvailability = (array, id) => array.filter((val) => val.id === id).length > 0;

module.exports = checkAvailability;
