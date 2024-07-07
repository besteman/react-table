'use client';

import { useEffect, useState } from 'react';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import TableHeader from './TableHeader';

interface FakeData {
  [key: string]: any;
}

function getUniqueCities(data: FakeData[]): string[] {
  const citySet: Set<string> = new Set();

  data.forEach((item) => {
    if (item.city) {
      citySet.add(item.city);
    }
  });

  return Array.from(citySet);
}

function switchDirection(sortDirection: boolean) {
  return !sortDirection;
}

export default function Table() {
  const [data, setData] = useState<FakeData[] | null>(null);
  const [header, setHeader] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortCriterion, setSortCriterion] = useState<string | null>(null);
  const [states, setStateStates] = useState<string[]>([]);
  const [selectStates, setSelectStates] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({
        seed: 123,
        size: 100,
        sortBy: sortCriterion,
        sortAsc: sortAsc,
        filterByState: selectStates,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setHeader(Object.keys(data.data[0]));
        setLoading(false);
        setStateStates(data.states);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [sortAsc, selectStates]);

  return isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <p className="loading loading-dots loading-lg text-success">Loading </p>
    </div>
  ) : (
    <div className="my-6 overflow-x-auto border p-6">
      <TableHeader
        states={states}
        selectStates={selectStates || undefined}
        setStateStates={setSelectStates}
      />
      <table className="table table-md">
        <thead>
          <tr>
            <th>ID</th>
            <th>
              NAME{' '}
              <button
                type="button"
                onClick={() => {
                  setSortAsc(switchDirection(sortAsc));
                  setSortCriterion('name');
                }}
              >
                {sortAsc ? (
                  <ChevronDoubleUpIcon className="size-4 pt-1 text-primary" />
                ) : (
                  <ChevronDoubleDownIcon className="size-4 pt-1 text-primary" />
                )}
              </button>
            </th>
            <th>
              EMAIL{' '}
              <button
                type="button"
                onClick={() => {
                  setSortAsc(switchDirection(sortAsc));
                  setSortCriterion('email');
                }}
              >
                {sortAsc ? (
                  <ChevronDoubleUpIcon className="size-4 pt-1 text-primary" />
                ) : (
                  <ChevronDoubleDownIcon className="size-4 pt-1 text-primary" />
                )}
              </button>
            </th>
            <th>
              JOB{' '}
              <button
                type="button"
                onClick={() => {
                  setSortAsc(switchDirection(sortAsc));
                  setSortCriterion('job');
                }}
              >
                {sortAsc ? (
                  <ChevronDoubleUpIcon className="size-4 pt-1 text-primary" />
                ) : (
                  <ChevronDoubleDownIcon className="size-4 pt-1 text-primary" />
                )}
              </button>
            </th>
            <th>
              ADDRESS{' '}
              <button
                type="button"
                onClick={() => {
                  setSortAsc(switchDirection(sortAsc));
                  setSortCriterion('address');
                }}
              >
                {sortAsc ? (
                  <ChevronDoubleUpIcon className="size-4 pt-1 text-primary" />
                ) : (
                  <ChevronDoubleDownIcon className="size-4 pt-1 text-primary" />
                )}
              </button>
            </th>
            <th>
              CITY{' '}
              <button
                type="button"
                onClick={() => {
                  setSortAsc(switchDirection(sortAsc));
                  setSortCriterion('city');
                }}
              >
                {sortAsc ? (
                  <ChevronDoubleUpIcon className="size-4 pt-1 text-primary" />
                ) : (
                  <ChevronDoubleDownIcon className="size-4 pt-1 text-primary" />
                )}
              </button>
            </th>
            <th>
              STATE{' '}
              <button
                type="button"
                onClick={() => {
                  setSortAsc(switchDirection(sortAsc));
                  setSortCriterion('state');
                }}
              >
                {sortAsc ? (
                  <ChevronDoubleUpIcon className="size-4 pt-1 text-primary" />
                ) : (
                  <ChevronDoubleDownIcon className="size-4 pt-1 text-primary" />
                )}
              </button>
            </th>
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
