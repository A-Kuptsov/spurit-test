class PlayVideo {
  constructor({ btnId, modalId, closeBtnId }) {
    this.modalId = modalId;
    this.btnId = btnId;
    this.closeBtnId = closeBtnId;
  }

  static destroy(ref, func) {
    document
      .getElementById("iframeVideo")
      .contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo"}',
        "*"
      );
    ref && ref.classList.remove("modal_is-visible");
    document.removeEventListener("keydown", func);
  }

  init() {
    const modalRef = document.getElementById(this.modalId);
    const openBtnRef = document.getElementById(this.btnId);
    const closeBtnRef = document.getElementById(this.closeBtnId);

    const tabListener = function(e) {
      if (e.key === "Tab" && modalRef.contains(e.target)) {
        e.preventDefault();
      }
    };

    const escapeListener = function(e) {
      if (e.key === "Escape") {
        PlayVideo.destroy(modalRef, escapeListener);
        PlayVideo.destroy(null, tabListener);
      }
    };

    openBtnRef.onclick = function() {
      modalRef.classList.add("modal_is-visible");
      document.addEventListener("keydown", escapeListener);
      document.addEventListener("keydown", tabListener);
    };

    closeBtnRef.onclick = function() {
      PlayVideo.destroy(modalRef, escapeListener);
      PlayVideo.destroy(null, tabListener);
    };

    document.onclick = function(e) {
      if (e.target === modalRef) {
        PlayVideo.destroy(modalRef, escapeListener);
        PlayVideo.destroy(null, tabListener);
      }
    };
  }
}
