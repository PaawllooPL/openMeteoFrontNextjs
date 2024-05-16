import styles from "@/app/page.module.css"

export default function MessageBox({messageBox, messageText, className}) {
    return (
        <div className={`center ${className}`} id="message_box" ref={messageBox}>
        <div className={`${styles.message_container} bg-warning`}>
          <h5 id='message_text' ref={messageText}>test</h5>
        </div>
      </div>
    );
}