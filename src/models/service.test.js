/**
 * Unit tests for the service model
 */
const service = require('./service');

// Push some test data
service.add('foobar', 'fa-bam', 'Earth');
service.add('Foobar Bambaz', 'fa-bambaz', 'Moon');

// Find services
test('No match found', () => {
  expect(service.find('Bueller?').length).toBe(0);
});

test('Find a service by exact match (case insensitive)', () => {
  expect(service.find('foobar bambaz')).toEqual([
    { name: 'Foobar Bambaz', icon: 'fa-bambaz', location: 'Moon' }
  ]);
});

test('Find a service by exact match (case sensitive)', () => {
  expect(service.find('Foobar Bambaz')).toEqual([
    { name: 'Foobar Bambaz', icon: 'fa-bambaz', location: 'Moon' }
  ]);
});

test('Find services by partial match (mixed case)', () => {
  expect(service.find('foobar')).toEqual([
    { name: 'foobar', icon: 'fa-bam', location: 'Earth' },
    { name: 'Foobar Bambaz', icon: 'fa-bambaz', location: 'Moon' }
  ]);
});

test('Add a new service', () => {  
  expect(service.find('Blep').length).toBe(0); // Check doesn't exist

  service.add('Blep', 'fa-blep', 'Pluto'); // Add it and check again
  expect(service.find('Blep')).toEqual([
    { name: 'Blep', icon: 'fa-blep', location: 'Pluto' }
  ]);
});

test('Modify a service', () => {
  expect(service.find('Blep')).toEqual([
    { name: 'Blep', icon: 'fa-blep', location: 'Pluto' }
  ]);

  service.edit('Blep', {name: 'Beezor', icon: 'fa-beezor', locatin: 'Somewhere'})
  
  expect(service.find('Blep').length).toBe(0);
  expect(service.find('Beezor')).toEqual([
    {name: 'Beezor', icon: 'fa-beezor', location: 'Somewhere'}
  ]);
});

test('Delete a service', () => {
  expect(service.find('Beezor').length).toBe(1);
  service.delete('Beezor');
  expect(service.find('Beezor').length).toBe(0);
});