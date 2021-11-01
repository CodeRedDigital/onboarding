import Link from 'next/link'

function UserIcon(props) {
  let current = ""
  if (props.current === props.id) {
    current = "current"
  }
  return (
    <Link href={`/users/${props.id}`} data-index={props.index} >
      <a className={current}>
      <svg
        width="30"
        height="51"
        viewBox="0 0 30 51"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.998 24.8L24.3118 25.5L24.998 26.2C27.4746 28.7263 29 32.184 29 36V50H1V36C1 32.184 2.5254 28.7263 5.00195 26.2L5.68822 25.5L5.00195 24.8C2.5254 22.2737 1 18.816 1 15C1 7.26801 7.26801 1 15 1C22.732 1 29 7.26801 29 15C29 18.816 27.4746 22.2737 24.998 24.8Z"
          strokeWidth="2"
        />
      </svg>
      </a>
    </Link>
  );
}

export default UserIcon;