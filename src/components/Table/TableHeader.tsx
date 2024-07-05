import { Dispatch } from 'react';

type TableHeaderProps = {
  states: string[];
  selectStates: string | undefined; // Change the type from `string | null` to `string | undefined`
  setStateStates: Dispatch<string>;
};

export default function TableHeader({ states, selectStates, setStateStates }: TableHeaderProps) {
  return (
    <div className="py-6 md:flex md:items-center md:justify-between">
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <select
          className="select select-primary ml-4 w-full max-w-xs"
          value={selectStates}
          onChange={(e) => {
            setStateStates(e.target.value);
          }}
        >
          <option selected>All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
