export const getTrainingList = async () => {
  // const response = await fetch('/api/v1/test', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = await response.json();
  // return {
  //   status: response.status,
  //   body: data
  // };

  return {
    status: 200,
    body: mockTraining,
  };
};

const training = {
  start_date: '',
  end_date: '',
  content: [
    {
      date: '1 June, 2025',
      dayOfWeek: 'Monday',
      training: []
    },
    {
      date: '1 June, 2025',
      dayOfWeek: 'Monday',
      hour: 10,
      minute: 0,
      durationInMinutes: 60,
      id: 1,
      title: 'Morning Training',
      description: 'Nice training',
      instructor: {
        id: 1,
        fullName: 'John Doe'
      },
      areas: ['Yoga', 'Pilates'],
      intensity: 'Intermediate',
      level: 'Beginner',
      type: 'In-person',
      trainingPlace: 'Room 2',
      totalPlaces: 10,
      freePlaces: 8,
      createdAt: '10 Jul, 2024',
      createdBy: {
        id: 2,
        fullName: 'Jane Doe',
        role: 'ROLE_ADMIN'
      }
    }
  ]
};


const mockTraining =   {
  content: [
    {
      date: '1 June, 2025',
      dayOfWeek: 'Monday',
      hour: 10,
      minute: 0,
      durationInMinutes: 60,
      id: 1,
      title: 'Morning Training',
      description: 'Nice training',
      instructor: {
        id: 1,
        fullName: 'John Doe'
      },
      areas: ['Yoga', 'Pilates'],
      intensity: 'Intermediate',
      level: 'Beginner',
      type: 'In-person',
      trainingPlace: 'Room 2',
      totalPlaces: 10,
      freePlaces: 8,
      createdAt: '10 Jul, 2024',
      createdBy: {
        id: 2,
        fullName: 'Jane Doe',
        role: 'ROLE_ADMIN'
      }
    },
    {
      date: '2 June, 2025',
      dayOfWeek: 'Tuesday',
      hour: 10,
      minute: 0,
      durationInMinutes: 60,
      id: 2,
      title: 'Pilates',
      description: 'Pilates training',
      instructor: {
        id: 2,
        fullName: 'Kate'
      },
      areas: ['Pilates', 'Mind&Body'],
      intensity: 'Low',
      level: 'Intermediate',
      type: 'Virtual',
      trainingPlace: 'Private Facebook group',
      totalPlaces: 10,
      freePlaces: 8,
      createdAt: '10 Jul, 2024',
      createdBy: {
        id: 2,
        fullName: 'Jane Doe',
        role: 'ROLE_ADMIN'
      }
    }
  ],
  number: 0,
  totalPages: 1,
  totalElements: 1
};

export const getAreas = async () => {
  // const response = await fetch('/api/v1/test', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = await response.json();
  // return {
  //   status: response.status,
  //   body: data
  // };

  return {
    status: 200,
    body: mockAreas,
  };
};

const mockAreas = [
  { value: 1, label: 'Fitness'},
  { value: 2, label: 'Pilates'},
  { value: 3, label: 'Stretch'}
];

export const getInstructors = async () => {
  // const response = await fetch('/api/v1/test', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = await response.json();
  // return {
  //   status: response.status,
  //   body: data
  // };

  return {
    status: 200,
    body: mockInstructors,
  };
};

const mockInstructors = [
  { value: 1, label: 'John'},
  { value: 2, label: 'Kate'},
  { value: 3, label: 'Jannet'}
];