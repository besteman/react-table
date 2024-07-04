'use client';

import { use, useEffect, useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import TableHeader from './TableHeader';

interface FakeData {
  [key: string]: any;
}

function getFakeData(seed: number, size: number, sortBy: string | null) {
  return fetch(`${process.env.NEXT_URL}/api/data`, {
    method: 'POST',
    body: JSON.stringify({ seed, size, sortBy }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data);
}

export default function Table() {
  // const fakeData: FakeData[] = await getFakeData(123, 10, 'state');
  // const header = Object.keys(fakeData[0]);
  const [data, setData] = useState<FakeData[] | null>(null);
  const [header, setHeader] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState(true);

  useEffect(() => {
    fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ seed: 123, size: 10, sortBy: 'state' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setHeader(Object.keys(data[0]));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="my-6 overflow-x-auto border p-6">
      <TableHeader />
      <table className="table-md table">
        <thead>
          <tr>
            {header.map((key, index) => (
              <th key={index}>
                {key.toUpperCase()}
                <button>
                  {sortDirection ? (
                    <ChevronDoubleUpIcon className="text-primary size-4 pt-1" />
                  ) : (
                    <ChevronDoubleDownIcon className="text-primary size-4 pt-1" />
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((row) => (
              <tr key={row.id}>
                {header.map((key, index) => (
                  <td key={index}>{row[key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <div>Data not Found</div>
          )}
        </tbody>
      </table>
    </div>
  );
}
