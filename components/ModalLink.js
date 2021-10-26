import Link from 'next/link'

function ModalLink(props) {
  return (
    <>
      <Link
        className=""
        href={"#" + props.name + "Modal"}
        data-modal-open={props.name + "Modal"}
        data-button={props.name + "Button"}
        data-name={props.name}
        role="button"
        tabIndex="0"
        id={props.name + "Modal__trigger-A"}
      >
        {props.name}
      </Link>
      <section
        className="modal-box a11y-modal"
        id={props.name + "Modal"}
        data-modal=""
        role="dialog"
        tabIndex="-1"
        aria-labelledby={props.name + "Modal_heading"}
        hidden={true}
      >
        <div className="modal-body" data-modal-document="" role="document">
          <header>
            <h2 className="a11y-modal__heading" id={props.name + "Modal_heading"}>
              About {props.name}
            </h2>
          </header>
          <div className="modal-content" id={props.name + "ModalContent"}>
            {props.modalLinkContent}
          </div>
          <footer>
            <button className="btn warning js-first-focus" data-modal-close-btn="">
              Close
            </button>
          </footer>
          {/* <button type="button" className="a11y-modal__close-btn is-icon-btn js-last-focus" aria-label="Close"><span data-modal-x=""></span></button> */}
        </div>
      </section>
    </>
  );
}

export default ModalLink