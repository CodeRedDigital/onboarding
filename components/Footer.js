/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
        <img
          src="/images/logos/pali-logo-blue-and-black.svg"
          alt="PALI Logo"
        />
        <div className="footer-content">
          <p>
            &copy; 2021 - Powered by
            <a href="https://www.paliltd.com">Pali Ltd</a>
          </p>
          <ul>
            <li>
            <Link href={`/permissions`} >Permissions</Link>
            </li>
            <li>
            <Link href={`/users/`} >Users</Link>
            </li>
            <li>
            <Link href={`/questions`} >Questions</Link>
            </li>
          </ul>
        </div>
      </footer>
  )
}