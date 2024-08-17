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

const mockTraining = {
  start_range: new Date(),
  end_range: new Date(),
  content: [
    {
      date: new Date(),
      dayOfWeek: 'Monday',
      training: [
        {
          id: 1,
          start: new Date(),
          end: new Date(),
          title: 'Morning Training',
          description: 'Nice training',
          instructor: {
            id: 1,
            fullName: 'Instructor Full Name'
          },
          areas: ['Area1', 'Area2'],
          intensity: 'Intermediate',
          level: 'Beginner',
          type: 'In-person',
          kind: 'Group',
          location: 'Room 2',
          totalPlaces: 10,
          freePlaces: 8,
          createdAt: new Date(),
          createdBy: {
            id: 2,
            fullName: 'Admin Full Name',
            role: 'ROLE_ADMIN'
          }
        }
      ]
    }
  ]
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