// components
import Progess from "./progress"

function Section() {
  return (
    <details>
      <summary>
        <h3>About Dave <span className="progress">2/5</span></h3>
      </summary>
      <Progress></Progress>
      <ul>
        <li><a href="#dave-title">Title <span data-complete="true"></span></a></li>
        <li><a href="#dave-first-name">First Name <span data-complete="true"></span></a></li>
        <li><a href="#dave-surname">Surname <span data-complete="false"></span></a></li>
        <li><a href="#dave-telephone">Telephone <span data-complete="false"></span></a></li>
        <li><a href="#dave-email">email <span data-complete="false"></span></a></li>
      </ul>
    </details>
  )
}
export default Section