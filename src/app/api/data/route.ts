import { fa, faker } from '@faker-js/faker';

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
  sortAsc: boolean;
  filterByState: string | null;
};

function sortDataBy(data: FakeData[], byKey: string, sortAsc: boolean) {
  if (sortAsc) {
    const sortedData = data.sort((a, b) => b[byKey].localeCompare(a[byKey]));
    return sortedData;
  }
  const sortedData = data.sort((a, b) => a[byKey].localeCompare(b[byKey]));
  return sortedData;
}

function getUniqueItems(data: FakeData[], uniqueKey: string): string[] {
  const uniqueSet: Set<string> = new Set();

  data.forEach((item) => {
    if (item[uniqueKey]) {
      uniqueSet.add(item[uniqueKey]);
    }
  });

  const cities = Array.from(uniqueSet);

  return cities.sort((a, b) => a.localeCompare(b));
}

export async function POST(request: Request) {
  const { seed, size, sortBy, sortAsc, filterByState }: ReqType = await request.json();
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
  const unqiueStates = getUniqueItems(fakeData, 'state');

  if (sortBy) {
    Response.json({
      data: sortDataBy(fakeData, sortBy, sortAsc),
      states: unqiueStates,
    });
  }
  if (filterByState && filterByState !== 'All States') {
    const filteredData = fakeData.filter((item) => item.state === filterByState);
    return Response.json({ data: filteredData, states: unqiueStates });
  }

  return Response.json({ data: fakeData, states: unqiueStates });
}
