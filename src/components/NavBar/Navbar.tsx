import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">React Table</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="https://github.com/besteman/react-table" target="_blank">
              <Image src="/github.png" width={25} height={25} alt="Github" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
