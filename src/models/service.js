/**
 * Service model object
 */

// Test data
// TODO: move this into a proper database
const services = [
    { name: 'New passport', icon: 'fa-user', location: 'Service office' },
    { name: 'Passport renewal', icon: 'fa-user', location: 'Service office' },
    { name: 'Electronic recycling', icon: 'fa-laptop', location: 'Service office' },
    { name: 'Address change', icon: 'fa-map-marker-alt', location: 'Online' },
    { name: 'Small business grant', icon: 'fa-hand-holding-usd', location: 'Online' },
    { name: 'Business number application', icon: 'fa-money-check-alt', location: 'Online' }
];

// Find services that match a given name parameters
exports.find = (name) => {
    const regex = new RegExp(name, 'i');
    const matchingServices = services.filter(obj => obj.name.search(regex) !== -1);
    return matchingServices.sort((a, b) => a.name.localeCompare(b.name));
};