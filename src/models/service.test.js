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

// Add a service
test('Add a new service', () => {
  // Check doesn't exist
  expect(service.find('Blep').length).toBe(0);

  // Add it and check again
  service.add('Blep', 'fa-blep', 'Pluto');
  expect(service.find('Blep')).toEqual([
    { name: 'Blep', icon: 'fa-blep', location: 'Pluto' }
  ]);
});