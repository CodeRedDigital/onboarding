
let nextButton = document.querySelector("#next"); // find next button
const buttons = document.querySelectorAll("[data-checked]").length; // find number of buttons that launch a modal to accept terms
const buttonsFalse = document.querySelectorAll('[data-checked="false"]'); // find all unchecked buttons that launch a modal to accept terms
for (button of buttonsFalse) {
  button.setAttribute("disabled", "");
} // loop through and disable all buttons
// Check state of buttons and update accordingly
function checkButtons() {
  const falseButtons = document.querySelectorAll('[data-checked="false"]'); // find all button that have not been checked
  const buttonsTrue = document.querySelectorAll('[data-checked="true"]').length; // count all buttons that have been checked
  const acceptButtons = document.querySelectorAll("[data-accept]"); //find all accept buttons
  if (falseButtons.length > 0) {
    falseButtons[0].removeAttribute("disabled"); // if there are unchecked button enable the first one
    for (button of falseButtons) {
      const buttonName = button.getAttribute("data-modal-open");
      const matchingAcceptButton = document
        .querySelector(`#${buttonName}`)
        .querySelector("[data-accept]");
      matchingAcceptButton.setAttribute("disabled", true);
    }
  }
  if (nextButton) {
    // check that there is a next button to disable
    if (buttons === buttonsTrue) {
      nextButton.removeAttribute("disabled");
    } // if all the buttons are checked enable next button
  }
}
// find all the modals
const modalSections = document.querySelectorAll("[data-modal]")
// tell observer what to watch for
const watch = { 
  attributes: true,
  attributeFilter: ["hidden"]
}
// create an observer that will check if the modal content is long enough for scroll
const observer = new MutationObserver(function (modalUpdating) {
  const modalArea = modalUpdating[0].target
  const modalContent = modalArea.querySelector(".modal-content")
  const matchingButton = document.querySelector(
    `[data-modal-open="${modalArea.id}"]`
  );
  if (modalContent.clientHeight === modalContent.scrollHeight) {
    const acceptButton = modalArea.querySelector("[data-accept]")
    acceptButton.addEventListener("click", () => {
      // add click event to the accept button
      matchingButton.setAttribute("data-checked", true); // update data check attribute of associated button
      ARIAmodal.closeModal(); // close the modal
      checkButtons(); // run checkButtons function to update the buttons on the page
    });
    acceptButton.removeAttribute("disabled")
  } else {
    modalContent.addEventListener("scroll", handleScroll);
  }
})
// loop through each modal and add observer to it
for (let i = 0; i < modalSections.length; i++) {
  observer.observe(modalSections[i], watch)
}
// handle the scroll of the modal content
function handleScroll() {
  if (this.clientHeight + this.scrollTop >= this.scrollHeight) {
    // check if the content has been scrolled to the bottom
    const acceptButton = this.parentNode.querySelector("[data-accept]"); // find the accept button associated with current modal
    const modalName = this.parentNode.parentNode.id; // find the name of the current modal
    const matchingButton = document.querySelector(
      `[data-modal-open="${modalName}"]`
    ); // use the modalName to find the associated button
    acceptButton.addEventListener("click", () => {
      // add click event to the accept button
      matchingButton.setAttribute("data-checked", true); // update data check attribute of associated button
      ARIAmodal.closeModal(); // close the modal
      checkButtons(); // run checkButtons function to update the buttons on the page
    });
    acceptButton.removeAttribute("disabled"); // enable the accept button
  }
}
checkButtons(); // on page load check the states of the buttons