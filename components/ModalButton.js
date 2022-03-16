function ModalButton(props) {
  return (
    <>
      <button
        id={props.name + "Button"}
        className="btn primary check"
        data-modal-open={props.name + "Modal"}
        data-button={props.name + "Button"}
        data-checked={props.checked}
        data-name={props.name}
      >
        {props.label}
      </button>
      <section className="modal-box" id={props.name + "Modal"} data-modal hidden={true}>
        <div className="modal-body" data-modal-document>
          <header>
            <h2>{props.label}</h2>
            <h3>{props.instructions}</h3>
          </header>
          <div className="modal-content" id={props.name + "ModalContent"}>
            {props.modalContent}
          </div>
          <footer>
            <button className="btn warning" data-modal-close-btn>Cancel</button>
            <button
              id={props.name + "AcceptButton"}
              className="btn success"
              data-accept=""
              disabled
            >
              Accept
            </button>
          </footer>
        </div>
      </section>
    </>
  )
}

export default ModalButton