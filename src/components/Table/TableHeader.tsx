export default function TableHeader() {
  return (
    <div className="py-6 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <select
          className="select select-primary w-full max-w-xs"
          defaultValue="What is the best TV show?"
        >
          <option>What is the best TV show?</option>
          <option>Game of Thrones</option>
          <option>Lost</option>
          <option>Breaking Bad</option>
          <option>Walking Dead</option>
        </select>
      </div>
    </div>
  );
}
