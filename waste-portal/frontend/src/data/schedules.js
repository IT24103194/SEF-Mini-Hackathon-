// Static sample data for the prototype.
// Each council has one or more collection routes, each with a waste type,
// the weekdays it runs, and the typical start time.
// weekday numbers follow JS convention: 0 = Sunday ... 6 = Saturday

export const COUNCILS = [
  {
    id: 'cmc',
    name: 'Colombo Municipal Council',
    routes: [
      { wasteType: 'Organic', days: [1, 4], time: '06:30' }, // Mon, Thu
      { wasteType: 'Recyclable', days: [3], time: '07:00' }, // Wed
      { wasteType: 'General/Non-Recyclable', days: [2, 5], time: '06:00' }, // Tue, Fri
    ],
  },
  {
    id: 'dmc',
    name: 'Dehiwala-Mount Lavinia Municipal Council',
    routes: [
      { wasteType: 'Organic', days: [1, 3, 5], time: '06:00' },
      { wasteType: 'Recyclable', days: [2], time: '07:30' },
      { wasteType: 'General/Non-Recyclable', days: [4, 6], time: '06:30' },
    ],
  },
  {
    id: 'smc',
    name: 'Sri Jayawardenepura Kotte Municipal Council',
    routes: [
      { wasteType: 'Organic', days: [2, 5], time: '06:15' },
      { wasteType: 'Recyclable', days: [4], time: '07:00' },
      { wasteType: 'General/Non-Recyclable', days: [1, 6], time: '06:00' },
    ],
  },
  {
    id: 'kmc',
    name: 'Kandy Municipal Council',
    routes: [
      { wasteType: 'Organic', days: [1, 4], time: '06:45' },
      { wasteType: 'Recyclable', days: [6], time: '08:00' },
      { wasteType: 'General/Non-Recyclable', days: [2, 5], time: '06:30' },
    ],
  },
  {
    id: 'gmc',
    name: 'Galle Municipal Council',
    routes: [
      { wasteType: 'Organic', days: [2, 5], time: '06:30' },
      { wasteType: 'Recyclable', days: [3], time: '07:15' },
      { wasteType: 'General/Non-Recyclable', days: [1, 6], time: '06:00' },
    ],
  },
  {
    id: 'nmc',
    name: 'Negombo Municipal Council',
    routes: [
      { wasteType: 'Organic', days: [1, 3, 6], time: '06:00' },
      { wasteType: 'Recyclable', days: [4], time: '07:00' },
      { wasteType: 'General/Non-Recyclable', days: [2, 5], time: '06:30' },
    ],
  },
];

export const WASTE_TYPES = [
  'Organic',
  'Recyclable',
  'E-Waste/Hazardous',
  'General/Non-Recyclable',
];

export const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
