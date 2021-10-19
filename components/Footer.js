/* eslint-disable @next/next/no-img-element */

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
              <a href="one">Link 1</a>
            </li>
            <li>
              <a href="two">Link 2</a>
            </li>
            <li>
              <a href="three">Link 3</a>
            </li>
          </ul>
        </div>
      </footer>
  )
}