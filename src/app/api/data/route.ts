import { faker } from '@faker-js/faker';

type FakeData = {
  id: number;
  name: string;
  email: string;
  job: string;
  address: string;
  city: string;
  state: string;
  [key: string]: any;
};

type ReqType = {
  seed: number;
  size: number;
  sortBy: string | null;
};

function sortDataBy(data: FakeData[], byKey: string) {
  const sortedData = data.sort((a, b) => a[byKey].localeCompare(b[byKey]));
  return sortedData;
}

export async function POST(request: Request) {
  const { seed, size, sortBy }: ReqType = await request.json();
  faker.seed(seed);

  const fakeData: FakeData[] = [];

  for (let i = 0; i < size; i++) {
    fakeData.push({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
    });
  }

  if (sortBy) {
    Response.json(sortDataBy(fakeData, sortBy));
  }
  return Response.json(fakeData);
}
