/**
 * Service model object
 */

// Test data
// TODO: move this into a database
let services = [
    { name: 'New passport', icon: 'fa-user', location: 'Service office' },
    { name: 'Passport renewal', icon: 'fa-user', location: 'Service office' },
    { name: 'Electronic recycling', icon: 'fa-laptop', location: 'Service office' },
    { name: 'Address change', icon: 'fa-map-marker-alt', location: 'Online' },
    { name: 'Small business grant', icon: 'fa-hand-holding-usd', location: 'Online' },
    { name: 'Business number application', icon: 'fa-money-check-alt', location: 'Online' }
];

// Adds a service
exports.add = (name, icon, location) => {
    services.push({name: name, icon: icon, location: location});
};

// Modify a service
exports.edit = (name, updatedService) => {
    const idx = services.findIndex(obj => obj.name === name);
    if(idx !== -1){
        services[idx] = updatedService;
    }
};

// Delete a service
exports.delete = (name) => {
    services = services.filter(obj => obj.name !== name);
}

// Find services that match a given name parameters
exports.find = (name) => {
    const regex = new RegExp(name, 'i');
    const matchingServices = services.filter(obj => null);
    return matchingServices.sort((a, b) => a.name.localeCompare(b.name));
};